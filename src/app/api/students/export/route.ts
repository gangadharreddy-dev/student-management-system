import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const students = await prisma.student.findMany({
      orderBy: { createdAt: 'desc' }
    });

    const total = students.length;
    const active = students.filter(s => s.status === 'Active').length;
    const inactive = students.filter(s => s.status === 'Inactive').length;
    const graduated = students.filter(s => s.status === 'Graduated').length;

    // Helper to escape values for CSV to prevent syntax issues in Excel
    const escapeCSV = (val: any) => {
      if (val === null || val === undefined) return '';
      const str = String(val);
      if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    // Build CSV contents with summary stats at the top
    const rows = [
      ['Student Management System - Summary Report'],
      [`Generated on: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}`],
      [],
      ['Summary Statistics'],
      ['Metric', 'Count'],
      ['Total Students', total],
      ['Active Students', active],
      ['Inactive Students', inactive],
      ['Graduated Students', graduated],
      [],
      ['Student List'],
      ['Student ID', 'First Name', 'Last Name', 'Email', 'Course', 'Enrollment Date', 'Status', 'Created At']
    ];

    students.forEach(s => {
      const enrollmentDateStr = s.enrollmentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC'
      });
      const createdAtStr = s.createdAt.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC'
      });
      rows.push([
        s.id,
        s.firstName,
        s.lastName,
        s.email,
        s.course,
        enrollmentDateStr,
        s.status,
        createdAtStr
      ]);
    });

    // Convert rows to CSV string with UTF-8 BOM
    const csvContent = '\ufeff' + rows.map(r => r.map(escapeCSV).join(',')).join('\n');

    // Return response as attachment download
    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="student_report.csv"',
      }
    });

  } catch (error) {
    console.error('Failed to export student report:', error);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
}

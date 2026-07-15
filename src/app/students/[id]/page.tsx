import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import DeleteButtonProfile from '@/components/DeleteButton';

export default async function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const student = await prisma.student.findUnique({
    where: { id },
  });

  if (!student) {
    notFound();
  }

  const initials = `${student.firstName[0]}${student.lastName[0]}`.toUpperCase();

  return (
    <div>
      <Link href="/" className="back-link">
        ← Back to Dashboard
      </Link>

      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">{initials}</div>
          <div>
            <div className="profile-name">
              {student.firstName} {student.lastName}
            </div>
            <div className="profile-email">{student.email}</div>
          </div>
        </div>

        <div className="profile-body">
          <div className="profile-grid">
            <div className="profile-field">
              <span className="profile-field-label">Course / Major</span>
              <span className="profile-field-value">{student.course}</span>
            </div>
            <div className="profile-field">
              <span className="profile-field-label">Status</span>
              <span className="profile-field-value">
                <span className={`badge badge-${student.status.toLowerCase()}`}>
                  {student.status}
                </span>
              </span>
            </div>
            <div className="profile-field">
              <span className="profile-field-label">Enrollment Date</span>
              <span className="profile-field-value">
                {student.enrollmentDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="profile-field">
              <span className="profile-field-label">Student ID</span>
              <span className="profile-field-value" style={{ fontSize: '0.85rem', fontFamily: 'monospace' }}>
                {student.id}
              </span>
            </div>
            <div className="profile-field">
              <span className="profile-field-label">Created</span>
              <span className="profile-field-value">
                {student.createdAt.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="profile-field">
              <span className="profile-field-label">Last Updated</span>
              <span className="profile-field-value">
                {student.updatedAt.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <Link href={`/students/${student.id}/edit`} className="btn btn-primary">
            ✏️ Edit Student
          </Link>
          <DeleteButtonProfile id={student.id} />
        </div>
      </div>
    </div>
  );
}

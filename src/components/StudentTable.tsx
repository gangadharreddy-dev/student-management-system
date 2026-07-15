'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import DeleteButton from './DeleteButton';

type Student = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  course: string;
  enrollmentDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type SortField = 'name' | 'email' | 'course' | 'enrollmentDate' | 'status';
type SortDir = 'asc' | 'desc';

export default function StudentTable({ students }: { students: Student[] }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [courseFilter, setCourseFilter] = useState('All');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  // Get unique courses for the filter dropdown
  const courses = useMemo(() => {
    const set = new Set(students.map((s) => s.course));
    return Array.from(set).sort();
  }, [students]);

  // Filter + sort logic
  const filtered = useMemo(() => {
    let result = students;

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.firstName.toLowerCase().includes(q) ||
          s.lastName.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (statusFilter !== 'All') {
      result = result.filter((s) => s.status === statusFilter);
    }

    // Course filter
    if (courseFilter !== 'All') {
      result = result.filter((s) => s.course === courseFilter);
    }

    // Sort
    result = [...result].sort((a, b) => {
      let valA: string;
      let valB: string;

      switch (sortField) {
        case 'name':
          valA = `${a.firstName} ${a.lastName}`.toLowerCase();
          valB = `${b.firstName} ${b.lastName}`.toLowerCase();
          break;
        case 'email':
          valA = a.email.toLowerCase();
          valB = b.email.toLowerCase();
          break;
        case 'course':
          valA = a.course.toLowerCase();
          valB = b.course.toLowerCase();
          break;
        case 'enrollmentDate':
          valA = a.enrollmentDate;
          valB = b.enrollmentDate;
          break;
        case 'status':
          valA = a.status.toLowerCase();
          valB = b.status.toLowerCase();
          break;
        default:
          return 0;
      }

      if (valA < valB) return sortDir === 'asc' ? -1 : 1;
      if (valA > valB) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [students, search, statusFilter, courseFilter, sortField, sortDir]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const SortArrow = ({ field }: { field: SortField }) => (
    <span className={`sort-indicator ${sortField === field ? 'active' : ''}`}>
      {sortField === field ? (sortDir === 'asc' ? '▲' : '▼') : '▲'}
    </span>
  );

  return (
    <>
      {/* Search & Filter Bar */}
      <div className="search-filter-bar">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Graduated">Graduated</option>
        </select>
        {courses.length > 1 && (
          <select
            className="filter-select"
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
          >
            <option value="All">All Courses</option>
            {courses.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Table */}
      <div className="table-container">
        {filtered.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">
              {students.length === 0 ? '📭' : '🔎'}
            </div>
            <p>
              {students.length === 0
                ? 'No students found. Add your first student to get started.'
                : 'No students match your search or filters.'}
            </p>
            {students.length === 0 && (
              <Link
                href="/students/new"
                className="btn btn-primary"
                style={{ marginTop: '1rem' }}
              >
                + Add Student
              </Link>
            )}
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th className="sortable" onClick={() => handleSort('name')}>
                  Name <SortArrow field="name" />
                </th>
                <th className="sortable" onClick={() => handleSort('email')}>
                  Email <SortArrow field="email" />
                </th>
                <th className="sortable" onClick={() => handleSort('course')}>
                  Course <SortArrow field="course" />
                </th>
                <th className="sortable" onClick={() => handleSort('enrollmentDate')}>
                  Enrollment Date <SortArrow field="enrollmentDate" />
                </th>
                <th className="sortable" onClick={() => handleSort('status')}>
                  Status <SortArrow field="status" />
                </th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((student) => (
                <tr key={student.id}>
                  <td>
                    <Link
                      href={`/students/${student.id}`}
                      className="student-name-link"
                    >
                      {student.firstName} {student.lastName}
                    </Link>
                  </td>
                  <td>{student.email}</td>
                  <td>{student.course}</td>
                  <td>
                    {new Date(student.enrollmentDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      timeZone: 'UTC',
                    })}
                  </td>
                  <td>
                    <span
                      className={`badge badge-${student.status.toLowerCase()}`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td>
                    <div className="actions-cell">
                      <Link
                        href={`/students/${student.id}/edit`}
                        className="btn btn-secondary btn-sm"
                      >
                        Edit
                      </Link>
                      <DeleteButton id={student.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {filtered.length > 0 && (
        <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', textAlign: 'right' }}>
          Showing {filtered.length} of {students.length} student{students.length !== 1 ? 's' : ''}
        </p>
      )}
    </>
  );
}

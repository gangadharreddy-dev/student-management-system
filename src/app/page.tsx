import { prisma } from '@/lib/prisma';
import StudentTable from '@/components/StudentTable';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const students = await prisma.student.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // Compute stats
  const total = students.length;
  const active = students.filter((s) => s.status === 'Active').length;
  const inactive = students.filter((s) => s.status === 'Inactive').length;
  const graduated = students.filter((s) => s.status === 'Graduated').length;

  // Serialize dates for client component
  const serialized = students.map((s) => ({
    ...s,
    enrollmentDate: s.enrollmentDate.toISOString(),
    createdAt: s.createdAt.toISOString(),
    updatedAt: s.updatedAt.toISOString(),
  }));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1>Student Dashboard</h1>
          <p>Manage your students, courses, and enrollments efficiently.</p>
        </div>
        <a href="/api/students/export" className="btn btn-secondary">
          <span>📥</span> Export Excel
        </a>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">👥</div>
          <div className="stat-info">
            <div className="stat-value">{total}</div>
            <div className="stat-label">Total Students</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">✅</div>
          <div className="stat-info">
            <div className="stat-value">{active}</div>
            <div className="stat-label">Active</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon yellow">⏸️</div>
          <div className="stat-info">
            <div className="stat-value">{inactive}</div>
            <div className="stat-label">Inactive</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple">🎓</div>
          <div className="stat-info">
            <div className="stat-value">{graduated}</div>
            <div className="stat-label">Graduated</div>
          </div>
        </div>
      </div>

      {/* Student Table with Search/Filter/Sort */}
      <StudentTable students={serialized} />
    </div>
  );
}

'use client';

export function SkeletonStatCard() {
  return (
    <div className="skeleton-stat-card">
      <div className="skeleton" style={{ width: 48, height: 48, borderRadius: 12 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        <div className="skeleton skeleton-text" style={{ width: '40%', height: 24 }} />
        <div className="skeleton skeleton-text-sm" style={{ width: '60%' }} />
      </div>
    </div>
  );
}

export function SkeletonTableRow({ columns = 6 }: { columns?: number }) {
  return (
    <div className="skeleton-row">
      {Array.from({ length: columns }).map((_, i) => (
        <div key={i} style={{ flex: i === 0 ? 1.5 : 1 }}>
          <div
            className="skeleton skeleton-text"
            style={{ width: `${60 + Math.random() * 30}%`, height: 14 }}
          />
        </div>
      ))}
    </div>
  );
}

export function SkeletonDashboard() {
  return (
    <div>
      <div className="stats-grid">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonStatCard key={i} />
        ))}
      </div>
      <div style={{ marginTop: '1rem' }}>
        <div className="skeleton" style={{ height: 42, borderRadius: 10, marginBottom: '1rem' }} />
        <div
          className="table-container"
          style={{ padding: 0, overflow: 'hidden' }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonTableRow key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

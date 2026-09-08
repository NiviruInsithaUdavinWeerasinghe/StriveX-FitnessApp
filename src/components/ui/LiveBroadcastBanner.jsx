import { useBroadcast } from '../../context/BroadcastContext';
import { Radio, X } from 'lucide-react';

export const LiveBroadcastBanner = ({ userRole = 'all' }) => {
  const { activeAnnouncement, dismissBroadcast } = useBroadcast();

  if (!activeAnnouncement) return null;

  // Audience filtering
  if (
    activeAnnouncement.audience !== 'all' &&
    activeAnnouncement.audience !== userRole &&
    !(userRole === 'member' && activeAnnouncement.audience === 'elite')
  ) {
    return null;
  }

  return (
    <div
      className="animate-slide-down"
      style={{
        width: '100%',
        background: 'linear-gradient(90deg, rgba(212, 255, 0, 0.18) 0%, rgba(6, 182, 212, 0.18) 100%)',
        borderBottom: '1px solid rgba(212, 255, 0, 0.35)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        color: 'var(--text-primary)',
        fontSize: '0.86rem',
        zIndex: 850,
        position: 'relative'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
        <div
          style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            background: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#111111',
            flexShrink: 0,
            boxShadow: '0 0 12px var(--accent-glow)'
          }}
        >
          <Radio size={14} />
        </div>
        <div>
          <span style={{ fontWeight: 900, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em', marginRight: '8px' }}>
            [LIVE FACILITY ANNOUNCEMENT]:
          </span>
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
            {activeAnnouncement.message}
          </span>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)', marginLeft: '10px' }}>
            • Posted by {activeAnnouncement.author} ({activeAnnouncement.timestamp})
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => dismissBroadcast(activeAnnouncement.id)}
        style={{
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid var(--border-glass)',
          borderRadius: '50%',
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          flexShrink: 0
        }}
        title="Dismiss Announcement"
      >
        <X size={14} />
      </button>
    </div>
  );
};

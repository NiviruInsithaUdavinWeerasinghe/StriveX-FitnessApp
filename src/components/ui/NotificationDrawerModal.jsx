import { useBroadcast } from '../../context/BroadcastContext';
import { Radio, Bell, X, Check, ShieldAlert } from 'lucide-react';

export const NotificationDrawerModal = ({ isOpen, onClose }) => {
  const { broadcasts, markAllAsRead } = useBroadcast();

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        display: 'flex',
        justifyContent: 'flex-end',
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)'
      }}
      onClick={onClose}
    >
      <div
        className="animate-slide-left"
        style={{
          width: '100%',
          maxWidth: '420px',
          height: '100vh',
          background: 'var(--surface-elevated)',
          borderLeft: '1px solid var(--border-hover)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            background: 'var(--surface-glass)',
            borderBottom: '1px solid var(--border-glass)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bell size={20} color="var(--accent)" />
            <div>
              <h3 className="type-h3" style={{ fontSize: '1.15rem', margin: 0 }}>
                Notification Center
              </h3>
              <span className="type-caption">Facility Broadcasts & System Telemetry</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={markAllAsRead}
              className="kinetic-btn-ghost"
              style={{ padding: '4px 8px', fontSize: '0.74rem' }}
              title="Mark all as read"
            >
              <Check size={13} /> Read All
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {broadcasts.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-tertiary)' }}>
              No system notifications or facility announcements.
            </div>
          ) : (
            broadcasts.map((b) => (
              <div
                key={b.id}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  background: b.read ? 'var(--surface-input)' : 'rgba(212, 255, 0, 0.06)',
                  border: `1px solid ${b.read ? 'var(--border-subtle)' : 'rgba(212, 255, 0, 0.25)'}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Radio size={14} color="var(--accent)" />
                    <strong style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>{b.title}</strong>
                  </div>
                  <span className="kinetic-badge" style={{ fontSize: '0.66rem', padding: '1px 6px' }}>
                    {b.audience.toUpperCase()}
                  </span>
                </div>

                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.45' }}>
                  {b.message}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                  <span>By {b.author}</span>
                  <span>{b.timestamp}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

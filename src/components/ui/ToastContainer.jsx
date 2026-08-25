import { useToast } from '../../context/ToastContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  if (!toasts || toasts.length === 0) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={20} color="var(--status-success)" />;
      case 'error':
        return <AlertCircle size={20} color="var(--status-error)" />;
      case 'warning':
        return <AlertTriangle size={20} color="var(--status-warning)" />;
      case 'info':
      default:
        return <Info size={20} color="var(--accent)" />;
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '380px',
        width: 'calc(100% - 48px)',
        pointerEvents: 'none'
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="kinetic-card animate-slide-up"
          style={{
            pointerEvents: 'auto',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            borderRadius: 'var(--radius-md)',
            borderLeft: `4px solid ${
              toast.type === 'success'
                ? 'var(--status-success)'
                : toast.type === 'error'
                ? 'var(--status-error)'
                : toast.type === 'warning'
                ? 'var(--status-warning)'
                : 'var(--accent)'
            }`,
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <div style={{ flexShrink: 0, marginTop: '2px' }}>{getIcon(toast.type)}</div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            {toast.title && (
              <div
                style={{
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '2px'
                }}
              >
                {toast.title}
                {toast.count > 1 && (
                  <span
                    style={{
                      marginLeft: '6px',
                      fontSize: '0.72rem',
                      padding: '1px 6px',
                      borderRadius: 'var(--radius-pill)',
                      background: 'var(--accent)',
                      color: 'var(--accent-contrast)',
                      fontWeight: 800
                    }}
                  >
                    ×{toast.count}
                  </span>
                )}
              </div>
            )}
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              {toast.message}
            </div>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            style={{
              flexShrink: 0,
              padding: '4px',
              borderRadius: '4px',
              color: 'var(--text-tertiary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color var(--transition-fast)'
            }}
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

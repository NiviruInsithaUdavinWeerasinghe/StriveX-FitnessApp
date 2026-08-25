import { X } from 'lucide-react';

export const LegalModal = ({ isOpen, onClose, docType }) => {
  if (!isOpen) return null;

  const contentMap = {
    privacy: {
      title: 'Privacy Policy',
      content: 'At StriveX, your privacy is our priority. We collect and process your data to provide you with tailored fitness experiences. We do not sell your personal data to third parties. For full details on data handling and telemetry privacy, please refer to our full documentation.'
    },
    terms: {
      title: 'Terms of Service',
      content: 'By using StriveX services, you agree to abide by our community guidelines and facility regulations. Memberships are non-transferable. StriveX reserves the right to modify training schedules and facility hours with prior notice.'
    },
    regulations: {
      title: 'Facility Regulations',
      content: 'For the safety and hygiene of all athletes, please wipe down equipment after use. Proper athletic attire is required at all times. Photography is restricted in locker rooms and private consultation areas.'
    }
  };

  const currentDoc = contentMap[docType] || contentMap['privacy'];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)'
      }}
      onClick={onClose}
    >
      <div
        className="kinetic-card animate-scale-up"
        style={{
          width: '100%',
          maxWidth: '600px',
          padding: '32px',
          background: 'var(--surface-elevated)',
          border: '1px solid var(--border-hover)',
          borderRadius: 'var(--radius-xl)',
          position: 'relative',
          boxShadow: 'var(--shadow-lg)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            {currentDoc.title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: 'var(--radius-pill)',
              background: 'var(--surface-glass)',
              color: 'var(--text-secondary)'
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
          <p>{currentDoc.content}</p>
          <p style={{ marginTop: '16px' }}>Last updated: August 2026</p>
        </div>

        <div style={{ marginTop: '32px', textAlign: 'right' }}>
          <button type="button" onClick={onClose} className="kinetic-btn-primary" style={{ padding: '10px 24px' }}>
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};

import { ArrowUpRight } from 'lucide-react';

export const Footer = ({ onNavClick, onOpenRegister, onOpenLogin }) => {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-glass)',
        background: 'var(--bg-secondary)',
        padding: '64px 24px 32px',
        width: '100%'
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '48px',
          marginBottom: '48px',
          textAlign: 'left'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, rgba(212, 255, 0, 0.2), rgba(212, 255, 0, 0.05))',
                border: '1px solid rgba(212, 255, 0, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M2 12H6L9 4L15 20L18 12H22"
                  stroke="var(--accent)"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                fontWeight: 800,
                color: 'var(--text-primary)'
              }}
            >
              Strive<span style={{ color: 'var(--accent)' }}>X</span>
            </span>
          </div>

          <p
            style={{
              fontSize: '0.88rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '20px',
              maxWidth: '300px'
            }}
          >
            Engineered for human performance. The unified platform centralizing athlete tracking, trainer programming, and facility operations.
          </p>

          <div className="kinetic-badge" style={{ fontSize: '0.74rem' }}>
            <span>Kinetic Glass Architecture</span>
          </div>
        </div>

        <div>
          <h4
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.95rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--text-primary)',
              marginBottom: '18px'
            }}
          >
            Platform Navigation
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { id: 'home', label: 'Home Overview' },
              { id: 'features', label: 'Core Features & AI' },
              { id: 'classes', label: 'Live Class Schedule' },
              { id: 'trainers', label: 'Certified Trainers' },
              { id: 'pricing', label: 'Membership Tiers' }
            ].map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onNavClick(item.id)}
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--text-secondary)',
                    transition: 'color var(--transition-fast)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.95rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--text-primary)',
              marginBottom: '18px'
            }}
          >
            Build Stack & Architecture
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>• React 19 (Component SPA)</li>
            <li style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>• Vite High-Performance Bundler</li>
            <li style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>• Kinetic Glass Design System (Vanilla CSS)</li>
            <li style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>• Dual-Viewport (1440px / 390px)</li>
            <li style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>• Real-time Sri Lankan & RFC Validation</li>
          </ul>
        </div>

        <div>
          <h4
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.95rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--text-primary)',
              marginBottom: '18px'
            }}
          >
            Member & Staff Access
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              type="button"
              onClick={onOpenRegister}
              className="kinetic-btn-primary"
              style={{ width: '100%', padding: '10px 16px', fontSize: '0.85rem', justifyContent: 'space-between' }}
            >
              <span>Join StriveX Today</span>
              <ArrowUpRight size={15} />
            </button>
            <button
              type="button"
              onClick={onOpenLogin}
              className="kinetic-btn-secondary"
              style={{ width: '100%', padding: '10px 16px', fontSize: '0.85rem', justifyContent: 'space-between' }}
            >
              <span>Member / Staff Sign In</span>
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          paddingTop: '24px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '0.8rem',
          color: 'var(--text-tertiary)'
        }}
      >
        <div>© 2026 StriveX Fitness Ecosystem. All rights reserved.</div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Security & Compliance</span>
        </div>
      </div>
    </footer>
  );
};

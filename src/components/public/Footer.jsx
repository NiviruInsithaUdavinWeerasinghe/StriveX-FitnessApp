import { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { ArrowUpRight, MapPin, Clock, ShieldCheck, Mail, Phone, Send } from 'lucide-react';

export const Footer = ({ onNavClick, onOpenRegister, onOpenLogin }) => {
  const { addToast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      addToast({
        type: 'error',
        title: 'Valid Email Required',
        message: 'Please enter a valid email address to receive training briefings'
      });
      return;
    }
    addToast({
      type: 'success',
      title: 'Subscribed to StriveX Journal',
      message: 'Weekly sports science and coaching insights delivered to your inbox'
    });
    setNewsletterEmail('');
  };

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
        {/* Column 1: Brand & Manifesto */}
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
            Engineered for elite human performance. Uniting progressive overload telemetry, certified coach programming, and world-class athletic facilities.
          </p>

          <div className="kinetic-badge" style={{ fontSize: '0.74rem' }}>
            <ShieldCheck size={13} />
            <span>Open 24/7 • High Performance Center</span>
          </div>
        </div>

        {/* Column 2: Platform Navigation */}
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
            Quick Navigation
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { id: 'home', label: 'Home Overview' },
              { id: 'features', label: 'Athlete Capabilities' },
              { id: 'classes', label: 'Class Timetable' },
              { id: 'trainers', label: 'Certified Coaching Staff' },
              { id: 'pricing', label: 'Membership Plans' }
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

        {/* Column 3: Facility Location & Hours */}
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
            Facility & Operating Hours
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <MapPin size={16} color="var(--accent)" style={{ flexShrink: 0, marginTop: '3px' }} />
              <span>104 Athletic Boulevard, Colombo 07, Sri Lanka</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <Clock size={16} color="var(--accent)" style={{ flexShrink: 0, marginTop: '3px' }} />
              <div>
                <div><strong>Open 24/7</strong> (Digital Keycard Access)</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-tertiary)' }}>Staffed Hours: Mon–Sun 6:00 AM – 10:00 PM</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={16} color="var(--accent)" style={{ flexShrink: 0 }} />
              <span>+94 11 234 5678</span>
            </div>
          </div>
        </div>

        {/* Column 4: Newsletter & Access */}
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
            Athlete Journal & Access
          </h4>

          {/* Newsletter Input */}
          <form onSubmit={handleSubscribe} style={{ marginBottom: '16px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 6px 6px 14px',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--surface-input)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <Mail size={15} color="var(--text-tertiary)" />
              <input
                type="email"
                placeholder="athlete@strivex.fit"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '0.82rem',
                  width: '100%'
                }}
              />
              <button
                type="submit"
                className="kinetic-btn-primary"
                style={{
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.78rem',
                  fontWeight: 800
                }}
              >
                <Send size={13} />
              </button>
            </div>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              type="button"
              onClick={onOpenRegister}
              className="kinetic-btn-primary"
              style={{ width: '100%', padding: '10px 16px', fontSize: '0.82rem', justifyContent: 'space-between' }}
            >
              <span>Join StriveX Today</span>
              <ArrowUpRight size={14} />
            </button>
            <button
              type="button"
              onClick={onOpenLogin}
              className="kinetic-btn-secondary"
              style={{ width: '100%', padding: '10px 16px', fontSize: '0.82rem', justifyContent: 'space-between' }}
            >
              <span>Member / Staff Sign In</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Legal Links */}
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
          <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
          <span style={{ cursor: 'pointer' }}>Terms of Service</span>
          <span style={{ cursor: 'pointer' }}>Facility Regulations</span>
        </div>
      </div>
    </footer>
  );
};

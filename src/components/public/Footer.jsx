import { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import {
  ArrowUpRight,
  MapPin,
  Clock,
  ShieldCheck,
  Mail,
  Phone,
  Send,
  Sparkles,
  Zap,
  Award,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export const Footer = ({ onNavClick, onOpenRegister, onOpenLogin, onOpenLegal }) => {
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

  const handleTourBooking = () => {
    addToast({
      type: 'info',
      title: 'Facility VIP Tour Request',
      message: 'Opening consultation schedule with our Colombo 07 Head of Operations.'
    });
    onOpenRegister();
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
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* ============================================================ */}
        {/* FOOTER TOP: Clean Open Layout on Background (No Cards/Panels) */}
        {/* ============================================================ */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '32px',
            flexWrap: 'wrap',
            paddingBottom: '48px',
            marginBottom: '48px',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          {/* Left Text & Value Props */}
          <div style={{ maxWidth: '680px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div className="kinetic-badge">
                <Sparkles size={13} />
                <span>START YOUR TRANSFORMATION</span>
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 800 }}>
                • ZERO RISK 7-DAY TRIAL
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                fontWeight: 900,
                color: 'var(--text-primary)',
                lineHeight: 1.2,
                marginBottom: '12px'
              }}
            >
              Ready to Unlock Your Peak Athletic Potential?
            </h3>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.96rem',
                lineHeight: 1.6,
                marginBottom: '20px'
              }}
            >
              Join 2,400+ dedicated athletes training with progressive telemetry tracking, customized periodization, and certified 1-on-1 coaching suites.
            </p>

            {/* Micro Value Prop Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Zap size={16} color="var(--accent)" />
                <span style={{ fontWeight: 600 }}>Live Telemetry Sync</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Award size={16} color="var(--accent)" />
                <span style={{ fontWeight: 600 }}>CSCS-Certified Coaches</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="var(--status-success)" />
                <span style={{ fontWeight: 600 }}>24/7 Digital Access</span>
              </div>
            </div>
          </div>

          {/* Right Action Trigger Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '240px' }}>
            <button
              type="button"
              onClick={onOpenRegister}
              className="kinetic-btn-primary"
              style={{
                padding: '16px 28px',
                fontSize: '1rem',
                fontWeight: 900,
                justifyContent: 'center',
                boxShadow: '0 0 24px var(--accent-glow)'
              }}
            >
              <span>Claim 7-Day Free Pass</span>
              <ArrowUpRight size={18} />
            </button>

            <button
              type="button"
              onClick={handleTourBooking}
              className="kinetic-btn-secondary"
              style={{
                padding: '12px 24px',
                fontSize: '0.88rem',
                fontWeight: 700,
                justifyContent: 'center'
              }}
            >
              <Calendar size={16} />
              <span>Book Facility VIP Tour</span>
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* MAIN 4-COLUMN FOOTER BODY */}
        {/* ============================================================ */}
        <div
          style={{
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
            <button type="button" onClick={() => onOpenLegal('privacy')} style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'inherit' }}>Privacy Policy</button>
            <button type="button" onClick={() => onOpenLegal('terms')} style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'inherit' }}>Terms of Service</button>
            <button type="button" onClick={() => onOpenLegal('regulations')} style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'inherit' }}>Facility Regulations</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

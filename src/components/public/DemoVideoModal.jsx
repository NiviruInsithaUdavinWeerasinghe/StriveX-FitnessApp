import { X, Play, Zap, CheckCircle2, Shield } from 'lucide-react';

export const DemoVideoModal = ({ isOpen, onClose, onStartTrial }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9995,
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
          maxWidth: '780px',
          padding: '28px',
          background: 'var(--surface-elevated)',
          border: '1px solid var(--border-hover)',
          borderRadius: 'var(--radius-xl)',
          position: 'relative',
          boxShadow: 'var(--shadow-lg)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="kinetic-badge">
              <Zap size={13} />
              <span>Interactive Platform Preview</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              StriveX Architecture
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: 'var(--radius-pill)',
              background: 'var(--surface-glass)',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Video / Visual Simulation Box */}
        <div
          style={{
            width: '100%',
            height: '340px',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            position: 'relative',
            background: 'linear-gradient(135deg, #181818 0%, #111111 100%)',
            border: '1px solid var(--border-glass)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '24px',
            marginBottom: '20px'
          }}
        >
          {/* Animated Glow Center */}
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 40px var(--accent)',
              marginBottom: '20px',
              cursor: 'pointer',
              animation: 'pulseGlow 2s infinite'
            }}
          >
            <Play size={32} fill="#111111" color="#111111" style={{ marginLeft: '4px' }} />
          </div>

          <h4
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem',
              fontWeight: 800,
              color: '#ffffff',
              marginBottom: '8px'
            }}
          >
            Watch the 2-Minute Ecosystem Walkthrough
          </h4>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', maxWidth: '480px' }}>
            Discover how athlete routine logging, progressive overload tracking, and facility management sync in real-time.
          </p>
        </div>

        {/* Key Tour Highlights */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px',
            marginBottom: '24px'
          }}
        >
          {[
            'Biometric & Streak Goal Rings',
            'Trainer Routine Builder & Chat',
            'Centralized Operations Command'
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.82rem',
                color: 'var(--text-secondary)'
              }}
            >
              <CheckCircle2 size={15} color="var(--accent)" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button type="button" onClick={onClose} className="kinetic-btn-ghost">
            Close Preview
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onStartTrial();
            }}
            className="kinetic-btn-primary"
            style={{ padding: '10px 24px' }}
          >
            Start Free Trial Now
          </button>
        </div>
      </div>
    </div>
  );
};

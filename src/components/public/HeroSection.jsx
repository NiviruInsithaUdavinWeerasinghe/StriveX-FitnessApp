import { ArrowRight, Play, Zap, ShieldCheck, Flame } from 'lucide-react';

export const HeroSection = ({ onStartFreeTrial, onOpenVideoDemo }) => {
  return (
    <section
      id="home"
      style={{
        position: 'relative',
        padding: '32px 24px 64px',
        maxWidth: '1360px',
        margin: '0 auto',
        width: '100%'
      }}
    >
      {/* Framed Cinematic Hero Container Matching Screenshot */}
      <div
        style={{
          position: 'relative',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          minHeight: '580px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '60px 24px',
          border: '1px solid var(--border-glass)',
          boxShadow: 'var(--shadow-lg)',
          background: `
            radial-gradient(circle at 50% 30%, rgba(212, 255, 0, 0.08) 0%, transparent 60%),
            linear-gradient(180deg, rgba(19, 19, 19, 0.4) 0%, rgba(19, 19, 19, 0.95) 100%),
            url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop') center/cover no-repeat
          `
        }}
      >
        {/* Subtle Ambient Light Glows */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '350px',
            background: 'radial-gradient(circle, rgba(212, 255, 0, 0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none'
          }}
        />

        {/* Live Active Athlete Badge */}
        <div
          className="kinetic-badge animate-fade-in"
          style={{
            marginBottom: '28px',
            padding: '6px 16px',
            fontSize: '0.82rem',
            background: 'rgba(212, 255, 0, 0.12)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 0 20px rgba(212, 255, 0, 0.2)'
          }}
        >
          <Zap size={14} color="var(--accent)" />
          <span>Centralized Fitness Management & Athletic Hub</span>
        </div>

        {/* Two-Tone Main Headline Matching Screenshot */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            maxWidth: '860px',
            margin: '0 auto 24px',
            textShadow: '0 4px 24px rgba(0, 0, 0, 0.6)'
          }}
        >
          Elevate Your Fitness <br />
          <span
            style={{
              color: 'var(--accent)',
              textShadow: '0 0 32px var(--accent-glow)'
            }}
          >
            Journey
          </span>
        </h1>

        {/* Supporting Copy Matching Screenshot */}
        <p
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.85)',
            maxWidth: '720px',
            margin: '0 auto 36px',
            fontWeight: 400,
            textShadow: '0 2px 12px rgba(0, 0, 0, 0.7)'
          }}
        >
          The ultimate management platform designed for high-performance fitness centers.
          Streamline operations, empower trainers, and deliver an unparalleled member experience.
        </p>

        {/* Action Button Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            zIndex: 2
          }}
        >
          {/* Primary CTA Button */}
          <button
            type="button"
            onClick={onStartFreeTrial}
            className="kinetic-btn-primary"
            style={{
              padding: '16px 36px',
              fontSize: '1.05rem',
              fontWeight: 800,
              boxShadow: '0 0 32px rgba(212, 255, 0, 0.4)'
            }}
          >
            Start Your Free Trial
            <ArrowRight size={18} />
          </button>

          {/* Secondary Video Tour CTA */}
          <button
            type="button"
            onClick={onOpenVideoDemo}
            className="kinetic-btn-secondary"
            style={{
              padding: '16px 28px',
              fontSize: '1rem',
              fontWeight: 700,
              background: 'rgba(25, 25, 25, 0.85)',
              borderColor: 'rgba(255, 255, 255, 0.2)'
            }}
          >
            <Play size={16} fill="var(--accent)" color="var(--accent)" />
            Watch Platform Demo
          </button>
        </div>

        {/* Floating Live Metrics Strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
            flexWrap: 'wrap',
            marginTop: '48px',
            paddingTop: '28px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            width: '100%',
            maxWidth: '780px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(212, 255, 0, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Flame size={18} color="var(--accent)" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>1,240+</div>
              <div style={{ fontSize: '0.76rem', color: 'rgba(255, 255, 255, 0.6)' }}>Active Athletes</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ShieldCheck size={18} color="var(--status-success)" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>98.4%</div>
              <div style={{ fontSize: '0.76rem', color: 'rgba(255, 255, 255, 0.6)' }}>Session Compliance</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(6, 182, 212, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Zap size={18} color="var(--status-info)" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>100%</div>
              <div style={{ fontSize: '0.76rem', color: 'rgba(255, 255, 255, 0.6)' }}>Centralized Ops</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

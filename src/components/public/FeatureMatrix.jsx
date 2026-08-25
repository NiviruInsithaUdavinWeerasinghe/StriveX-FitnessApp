import { Cpu, Users, Activity, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

export const FeatureMatrix = ({ onExploreFeature }) => {
  const features = [
    {
      id: 'ai-tracking',
      icon: <Cpu size={28} color="var(--accent)" />,
      badge: 'INTELLIGENCE ENGINE',
      title: 'AI Workout Tracking',
      description:
        'Intelligent set-by-set telemetry that calculates progressive overload, suggests optimal rest periods, and auto-adapts volume based on recovery biometrics.',
      highlights: [
        'Real-time set & rep logging with auto-rest timer',
        'Dynamic progressive overload calculations',
        'Muscle recovery & fatigue heatmaps'
      ]
    },
    {
      id: 'trainer-ecosystem',
      icon: <Users size={28} color="var(--accent)" />,
      badge: 'COACHING SUITE',
      title: 'Elite Trainer Network',
      description:
        'Direct 1-on-1 access to certified fitness coaches. Receive custom-tailored workout routines, form critique, and real-time private communication.',
      highlights: [
        'Drag-and-drop custom workout builder',
        'Private direct message thread with attachments',
        'Interactive compliance & attendance tracking'
      ]
    },
    {
      id: 'biometrics-sync',
      icon: <Activity size={28} color="var(--accent)" />,
      badge: 'PERFORMANCE ANALYTICS',
      title: 'Real-Time Biometrics',
      description:
        'Continuous synchronization of caloric expenditure, heart rate training zones, hydration status, and weekly consistency streaks.',
      highlights: [
        'Animated SVG circular daily goal rings',
        'Heart rate training zone distribution',
        'Quick hydration & calorie logging widgets'
      ]
    }
  ];

  return (
    <section
      id="features"
      style={{
        padding: '80px 24px',
        maxWidth: '1360px',
        margin: '0 auto',
        width: '100%'
      }}
    >
      {/* Section Header */}
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px' }}>
        <div
          className="kinetic-badge"
          style={{ marginBottom: '14px' }}
        >
          <Sparkles size={14} />
          <span>Core Capabilities</span>
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            marginBottom: '16px',
            color: 'var(--text-primary)'
          }}
        >
          Engineered for Performance & Precision
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Experience a unified ecosystem connecting athletes, personal trainers, and gym operations into one seamless high-voltage platform.
        </p>
      </div>

      {/* 3-Column Kinetic Glass Feature Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}
      >
        {features.map((feature) => (
          <div
            key={feature.id}
            className="kinetic-card"
            style={{
              padding: '36px 28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '24px'
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: 'var(--accent-subtle)',
                    border: '1px solid var(--border-hover)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 20px var(--accent-glow)'
                  }}
                >
                  {feature.icon}
                </div>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    color: 'var(--accent)',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-pill)',
                    background: 'var(--accent-subtle)'
                  }}
                >
                  {feature.badge}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.45rem',
                  fontWeight: 700,
                  marginBottom: '12px',
                  color: 'var(--text-primary)'
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.92rem',
                  lineHeight: 1.6,
                  marginBottom: '24px'
                }}
              >
                {feature.description}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                {feature.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '0.86rem',
                      color: 'var(--text-primary)',
                      textAlign: 'left'
                    }}
                  >
                    <CheckCircle2 size={16} color="var(--accent)" style={{ flexShrink: 0 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onExploreFeature(feature.id)}
              className="kinetic-btn-ghost"
              style={{
                width: '100%',
                justifyContent: 'space-between',
                padding: '12px 16px',
                border: '1px solid var(--border-glass)',
                color: 'var(--text-primary)'
              }}
            >
              <span>Explore Capability</span>
              <ChevronRight size={16} color="var(--accent)" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

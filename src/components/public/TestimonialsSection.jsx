import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 'test_01',
      name: 'Julian Hayes',
      role: 'Competitive Powerlifter',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
      rating: 5,
      achievement: '+45kg on Squat & Deadlift',
      quote:
        'StriveX unified my entire training cycle. Having my coach Marcus adjust progressive overload and check sets in real time eliminated guesswork.'
    },
    {
      id: 'test_02',
      name: 'Elena Rostova',
      role: 'Cross-Training Athlete',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
      rating: 5,
      achievement: '12% Body Fat Reduction',
      quote:
        'The live station booking and biometric sync keep me accountable every single day. The Kinetic Glass interface is by far the cleanest app I have ever used.'
    },
    {
      id: 'test_03',
      name: 'Michael Chang',
      role: 'Executive & Endurance Runner',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
      rating: 5,
      achievement: 'Sub-3:30 Marathon Qualified',
      quote:
        'Managing high-intensity intervals between work meetings was chaos before StriveX. The daily routine cards and rest timers keep my sessions razor-sharp.'
    }
  ];

  return (
    <section
      style={{
        padding: '80px 24px',
        maxWidth: '1360px',
        margin: '0 auto',
        width: '100%'
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px' }}>
        <div className="kinetic-badge" style={{ marginBottom: '14px' }}>
          <Quote size={14} />
          <span>Athlete Transformations</span>
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
          Proven Results at Scale
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Discover how members are hitting PRs and transforming their physical performance with StriveX.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}
      >
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="kinetic-card"
            style={{
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '20px'
            }}
          >
            <div>
              {/* Star Rating & Verified Badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px'
                }}
              >
                <div style={{ display: 'flex', gap: '3px' }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: 'var(--status-success)',
                    background: 'var(--status-success-bg)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-pill)'
                  }}
                >
                  <CheckCircle2 size={12} />
                  Verified Member
                </span>
              </div>

              {/* Quote */}
              <p
                style={{
                  fontSize: '0.94rem',
                  lineHeight: 1.6,
                  color: 'var(--text-primary)',
                  fontStyle: 'italic',
                  marginBottom: '20px'
                }}
              >
                "{t.quote}"
              </p>

              {/* Achievement Chip */}
              <div
                style={{
                  display: 'inline-block',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: 'var(--accent)',
                  background: 'var(--accent-subtle)',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '20px'
                }}
              >
                Result: {t.achievement}
              </div>
            </div>

            {/* Author */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img
                src={t.avatar}
                alt={t.name}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {t.name}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

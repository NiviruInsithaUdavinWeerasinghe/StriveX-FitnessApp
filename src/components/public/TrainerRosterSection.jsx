import { Star, Award, MessageSquare } from 'lucide-react';

export const TrainerRosterSection = ({ onConsultTrainer }) => {
  const trainers = [
    {
      id: 'trn_01',
      name: 'Coach Marcus Vance',
      role: 'Head of Strength & Conditioning',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400&auto=format&fit=crop',
      experience: '12+ Years Experience',
      certifications: 'CSCS, USAW-L2, EXOS',
      rating: 4.98,
      reviewCount: 142,
      activeClients: 28,
      bio: 'Former collegiate strength coach specializing in progressive overload, biomechanics, and powerlifting.'
    },
    {
      id: 'trn_02',
      name: 'Coach Sarah Jenkins',
      role: 'Lead Mobility & MetCon Specialist',
      avatar: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=400&auto=format&fit=crop',
      experience: '8+ Years Experience',
      certifications: 'NASM-CPT, FMS Level 2',
      rating: 4.95,
      reviewCount: 98,
      activeClients: 24,
      bio: 'Pioneer in metabolic conditioning and joint mobility protocols designed to accelerate recovery.'
    },
    {
      id: 'trn_03',
      name: 'Coach David Lee',
      role: 'Hypertrophy & Biomechanics Coach',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
      experience: '10+ Years Experience',
      certifications: 'NSCA-CPT, Precision Nutrition',
      rating: 4.92,
      reviewCount: 116,
      activeClients: 26,
      bio: 'Specialist in hypertrophy science, muscle-mind connection, and personalized nutritional periodization.'
    }
  ];

  return (
    <section
      id="trainers"
      style={{
        padding: '80px 24px',
        maxWidth: '1360px',
        margin: '0 auto',
        width: '100%'
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px' }}>
        <div className="kinetic-badge" style={{ marginBottom: '14px' }}>
          <Award size={14} />
          <span>Elite Coaching Staff</span>
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
          Trained by World-Class Coaches
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Direct mentorship and tailored programming from certified coaches dedicated to your athletic progression.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}
      >
        {trainers.map((trainer) => (
          <div
            key={trainer.id}
            className="kinetic-card"
            style={{
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '24px'
            }}
          >
            <div>
              <div style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '20px' }}>
                <img
                  src={trainer.avatar}
                  alt={trainer.name}
                  style={{
                    width: '100%',
                    height: '240px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-pill)',
                    background: 'rgba(19, 19, 19, 0.85)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#ffffff'
                  }}
                >
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  <span>{trainer.rating}</span>
                  <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.72rem' }}>
                    ({trainer.reviewCount})
                  </span>
                </div>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '4px'
                }}
              >
                {trainer.name}
              </h3>
              <div
                style={{
                  fontSize: '0.86rem',
                  color: 'var(--accent)',
                  fontWeight: 600,
                  marginBottom: '14px'
                }}
              >
                {trainer.role}
              </div>

              <p
                style={{
                  fontSize: '0.88rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                  marginBottom: '20px'
                }}
              >
                {trainer.bio}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                <span
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: 'var(--surface-input)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)'
                  }}
                >
                  {trainer.certifications}
                </span>
                <span
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: 'var(--surface-input)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)'
                  }}
                >
                  {trainer.experience}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onConsultTrainer(trainer)}
              className="kinetic-btn-secondary"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '0.9rem',
                fontWeight: 700
              }}
            >
              <MessageSquare size={16} color="var(--accent)" />
              Request 1-on-1 Consultation
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

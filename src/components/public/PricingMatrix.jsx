import { useState } from 'react';
import { Check, Zap, ArrowRight } from 'lucide-react';

export const PricingMatrix = ({ onSelectPlan }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  const tiers = [
    {
      id: 'starter',
      name: 'Starter Athlete',
      badge: 'ESSENTIALS',
      priceMonthly: 29,
      priceAnnual: 23,
      description: 'Ideal for self-driven lifters looking for structured routines and basic logging.',
      features: [
        'Full 24/7 Facility & Floor Access',
        'Standard Workout Routine Library',
        'Basic Set & Rep Logger',
        'Hydration & Caloric Tracker',
        'Community Leaderboard Access'
      ],
      isPopular: false,
      ctaLabel: 'Choose Starter'
    },
    {
      id: 'pro',
      name: 'Pro Athlete',
      badge: 'MOST POPULAR',
      priceMonthly: 49,
      priceAnnual: 39,
      description: 'The complete performance package with 1-on-1 coaching and biometric analytics.',
      features: [
        'Everything in Starter Athlete',
        'Assigned Dedicated Certified Coach',
        'Personalized Progressive Overload Plans',
        'Direct Trainer Messaging & Attachments',
        'Live Biometric Sync & Goal Rings',
        'Monthly Form Check Video Audits'
      ],
      isPopular: true,
      ctaLabel: 'Get Pro Athlete'
    },
    {
      id: 'elite',
      name: 'Elite Athlete',
      badge: 'UNLIMITED VIP',
      priceMonthly: 89,
      priceAnnual: 71,
      description: 'Maximum athletic potential with unlimited premium group classes and nutrition.',
      features: [
        'Everything in Pro Athlete',
        'Unlimited Class Station Reservations',
        'Custom Macro & Meal Periodization',
        'Priority 24/7 Coach Direct Line',
        'Complimentary Recovery Shakes',
        'Quarterly DEXA Body Scan Analysis'
      ],
      isPopular: false,
      ctaLabel: 'Join Elite Tier'
    }
  ];

  return (
    <section
      id="pricing"
      style={{
        padding: '80px 24px',
        maxWidth: '1360px',
        margin: '0 auto',
        width: '100%'
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
        <div className="kinetic-badge" style={{ marginBottom: '14px' }}>
          <Zap size={14} />
          <span>Transparent Membership Tiers</span>
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
          Invest in Your Highest Performance
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Choose the membership level that matches your ambition. Upgrade, downgrade, or cancel anytime.
        </p>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '28px',
            padding: '6px',
            background: 'var(--surface-input)',
            border: '1px solid var(--border-glass)',
            borderRadius: 'var(--radius-pill)'
          }}
        >
          <button
            type="button"
            onClick={() => setIsAnnual(false)}
            style={{
              padding: '8px 18px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.88rem',
              fontWeight: 700,
              background: !isAnnual ? 'var(--accent)' : 'transparent',
              color: !isAnnual ? 'var(--accent-contrast)' : 'var(--text-secondary)',
              transition: 'all var(--transition-fast)'
            }}
          >
            Monthly Billing
          </button>
          <button
            type="button"
            onClick={() => setIsAnnual(true)}
            style={{
              padding: '8px 18px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.88rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: isAnnual ? 'var(--accent)' : 'transparent',
              color: isAnnual ? 'var(--accent-contrast)' : 'var(--text-secondary)',
              transition: 'all var(--transition-fast)'
            }}
          >
            Annual Billing
            <span
              style={{
                fontSize: '0.72rem',
                padding: '2px 6px',
                borderRadius: 'var(--radius-pill)',
                background: isAnnual ? '#111111' : 'var(--accent)',
                color: isAnnual ? 'var(--accent)' : 'var(--accent-contrast)',
                fontWeight: 800
              }}
            >
              SAVE 20%
            </span>
          </button>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          alignItems: 'stretch'
        }}
      >
        {tiers.map((tier) => {
          const activePrice = isAnnual ? tier.priceAnnual : tier.priceMonthly;
          return (
            <div
              key={tier.id}
              className="kinetic-card"
              style={{
                padding: '36px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                border: tier.isPopular ? '2px solid var(--accent)' : '1px solid var(--border-glass)',
                boxShadow: tier.isPopular ? '0 0 32px var(--accent-glow)' : 'var(--shadow-sm)',
                transform: tier.isPopular ? 'scale(1.02)' : 'scale(1)'
              }}
            >
              {tier.isPopular && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--accent)',
                    color: 'var(--accent-contrast)',
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    padding: '4px 14px',
                    borderRadius: 'var(--radius-pill)',
                    boxShadow: '0 0 16px var(--accent)'
                  }}
                >
                  {tier.badge}
                </div>
              )}

              <div>
                <div
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    color: tier.isPopular ? 'var(--accent)' : 'var(--text-tertiary)',
                    marginBottom: '8px'
                  }}
                >
                  {!tier.isPopular && tier.badge}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.6rem',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    marginBottom: '8px'
                  }}
                >
                  {tier.name}
                </h3>
                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                    marginBottom: '24px'
                  }}
                >
                  {tier.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '24px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '3rem',
                      fontWeight: 900,
                      color: 'var(--text-primary)',
                      lineHeight: 1
                    }}
                  >
                    ${activePrice}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    / month {isAnnual ? '(billed annually)' : ''}
                  </span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    marginBottom: '32px',
                    borderTop: '1px solid var(--border-subtle)',
                    paddingTop: '24px'
                  }}
                >
                  {tier.features.map((feat, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '0.88rem',
                        color: 'var(--text-primary)',
                        textAlign: 'left'
                      }}
                    >
                      <div
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          background: 'var(--accent-subtle)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <Check size={12} color="var(--accent)" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectPlan(tier.name, isAnnual, activePrice)}
                className={tier.isPopular ? 'kinetic-btn-primary' : 'kinetic-btn-secondary'}
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '0.95rem',
                  fontWeight: 800
                }}
              >
                {tier.ctaLabel}
                <ArrowRight size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

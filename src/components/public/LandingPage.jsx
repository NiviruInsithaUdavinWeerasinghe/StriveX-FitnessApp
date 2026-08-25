import React, { useState } from 'react';
import { 
  Zap, 
  ArrowRight, 
  Play, 
  Check, 
  Activity, 
  ShieldCheck, 
  Users, 
  Calendar, 
  Clock, 
  Flame, 
  Heart, 
  TrendingUp, 
  Award,
  Sparkles,
  X
} from 'lucide-react';
import { PRICING_TIERS, LIVE_CLASSES } from '../../data/mockData';
import { useToast } from '../../context/ToastContext';
import './LandingPage.css';

export const LandingPage = ({ 
  onOpenRegister, 
  onOpenLogin,
  onRoleChange 
}) => {
  const { showToast } = useToast();
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [reservingClass, setReservingClass] = useState(null);
  const [bookedClasses, setBookedClasses] = useState([]);

  // Days list
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const categories = ['All', 'HIIT', 'Strength', 'Mobility', 'Hypertrophy', 'Cardio'];

  // Filter classes
  const filteredClasses = LIVE_CLASSES.filter(c => {
    const matchDay = c.day === selectedDay;
    const matchCat = selectedCategory === 'All' || c.category === selectedCategory;
    return matchDay && matchCat;
  });

  const handleBookClass = (classItem) => {
    if (bookedClasses.includes(classItem.id)) {
      showToast({
        type: 'info',
        title: 'Already Reserved',
        message: `You already have a reserved spot in ${classItem.title}.`
      });
      return;
    }
    setReservingClass(classItem);
  };

  const confirmReservation = () => {
    if (!reservingClass) return;
    setBookedClasses(prev => [...prev, reservingClass.id]);
    showToast({
      type: 'success',
      title: 'Class Reserved',
      message: `Your spot for ${reservingClass.title} on ${reservingClass.day} at ${reservingClass.time} is confirmed!`
    });
    setReservingClass(null);
  };

  return (
    <div className="landing-page-root">
      {/* 1. HERO SECTION */}
      <section className="hero-section" id="hero">
        <div className="hero-glow-blob" />
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-pulse-dot" />
              <span>Next-Gen Fitness Architecture</span>
              <span className="badge badge-primary">V2.4 Active</span>
            </div>

            <h1 className="hero-title">
              Engineered for <br />
              <span className="hero-highlight">Human Performance</span>
            </h1>

            <p className="hero-description">
              StriveX synchronizes high-performance athletic training, elite coach programming, real-time biometrics, and facility operations into one cohesive Kinetic Glass ecosystem.
            </p>

            <div className="hero-cta-group">
              <button 
                className="btn btn-primary btn-lg hero-cta-primary"
                onClick={() => onOpenRegister('tier-pro')}
              >
                Start Free 14-Day Trial <ArrowRight size={18} />
              </button>
              <button 
                className="btn btn-glass btn-lg"
                onClick={() => setIsVideoModalOpen(true)}
              >
                <Play size={16} className="play-icon-fill" /> Explore Demo
              </button>
            </div>

            {/* Live Metrics Row */}
            <div className="hero-metrics-row">
              <div className="hero-metric-item">
                <div className="metric-num">1,240+</div>
                <div className="metric-label">Active Athletes</div>
              </div>
              <div className="metric-divider" />
              <div className="hero-metric-item">
                <div className="metric-num">94.8%</div>
                <div className="metric-label">Goal Compliance</div>
              </div>
              <div className="metric-divider" />
              <div className="hero-metric-item">
                <div className="metric-num">4.9 / 5</div>
                <div className="metric-label">Athlete Rating</div>
              </div>
            </div>
          </div>

          {/* Hero Visual Card / Mock UI */}
          <div className="hero-visual-card glass-panel">
            <div className="visual-card-header">
              <div className="visual-header-user">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                  alt="Athlete" 
                  className="user-avatar-mini"
                />
                <div>
                  <div className="user-name-mini">Alex Rivera</div>
                  <div className="user-track-mini">Hypertrophy Track • Pro</div>
                </div>
              </div>
              <span className="badge badge-success">In Session</span>
            </div>

            {/* Visual Biometrics Mock */}
            <div className="visual-stats-grid">
              <div className="visual-stat-box">
                <div className="stat-icon-wrap cal">
                  <Flame size={16} />
                </div>
                <div className="stat-box-info">
                  <span className="stat-box-val">680 kcal</span>
                  <span className="stat-box-lbl">Active Burn</span>
                </div>
              </div>
              <div className="visual-stat-box">
                <div className="stat-icon-wrap hr">
                  <Heart size={16} />
                </div>
                <div className="stat-box-info">
                  <span className="stat-box-val">142 bpm</span>
                  <span className="stat-box-lbl">Heart Rate</span>
                </div>
              </div>
            </div>

            {/* Routine Highlight */}
            <div className="visual-routine-box">
              <div className="routine-box-header">
                <span className="routine-title-mini">Hypertrophy Push Day A</span>
                <span className="badge badge-primary">Coach Marcus</span>
              </div>
              <div className="progress-bar-track">
                <div className="progress-bar-fill" style={{ width: '65%' }} />
              </div>
              <div className="routine-footer-mini">
                <span>Set 3 of 4: Barbell Incline (80kg x 8)</span>
                <span className="accent-text">Active Timer 01:24</span>
              </div>
            </div>

            <button 
              className="btn btn-secondary btn-sm visual-quick-btn"
              onClick={() => onRoleChange('member')}
            >
              Open Athlete Hub <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* 2. PLATFORM FEATURES GRID */}
      <section className="features-section" id="features">
        <div className="section-container">
          <div className="section-header-center">
            <span className="section-pill">Unified Capabilities</span>
            <h2 className="section-title">Built for Peak Training Performance</h2>
            <p className="section-subtitle">
              Eliminate disconnected spreadsheets, disjointed WhatsApp chats, and paper workout cards with our centralized platform.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card glass-panel">
              <div className="feature-icon-box">
                <Zap size={24} />
              </div>
              <h3 className="feature-title">AI Progressive Overload</h3>
              <p className="feature-desc">
                Intelligent volume recommendations adjust sets, reps, and RPE based on your previous logs and recovery metrics.
              </p>
              <div className="feature-footer-tag">Auto Velocity Tracking</div>
            </div>

            <div className="feature-card glass-panel">
              <div className="feature-icon-box">
                <Users size={24} />
              </div>
              <h3 className="feature-title">Elite Coach Programming</h3>
              <p className="feature-desc">
                Personal trainers build, assign, and adapt tailored periodization schedules directly to your mobile app.
              </p>
              <div className="feature-footer-tag">Direct 1-on-1 Chat</div>
            </div>

            <div className="feature-card glass-panel">
              <div className="feature-icon-box">
                <Activity size={24} />
              </div>
              <h3 className="feature-title">Real-Time Biometrics</h3>
              <p className="feature-desc">
                Synchronize heart rate, caloric expenditure, active session duration, and multi-axis movement consistency.
              </p>
              <div className="feature-footer-tag">Triple Goal Rings</div>
            </div>

            <div className="feature-card glass-panel">
              <div className="feature-icon-box">
                <ShieldCheck size={24} />
              </div>
              <h3 className="feature-title">Facility Command Center</h3>
              <p className="feature-desc">
                Total managerial oversight with revenue analytics, staff capacity tracking, and automated billing ledgers.
              </p>
              <div className="feature-footer-tag">256-Bit Secure Ops</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE CLASS SCHEDULE */}
      <section className="schedule-section" id="schedule">
        <div className="section-container">
          <div className="section-header-center">
            <span className="section-pill">Live Booking</span>
            <h2 className="section-title">Weekly Performance Classes</h2>
            <p className="section-subtitle">
              Filter by workout discipline and reserve your spot in real time with our live seat management.
            </p>
          </div>

          {/* Days Switcher */}
          <div className="schedule-days-bar">
            {days.map((day) => (
              <button
                key={day}
                className={`day-tab-btn ${selectedDay === day ? 'active' : ''}`}
                onClick={() => setSelectedDay(day)}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Category Filter Pills */}
          <div className="schedule-cat-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`cat-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Classes Cards Grid */}
          <div className="classes-grid">
            {filteredClasses.length > 0 ? (
              filteredClasses.map((cls) => {
                const isBooked = bookedClasses.includes(cls.id);
                const spotsLeft = cls.capacity - cls.reserved - (isBooked ? 1 : 0);
                const fillPercent = Math.min(100, Math.round(((cls.reserved + (isBooked ? 1 : 0)) / cls.capacity) * 100));

                return (
                  <div key={cls.id} className="class-card glass-panel">
                    <div className="class-card-top">
                      <span className="badge badge-primary">{cls.category}</span>
                      <span className="class-duration">
                        <Clock size={14} /> {cls.duration}
                      </span>
                    </div>

                    <h3 className="class-title">{cls.title}</h3>
                    <p className="class-desc">{cls.description}</p>

                    <div className="class-time-row">
                      <Calendar size={15} className="time-icon" />
                      <span>{cls.time}</span>
                    </div>

                    <div className="class-instructor-row">
                      <img 
                        src={cls.instructorAvatar} 
                        alt={cls.instructor} 
                        className="instructor-avatar"
                      />
                      <div className="instructor-info">
                        <span className="instructor-name">{cls.instructor}</span>
                        <span className="instructor-role">Lead Instructor</span>
                      </div>
                    </div>

                    <div className="capacity-bar-wrap">
                      <div className="capacity-bar-labels">
                        <span>{fillPercent}% Capacity</span>
                        <span className="spots-count">{spotsLeft} spots left</span>
                      </div>
                      <div className="capacity-track">
                        <div 
                          className="capacity-fill" 
                          style={{ 
                            width: `${fillPercent}%`,
                            backgroundColor: fillPercent > 85 ? 'var(--color-warning)' : 'var(--color-primary)'
                          }} 
                        />
                      </div>
                    </div>

                    <button 
                      className={`btn ${isBooked ? 'btn-secondary' : 'btn-primary'} class-book-btn`}
                      onClick={() => handleBookClass(cls)}
                    >
                      {isBooked ? (
                        <>
                          <Check size={16} /> Spot Reserved
                        </>
                      ) : (
                        'Reserve Spot'
                      )}
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="no-classes-notice glass-panel">
                <Calendar size={36} className="empty-icon" />
                <p>No classes scheduled for {selectedCategory} on {selectedDay}.</p>
                <span>Select a different day or category filter above.</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. TIERED MEMBERSHIP PRICING */}
      <section className="pricing-section" id="pricing">
        <div className="section-container">
          <div className="section-header-center">
            <span className="section-pill">Membership Plans</span>
            <h2 className="section-title">Transparent Performance Tiers</h2>
            <p className="section-subtitle">
              Invest in your athletic potential. Switch between monthly or annual billing anytime.
            </p>

            {/* Billing Toggle */}
            <div className="pricing-billing-toggle glass-panel">
              <button 
                className={`billing-toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
                onClick={() => setBillingCycle('monthly')}
              >
                Monthly
              </button>
              <button 
                className={`billing-toggle-btn ${billingCycle === 'annual' ? 'active' : ''}`}
                onClick={() => setBillingCycle('annual')}
              >
                Annual <span className="save-badge">Save 20%</span>
              </button>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="pricing-grid">
            {PRICING_TIERS.map((tier) => {
              const price = billingCycle === 'annual' ? tier.annualPrice : tier.monthlyPrice;
              return (
                <div 
                  key={tier.id} 
                  className={`pricing-card glass-panel ${tier.highlighted ? 'is-highlighted' : ''}`}
                >
                  {tier.badge && (
                    <div className="pricing-badge-top">
                      <span className="badge badge-primary">{tier.badge}</span>
                    </div>
                  )}

                  <h3 className="tier-name">{tier.name}</h3>
                  <p className="tier-tagline">{tier.tagline}</p>

                  <div className="tier-price-row">
                    <span className="price-currency">$</span>
                    <span className="price-number">{price}</span>
                    <span className="price-period">/ month</span>
                  </div>
                  <span className="billed-note">
                    {billingCycle === 'annual' ? 'Billed annually ($' + (price * 12) + '/yr)' : 'Billed monthly'}
                  </span>

                  <div className="tier-divider" />

                  <ul className="tier-features-list">
                    {tier.features.map((feat, idx) => (
                      <li key={idx}>
                        <Check size={16} className="feature-check-icon" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    className={`btn ${tier.highlighted ? 'btn-primary' : 'btn-secondary'} btn-lg tier-cta-btn`}
                    onClick={() => onOpenRegister(tier.id)}
                  >
                    Select {tier.name} <ArrowRight size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. VIRTUAL DEMO VIDEO MODAL */}
      {isVideoModalOpen && (
        <div className="video-modal-backdrop" onClick={() => setIsVideoModalOpen(false)}>
          <div className="video-modal-container glass-panel" onClick={(e) => e.stopPropagation()}>
            <div className="video-modal-header">
              <div className="video-modal-title">
                <Zap size={18} className="brand-pulse-icon" />
                <span>StriveX Platform Interactive Walkthrough</span>
              </div>
              <button className="auth-close-btn" onClick={() => setIsVideoModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="video-preview-player">
              <div className="video-mock-screen">
                <div className="video-pulse-center">
                  <Play size={48} className="video-play-btn-big" />
                </div>
                <div className="video-overlay-text">
                  <h4>Interactive Ecosystem Demo</h4>
                  <p>Preview Member, Trainer, and Admin workspaces in real time</p>
                </div>
              </div>
            </div>
            <div className="video-modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  setIsVideoModalOpen(false);
                  onRoleChange('member');
                }}
              >
                Launch Member Hub
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setIsVideoModalOpen(false);
                  onOpenRegister('tier-pro');
                }}
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. RESERVATION CONFIRMATION MODAL */}
      {reservingClass && (
        <div className="auth-modal-backdrop" onClick={() => setReservingClass(null)}>
          <div className="auth-modal-container glass-panel" onClick={(e) => e.stopPropagation()}>
            <div className="auth-modal-header">
              <div className="auth-header-left">
                <div className="brand-logo-badge">
                  <Calendar size={18} className="brand-pulse-icon" />
                </div>
                <div>
                  <h3 className="auth-modal-title">Confirm Reservation</h3>
                  <p className="auth-modal-subtitle">{reservingClass.title}</p>
                </div>
              </div>
              <button className="auth-close-btn" onClick={() => setReservingClass(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="auth-modal-body">
              <div className="reservation-details-box glass-panel">
                <div className="res-row">
                  <span className="res-label">Instructor:</span>
                  <span className="res-val">{reservingClass.instructor}</span>
                </div>
                <div className="res-row">
                  <span className="res-label">Schedule:</span>
                  <span className="res-val">{reservingClass.day} • {reservingClass.time}</span>
                </div>
                <div className="res-row">
                  <span className="res-label">Intensity:</span>
                  <span className="badge badge-warning">{reservingClass.intensity} Intensity</span>
                </div>
              </div>

              <div className="auth-step-buttons" style={{ marginTop: '20px' }}>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setReservingClass(null)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={confirmReservation}
                >
                  Confirm My Spot <Check size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Flame,
  Heart,
  Clock,
  TrendingUp,
  Dumbbell,
  Droplets,
  Plus,
  Minus,
  Bell,
  Sun,
  Moon,
  LogOut,
  Sparkles,
  Calendar,
  MessageSquare,
  Settings,
  CheckCircle2
} from 'lucide-react';

export const MemberDashboard = ({
  onStartWorkout,
  onOpenSettings,
  onOpenChat
}) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  // Biometric state tracking
  const [calories] = useState(user?.todayCalories || 680);
  const targetCalories = user?.targetCalories || 800;

  const [activeMins] = useState(user?.activeMinutes || 54);
  const targetMins = user?.targetMinutes || 60;

  const [standHours] = useState(10);
  const targetStandHours = 12;

  const [waterMl, setWaterMl] = useState(2250);
  const targetWaterMl = 3000;

  // Notification drawer state
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 'notif_1',
      title: 'Routine Assigned by Coach Marcus',
      message: 'New Hypertrophy Push Day A routine has been added to your schedule.',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 'notif_2',
      title: '5-Day Streak Achieved!',
      message: 'You have completed all scheduled workouts this week. Keep the momentum!',
      time: 'Yesterday',
      unread: false
    }
  ]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Hydration handlers
  const handleAddWater = (amount) => {
    setWaterMl((prev) => Math.min(prev + amount, 5000));
  };
  const handleRemoveWater = (amount) => {
    setWaterMl((prev) => Math.max(prev - amount, 0));
  };

  // Ring calculations
  const calPercent = Math.min((calories / targetCalories) * 100, 100);
  const minPercent = Math.min((activeMins / targetMins) * 100, 100);
  const standPercent = Math.min((standHours / targetStandHours) * 100, 100);

  const weekDays = [
    { day: 'M', completed: true, label: 'Mon' },
    { day: 'T', completed: true, label: 'Tue' },
    { day: 'W', completed: true, label: 'Wed' },
    { day: 'T', completed: true, label: 'Thu' },
    { day: 'F', completed: true, label: 'Fri' },
    { day: 'S', completed: false, label: 'Sat (Today)', isToday: true },
    { day: 'S', completed: false, label: 'Sun' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingBottom: '60px' }}>
      {/* Top Header Navigation */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 800,
          background: 'var(--surface-glass)',
          backdropFilter: 'var(--blur-glass)',
          WebkitBackdropFilter: 'var(--blur-glass)',
          borderBottom: '1px solid var(--border-glass)',
          padding: '14px 24px'
        }}
      >
        <div
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}
        >
          {/* Athlete Profile Greeting */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ position: 'relative' }}>
              <img
                src={
                  user?.avatar ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop'
                }
                alt={user?.name || 'Athlete'}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--accent)',
                  boxShadow: '0 0 12px var(--accent-glow)'
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: 'var(--status-success)',
                  border: '2px solid var(--bg-primary)'
                }}
              />
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>
                ATHLETE HUB • {user?.tier || 'Pro Athlete'}
              </div>
              <div
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-display)'
                }}
              >
                Welcome back, {user?.name ? user.name.split(' ')[0] : 'Athlete'}
              </div>
            </div>
          </div>

          {/* Right Header Utilities */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Streak Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(212, 255, 0, 0.12)',
                border: '1px solid rgba(212, 255, 0, 0.3)',
                color: 'var(--accent)',
                fontSize: '0.82rem',
                fontWeight: 800
              }}
            >
              <Flame size={15} fill="var(--accent)" color="var(--accent)" />
              <span>{user?.streakDays || 5} DAY STREAK</span>
            </div>

            {/* Quick Chat Shortcut */}
            <button
              type="button"
              onClick={onOpenChat}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--surface-input)',
                border: '1px solid var(--border-glass)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all var(--transition-fast)'
              }}
              title="Message Trainer"
            >
              <MessageSquare size={17} color="var(--accent)" />
            </button>

            {/* Notification Bell */}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setIsNotifOpen((prev) => !prev)}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-pill)',
                  background: 'var(--surface-input)',
                  border: '1px solid var(--border-glass)',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
                title="Notifications"
              >
                <Bell size={17} />
                {unreadCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-2px',
                      right: '-2px',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      color: 'var(--accent-contrast)',
                      fontSize: '0.68rem',
                      fontWeight: 900,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown Drawer */}
              {isNotifOpen && (
                <div
                  className="kinetic-card animate-slide-up"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: '320px',
                    padding: '16px',
                    background: 'var(--surface-elevated)',
                    border: '1px solid var(--border-hover)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-lg)',
                    zIndex: 999
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                      paddingBottom: '8px',
                      borderBottom: '1px solid var(--border-subtle)'
                    }}
                  >
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      Notifications ({unreadCount})
                    </span>
                    <button
                      type="button"
                      onClick={markAllRead}
                      style={{ fontSize: '0.74rem', color: 'var(--accent)', fontWeight: 700 }}
                    >
                      Mark all read
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        style={{
                          padding: '10px',
                          borderRadius: 'var(--radius-md)',
                          background: n.unread ? 'var(--accent-subtle)' : 'transparent',
                          border: `1px solid ${n.unread ? 'var(--border-hover)' : 'transparent'}`
                        }}
                      >
                        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {n.title}
                        </div>
                        <div
                          style={{
                            fontSize: '0.76rem',
                            color: 'var(--text-secondary)',
                            marginTop: '2px',
                            lineHeight: 1.4
                          }}
                        >
                          {n.message}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                          {n.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--surface-input)',
                border: '1px solid var(--border-glass)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)'
              }}
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={17} color="var(--accent)" /> : <Moon size={17} color="var(--accent)" />}
            </button>

            {/* Settings Trigger */}
            <button
              type="button"
              onClick={onOpenSettings}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--surface-input)',
                border: '1px solid var(--border-glass)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)'
              }}
              title="Member Settings"
            >
              <Settings size={17} />
            </button>

            {/* Sign Out */}
            <button
              type="button"
              onClick={logout}
              className="kinetic-btn-ghost"
              style={{ padding: '8px 14px', fontSize: '0.82rem' }}
              title="Sign Out"
            >
              <LogOut size={15} />
              <span>Exit</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Workspace */}
      <main
        style={{
          maxWidth: '1360px',
          margin: '32px auto 0',
          padding: '0 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px'
        }}
      >
        {/* Row 1: KPI Stat Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px'
          }}
        >
          {/* Card 1: Calories Burned */}
          <div className="kinetic-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                Active Calories
              </span>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: 'rgba(239, 68, 68, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Flame size={18} color="#ef4444" />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '8px' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                {calories}
              </span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>/ {targetCalories} kcal</span>
            </div>
            <div style={{ height: '6px', background: 'var(--surface-input)', borderRadius: '3px', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${calPercent}%`,
                  background: '#ef4444',
                  boxShadow: '0 0 10px rgba(239, 68, 68, 0.5)',
                  transition: 'width var(--transition-normal)'
                }}
              />
            </div>
          </div>

          {/* Card 2: Average Heart Rate */}
          <div className="kinetic-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                Avg Training Heart Rate
              </span>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: 'rgba(245, 158, 11, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Heart size={18} color="#f59e0b" />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '8px' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                142
              </span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>bpm (Zone 4)</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--status-success)', fontWeight: 600 }}>
              • Optimal anaerobic threshold
            </div>
          </div>

          {/* Card 3: Active Training Time */}
          <div className="kinetic-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                Active Training Mins
              </span>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: 'rgba(212, 255, 0, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Clock size={18} color="var(--accent)" />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '8px' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                {activeMins}
              </span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>/ {targetMins} mins</span>
            </div>
            <div style={{ height: '6px', background: 'var(--surface-input)', borderRadius: '3px', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${minPercent}%`,
                  background: 'var(--accent)',
                  boxShadow: '0 0 10px var(--accent-glow)',
                  transition: 'width var(--transition-normal)'
                }}
              />
            </div>
          </div>

          {/* Card 4: Weekly Consistency */}
          <div className="kinetic-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                Consistency Score
              </span>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <TrendingUp size={18} color="var(--status-success)" />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '8px' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--status-success)' }}>
                94%
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Target Adherence</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Top 5% of StriveX athletes
            </div>
          </div>
        </div>

        {/* Row 2: Today's Routine Hero & Concentric SVG Goal Rings */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '24px'
          }}
        >
          {/* Today's Routine Card */}
          <div
            className="kinetic-card"
            style={{
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              background: `
                radial-gradient(circle at 90% 10%, rgba(212, 255, 0, 0.08) 0%, transparent 60%),
                var(--surface-card)
              `
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div className="kinetic-badge">
                  <Sparkles size={13} />
                  <span>Assigned Workout Routine</span>
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>Coach: Marcus Vance</span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.8rem',
                  fontWeight: 900,
                  color: 'var(--text-primary)',
                  marginBottom: '8px'
                }}
              >
                Hypertrophy Push Day A
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.5, marginBottom: '24px' }}>
                Heavy compound focus targeting pectoral clavicular head, anterior deltoids, and tricep lateral heads.
              </p>

              {/* Routine Exercises Mini-Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
                {[
                  'Barbell Bench Press (4×8)',
                  'Incline DB Press (3×10)',
                  'Cable Lateral Raises (4×15)',
                  'Weighted Dips (3×12)'
                ].map((ex, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--surface-input)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>

            {/* Launch Workout Logger Action */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
              <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                ⏱ Est. Time: <strong style={{ color: 'var(--text-primary)' }}>50 mins</strong>
              </div>

              <button
                type="button"
                onClick={onStartWorkout}
                className="kinetic-btn-primary"
                style={{ padding: '14px 28px', fontSize: '1rem', fontWeight: 800 }}
              >
                <Dumbbell size={18} />
                Start Workout Session
              </button>
            </div>
          </div>

          {/* Animated Concentric SVG Goal Rings */}
          <div
            className="kinetic-card"
            style={{
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                Daily Goal Rings
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 700 }}>LIVE SYNC</span>
            </div>

            {/* SVG Triple Concentric Rings */}
            <div style={{ position: 'relative', width: '200px', height: '200px', margin: '12px auto' }}>
              <svg width="200" height="200" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(239, 68, 68, 0.15)" strokeWidth="12" />
                <circle cx="100" cy="100" r="65" fill="none" stroke="rgba(212, 255, 0, 0.15)" strokeWidth="12" />
                <circle cx="100" cy="100" r="45" fill="none" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="12" />

                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="12"
                  strokeDasharray={2 * Math.PI * 85}
                  strokeDashoffset={2 * Math.PI * 85 * (1 - calPercent / 100)}
                  strokeLinecap="round"
                  transform="rotate(-90 100 100)"
                  style={{ transition: 'stroke-dashoffset 1s ease' }}
                />

                <circle
                  cx="100"
                  cy="100"
                  r="65"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="12"
                  strokeDasharray={2 * Math.PI * 65}
                  strokeDashoffset={2 * Math.PI * 65 * (1 - minPercent / 100)}
                  strokeLinecap="round"
                  transform="rotate(-90 100 100)"
                  style={{ transition: 'stroke-dashoffset 1s ease' }}
                />

                <circle
                  cx="100"
                  cy="100"
                  r="45"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="12"
                  strokeDasharray={2 * Math.PI * 45}
                  strokeDashoffset={2 * Math.PI * 45 * (1 - standPercent / 100)}
                  strokeLinecap="round"
                  transform="rotate(-90 100 100)"
                  style={{ transition: 'stroke-dashoffset 1s ease' }}
                />
              </svg>

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <span style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                  {Math.round((calPercent + minPercent + standPercent) / 3)}%
                </span>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                  Complete
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.74rem', color: '#ef4444', fontWeight: 700 }}>• MOVE</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {calories} kcal
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.74rem', color: 'var(--accent)', fontWeight: 700 }}>• EXERCISE</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {activeMins} mins
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.74rem', color: '#06b6d4', fontWeight: 700 }}>• STAND</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {standHours} hrs
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Quick Hydration & Weekly Adherence Timeline */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          {/* Quick Hydration Widget */}
          <div className="kinetic-card" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Droplets size={20} color="#06b6d4" />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Hydration Tracker
                </h4>
              </div>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Target: {targetWaterMl} ml
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.4rem',
                  fontWeight: 900,
                  color: '#06b6d4'
                }}
              >
                {waterMl}
              </span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                ml ({Math.round((waterMl / targetWaterMl) * 100)}%)
              </span>
            </div>

            <div style={{ height: '8px', background: 'var(--surface-input)', borderRadius: '4px', overflow: 'hidden', marginBottom: '20px' }}>
              <div
                style={{
                  height: '100%',
                  width: `${Math.min((waterMl / targetWaterMl) * 100, 100)}%`,
                  background: '#06b6d4',
                  boxShadow: '0 0 12px rgba(6, 182, 212, 0.5)',
                  transition: 'width var(--transition-fast)'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => handleAddWater(250)}
                className="kinetic-btn-secondary"
                style={{ flex: 1, padding: '8px 12px', fontSize: '0.8rem', fontWeight: 700 }}
              >
                <Plus size={14} /> +250ml
              </button>
              <button
                type="button"
                onClick={() => handleAddWater(500)}
                className="kinetic-btn-secondary"
                style={{ flex: 1, padding: '8px 12px', fontSize: '0.8rem', fontWeight: 700 }}
              >
                <Plus size={14} /> +500ml
              </button>
              <button
                type="button"
                onClick={() => handleRemoveWater(250)}
                className="kinetic-btn-ghost"
                style={{ padding: '8px 12px', fontSize: '0.8rem' }}
                title="Undo last entry"
              >
                <Minus size={14} />
              </button>
            </div>
          </div>

          {/* Weekly Consistency & Activity Days */}
          <div className="kinetic-card" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={18} color="var(--accent)" />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Weekly Activity Schedule
                </h4>
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--status-success)', fontWeight: 700 }}>
                5/7 Days Logged
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0' }}>
              {weekDays.map((wd, idx) => (
                <div key={idx} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: wd.completed
                        ? 'var(--accent)'
                        : wd.isToday
                        ? 'var(--surface-elevated)'
                        : 'var(--surface-input)',
                      border: wd.isToday ? '2px solid var(--accent)' : '1px solid var(--border-subtle)',
                      color: wd.completed ? '#111111' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      boxShadow: wd.completed ? '0 0 12px var(--accent-glow)' : 'none'
                    }}
                  >
                    {wd.completed ? <CheckCircle2 size={18} /> : wd.day}
                  </div>
                  <span style={{ fontSize: '0.72rem', color: wd.isToday ? 'var(--accent)' : 'var(--text-tertiary)', fontWeight: wd.isToday ? 700 : 500 }}>
                    {wd.label.split(' ')[0]}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--surface-input)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Next Coach Assessment: <strong style={{ color: 'var(--text-primary)' }}>Monday 9:00 AM</strong>
              </div>
              <button
                type="button"
                onClick={onOpenChat}
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: 'var(--accent)',
                  cursor: 'pointer'
                }}
              >
                Chat Coach →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

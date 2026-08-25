import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { validateName, validatePhoneNumber, validateEmail } from '../../utils/validation';
import { CustomDropdown } from '../ui/CustomDropdown';
import {
  X,
  User,
  Mail,
  Phone,
  Target,
  CreditCard,
  Bell,
  Sun,
  Moon,
  Shield,
  Save,
  Flame,
  Clock,
  Droplets,
  Award
} from 'lucide-react';

export const MemberSettingsModal = ({ isOpen, onClose }) => {
  const { user, updateProfile } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('profile');

  // Profile fields state
  const [name, setName] = useState(user?.name || 'Alex Mercer');
  const [email, setEmail] = useState(user?.email || 'alex@strivex.fit');
  const [phone, setPhone] = useState(user?.phone || '0771234567');

  // Biometric targets state
  const [targetCalories, setTargetCalories] = useState(user?.targetCalories || 800);
  const [targetMinutes, setTargetMinutes] = useState(user?.targetMinutes || 60);
  const [targetWater, setTargetWater] = useState(3000);
  const [weightKg, setWeightKg] = useState(78);
  const [heightCm, setHeightCm] = useState(180);

  // Membership & preferences state
  const [selectedTier, setSelectedTier] = useState(user?.tier || 'Pro Athlete');
  const [enableSoundAlerts, setEnableSoundAlerts] = useState(true);
  const [enablePushNotifs, setEnablePushNotifs] = useState(true);

  // Validation errors
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  if (!isOpen) return null;

  // Calculate BMI
  const heightM = heightCm / 100;
  const bmi = (weightKg / (heightM * heightM)).toFixed(1);

  const handleNameChange = (val) => {
    setName(val);
    if (touched.name) {
      const res = validateName(val);
      setErrors((prev) => ({ ...prev, name: res.isValid ? '' : res.message }));
    }
  };

  const handleEmailChange = (val) => {
    setEmail(val);
    if (touched.email) {
      const res = validateEmail(val);
      setErrors((prev) => ({ ...prev, email: res.isValid ? '' : res.message }));
    }
  };

  const handlePhoneChange = (val) => {
    setPhone(val);
    if (touched.phone) {
      const res = validatePhoneNumber(val);
      setErrors((prev) => ({ ...prev, phone: res.isValid ? '' : res.message }));
    }
  };

  const handleSaveAll = (e) => {
    e.preventDefault();
    const nameRes = validateName(name);
    const emailRes = validateEmail(email);
    const phoneRes = validatePhoneNumber(phone);

    const newErrors = {};
    if (!nameRes.isValid) newErrors.name = nameRes.message;
    if (!emailRes.isValid) newErrors.email = emailRes.message;
    if (!phoneRes.isValid) newErrors.phone = phoneRes.message;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({ name: true, email: true, phone: true });
      addToast({
        type: 'error',
        title: 'Settings Invalid',
        message: 'Please resolve form errors before saving profile'
      });
      return;
    }

    if (updateProfile) {
      updateProfile({
        name,
        email,
        phone,
        targetCalories: Number(targetCalories),
        targetMinutes: Number(targetMinutes),
        tier: selectedTier
      });
    }

    addToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your athlete preferences and biometric targets have been saved'
    });

    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9990,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div
        className="kinetic-card animate-scale-up"
        style={{
          width: '100%',
          maxWidth: '780px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--surface-elevated)',
          border: '1px solid var(--border-hover)',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 28px',
            background: 'var(--surface-glass)',
            borderBottom: '1px solid var(--border-glass)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="kinetic-badge">
              <Shield size={14} />
              <span>Athlete Preferences</span>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                fontWeight: 900,
                color: 'var(--text-primary)'
              }}
            >
              Account & Biometric Settings
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: 'var(--radius-pill)',
              background: 'var(--surface-glass)',
              color: 'var(--text-secondary)'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Selection Navigation */}
        <div
          style={{
            display: 'flex',
            background: 'var(--surface-input)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '0 24px'
          }}
        >
          {[
            { id: 'profile', label: 'Athlete Profile', icon: User },
            { id: 'biometrics', label: 'Biometric Targets', icon: Target },
            { id: 'membership', label: 'Membership & Tier', icon: CreditCard },
            { id: 'preferences', label: 'App Preferences', icon: Bell }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 18px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  borderBottom: `2px solid ${isActive ? 'var(--accent)' : 'transparent'}`,
                  transition: 'all var(--transition-fast)'
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '28px' }}>
          {/* TAB 1: Profile */}
          {activeTab === 'profile' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '8px' }}>
                <img
                  src={
                    user?.avatar ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop'
                  }
                  alt={name}
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid var(--accent)',
                    boxShadow: '0 0 16px var(--accent-glow)'
                  }}
                />
                <div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>{name}</h4>
                  <span style={{ fontSize: '0.82rem', color: 'var(--accent)', fontWeight: 700 }}>
                    {selectedTier} Tier Athlete
                  </span>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                    Assigned Trainer: Coach Marcus Vance
                  </div>
                </div>
              </div>

              <div className="kinetic-input-group">
                <label className="kinetic-label">Full Name *</label>
                <div className="kinetic-input-wrapper">
                  <User size={18} className="kinetic-input-icon" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    onBlur={() => {
                      setTouched((prev) => ({ ...prev, name: true }));
                      const res = validateName(name);
                      setErrors((prev) => ({ ...prev, name: res.isValid ? '' : res.message }));
                    }}
                    className={`kinetic-input has-icon ${errors.name ? 'is-invalid' : ''}`}
                  />
                </div>
                {errors.name && <span className="kinetic-input-error">{errors.name}</span>}
              </div>

              <div className="kinetic-input-group">
                <label className="kinetic-label">Email Address *</label>
                <div className="kinetic-input-wrapper">
                  <Mail size={18} className="kinetic-input-icon" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    onBlur={() => {
                      setTouched((prev) => ({ ...prev, email: true }));
                      const res = validateEmail(email);
                      setErrors((prev) => ({ ...prev, email: res.isValid ? '' : res.message }));
                    }}
                    className={`kinetic-input has-icon ${errors.email ? 'is-invalid' : ''}`}
                  />
                </div>
                {errors.email && <span className="kinetic-input-error">{errors.email}</span>}
              </div>

              <div className="kinetic-input-group">
                <label className="kinetic-label">Contact Phone Number *</label>
                <div className="kinetic-input-wrapper">
                  <Phone size={18} className="kinetic-input-icon" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    onBlur={() => {
                      setTouched((prev) => ({ ...prev, phone: true }));
                      const res = validatePhoneNumber(phone);
                      setErrors((prev) => ({ ...prev, phone: res.isValid ? '' : res.message }));
                    }}
                    className={`kinetic-input has-icon ${errors.phone ? 'is-invalid' : ''}`}
                  />
                </div>
                {errors.phone ? (
                  <span className="kinetic-input-error">{errors.phone}</span>
                ) : (
                  <span className="kinetic-input-hint">Validates Sri Lankan (07X... / +94...) or international format</span>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: Biometrics */}
          {activeTab === 'biometrics' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--surface-input)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.74rem', color: 'var(--accent)', fontWeight: 800 }}>BODY METRICS</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {weightKg} kg / {heightCm} cm
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)' }}>BMI SCORE</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--status-success)' }}>
                    {bmi} <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>(Normal)</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="kinetic-input-group">
                  <label className="kinetic-label">Body Weight (kg)</label>
                  <input
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="kinetic-input"
                  />
                </div>
                <div className="kinetic-input-group">
                  <label className="kinetic-label">Height (cm)</label>
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="kinetic-input"
                  />
                </div>
              </div>

              <div className="kinetic-input-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label className="kinetic-label" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Flame size={15} color="#ef4444" /> Daily Active Calorie Target (kcal)
                  </label>
                  <span style={{ fontWeight: 800, color: 'var(--accent)', fontSize: '0.9rem' }}>
                    {targetCalories} kcal
                  </span>
                </div>
                <input
                  type="range"
                  min="400"
                  max="1600"
                  step="50"
                  value={targetCalories}
                  onChange={(e) => setTargetCalories(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent)' }}
                />
              </div>

              <div className="kinetic-input-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label className="kinetic-label" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={15} color="var(--accent)" /> Daily Active Training Minutes Target
                  </label>
                  <span style={{ fontWeight: 800, color: 'var(--accent)', fontSize: '0.9rem' }}>
                    {targetMinutes} mins
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="150"
                  step="5"
                  value={targetMinutes}
                  onChange={(e) => setTargetMinutes(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent)' }}
                />
              </div>

              <div className="kinetic-input-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label className="kinetic-label" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Droplets size={15} color="#06b6d4" /> Daily Water Intake Target (ml)
                  </label>
                  <span style={{ fontWeight: 800, color: '#06b6d4', fontSize: '0.9rem' }}>
                    {targetWater} ml
                  </span>
                </div>
                <input
                  type="range"
                  min="1500"
                  max="4500"
                  step="250"
                  value={targetWater}
                  onChange={(e) => setTargetWater(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#06b6d4' }}
                />
              </div>
            </div>
          )}

          {/* TAB 3: Membership */}
          {activeTab === 'membership' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                style={{
                  padding: '20px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'rgba(212, 255, 0, 0.08)',
                  border: '1px solid rgba(212, 255, 0, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Award size={18} color="var(--accent)" />
                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--accent)' }}>
                      CURRENT MEMBERSHIP
                    </span>
                  </div>
                  <h4 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '4px' }}>
                    {selectedTier}
                  </h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Renewal Date: September 25, 2026 • Status: <strong>Active</strong>
                  </div>
                </div>
                <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--accent)' }}>$49/mo</div>
              </div>

              <div style={{ marginTop: '10px' }}>
                <CustomDropdown
                  label="Change / Upgrade Membership Tier"
                  value={selectedTier}
                  onChange={(val) => setSelectedTier(val)}
                  options={[
                    { value: 'Starter', label: 'Starter Tier ($29/mo) - Essential Gym Access' },
                    { value: 'Pro Athlete', label: 'Pro Athlete Tier ($49/mo) - AI Tracker + Routine Sync' },
                    { value: 'Elite', label: 'Elite Tier ($89/mo) - Unlimited PT + Biometrics' }
                  ]}
                />
              </div>

              <div
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--surface-input)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CreditCard size={20} color="var(--accent)" />
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Mastercard ending in 8892
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)' }}>Expires 12/28</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    addToast({
                      type: 'info',
                      title: 'Card Management',
                      message: 'Payment method update gateway active'
                    })
                  }
                  style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 700 }}
                >
                  Update Card
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: Preferences */}
          {activeTab === 'preferences' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--surface-input)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    Display Theme
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    Current Mode: <strong>{theme.toUpperCase()}</strong>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="kinetic-btn-secondary"
                  style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                >
                  {theme === 'dark' ? <Sun size={15} color="var(--accent)" /> : <Moon size={15} color="var(--accent)" />}
                  <span>Switch Theme</span>
                </button>
              </div>

              <div
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--surface-input)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    Workout Rest Audio Chime
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    Play acoustic signal when rest interval ends
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setEnableSoundAlerts((prev) => !prev)}
                  style={{
                    width: '46px',
                    height: '24px',
                    borderRadius: '12px',
                    background: enableSoundAlerts ? 'var(--accent)' : 'var(--border-glass)',
                    position: 'relative',
                    transition: 'background var(--transition-fast)'
                  }}
                >
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: '#111111',
                      position: 'absolute',
                      top: '3px',
                      left: enableSoundAlerts ? '24px' : '4px',
                      transition: 'left var(--transition-fast)'
                    }}
                  />
                </button>
              </div>

              <div
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--surface-input)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    Coach Routine Push Notifications
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    Notify when coach assigns new progressive workout
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setEnablePushNotifs((prev) => !prev)}
                  style={{
                    width: '46px',
                    height: '24px',
                    borderRadius: '12px',
                    background: enablePushNotifs ? 'var(--accent)' : 'var(--border-glass)',
                    position: 'relative',
                    transition: 'background var(--transition-fast)'
                  }}
                >
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: '#111111',
                      position: 'absolute',
                      top: '3px',
                      left: enablePushNotifs ? '24px' : '4px',
                      transition: 'left var(--transition-fast)'
                    }}
                  />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Save Action */}
        <div
          style={{
            padding: '16px 28px',
            background: 'var(--surface-glass)',
            borderTop: '1px solid var(--border-glass)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '12px'
          }}
        >
          <button type="button" onClick={onClose} className="kinetic-btn-ghost">
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveAll}
            className="kinetic-btn-primary"
            style={{ padding: '12px 24px', fontWeight: 800 }}
          >
            <Save size={16} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

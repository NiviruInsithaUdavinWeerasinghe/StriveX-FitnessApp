import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import {
  validateName,
  validateEmail,
  validatePhoneNumber,
  validatePassword,
  validateCardNumber,
  validateExpiry,
  validateCVC
} from '../../utils/validation';
import { CustomDropdown } from '../ui/CustomDropdown';
import {
  X,
  User,
  Mail,
  Phone,
  Lock,
  CreditCard,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Flame,
  Target
} from 'lucide-react';

export const RegistrationModal = ({ isOpen, onClose, initialPlan = 'Pro Athlete', isAnnual = true }) => {
  const { login } = useAuth();
  const { addToast } = useToast();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    goal: 'Hypertrophy',
    experience: 'Intermediate',
    targetDays: '4',
    selectedPlan: initialPlan,
    isAnnualBilling: isAnnual,
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (touched[field]) {
      let res = { isValid: true, message: '' };
      if (field === 'name') res = validateName(value);
      if (field === 'email') res = validateEmail(value);
      if (field === 'phone') res = validatePhoneNumber(value);
      if (field === 'password') res = validatePassword(value);
      if (field === 'cardNumber') res = validateCardNumber(value);
      if (field === 'cardExpiry') res = validateExpiry(value);
      if (field === 'cardCVC') res = validateCVC(value);

      setErrors((prev) => ({ ...prev, [field]: res.isValid ? '' : res.message }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    let res = { isValid: true, message: '' };
    if (field === 'name') res = validateName(formData.name);
    if (field === 'email') res = validateEmail(formData.email);
    if (field === 'phone') res = validatePhoneNumber(formData.phone);
    if (field === 'password') res = validatePassword(formData.password);
    if (field === 'cardNumber') res = validateCardNumber(formData.cardNumber);
    if (field === 'cardExpiry') res = validateExpiry(formData.cardExpiry);
    if (field === 'cardCVC') res = validateCVC(formData.cardCVC);

    setErrors((prev) => ({ ...prev, [field]: res.isValid ? '' : res.message }));
  };

  const handleStep1Next = () => {
    const nameRes = validateName(formData.name);
    const emailRes = validateEmail(formData.email);
    const phoneRes = validatePhoneNumber(formData.phone);
    const passRes = validatePassword(formData.password);

    const newErrors = {};
    if (!nameRes.isValid) newErrors.name = nameRes.message;
    if (!emailRes.isValid) newErrors.email = emailRes.message;
    if (!phoneRes.isValid) newErrors.phone = phoneRes.message;
    if (!passRes.isValid) newErrors.password = passRes.message;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({ name: true, email: true, phone: true, password: true });
      addToast({
        type: 'error',
        title: 'Step 1 Incomplete',
        message: 'Please resolve the highlighted credential errors'
      });
      return;
    }
    setStep(2);
  };

  const handleStep2Next = () => {
    setStep(3);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    const cardRes = validateCardNumber(formData.cardNumber);
    const expRes = validateExpiry(formData.cardExpiry);
    const cvcRes = validateCVC(formData.cardCVC);
    const nameRes = validateName(formData.cardName || formData.name);

    const newErrors = {};
    if (!cardRes.isValid) newErrors.cardNumber = cardRes.message;
    if (!expRes.isValid) newErrors.cardExpiry = expRes.message;
    if (!cvcRes.isValid) newErrors.cardCVC = cvcRes.message;
    if (!nameRes.isValid) newErrors.cardName = nameRes.message;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched((prev) => ({ ...prev, cardNumber: true, cardExpiry: true, cardCVC: true, cardName: true }));
      addToast({
        type: 'error',
        title: 'Payment Incomplete',
        message: 'Please enter valid mock payment details'
      });
      return;
    }

    // Complete registration
    setStep(4);
    setTimeout(() => {
      login('member', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        tier: formData.selectedPlan
      });
      onClose();
    }, 1800);
  };

  const passValidation = validatePassword(formData.password);

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
          maxWidth: '560px',
          padding: '32px',
          background: 'var(--surface-elevated)',
          border: '1px solid var(--border-hover)',
          borderRadius: 'var(--radius-xl)',
          position: 'relative',
          boxShadow: 'var(--shadow-lg)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Step Indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px'
          }}
        >
          <div>
            <span
              style={{
                fontSize: '0.74rem',
                fontWeight: 800,
                color: 'var(--accent)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              {step < 4 ? `Step ${step} of 3: ${step === 1 ? 'Account Setup' : step === 2 ? 'Athlete Profile' : 'Plan Checkout'}` : 'Onboarding Complete'}
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.45rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginTop: '2px'
              }}
            >
              {step === 1 && 'Create Your StriveX Account'}
              {step === 2 && 'Personalize Your Training Goals'}
              {step === 3 && 'Membership Confirmation & Payment'}
              {step === 4 && 'Welcome to StriveX!'}
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

        {/* Progress Step Bar */}
        {step < 4 && (
          <div
            style={{
              display: 'flex',
              gap: '6px',
              marginBottom: '24px'
            }}
          >
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                style={{
                  height: '4px',
                  flex: 1,
                  borderRadius: '2px',
                  background: step >= s ? 'var(--accent)' : 'var(--border-subtle)',
                  boxShadow: step >= s ? '0 0 8px var(--accent-glow)' : 'none',
                  transition: 'background var(--transition-normal)'
                }}
              />
            ))}
          </div>
        )}

        {/* Step 1: Personal Credentials */}
        {step === 1 && (
          <div className="animate-fade-in">
            {/* Full Name */}
            <div className="kinetic-input-group">
              <label className="kinetic-label">Full Name *</label>
              <div className="kinetic-input-wrapper">
                <User size={18} className="kinetic-input-icon" />
                <input
                  type="text"
                  placeholder="e.g. Kasun Fernando"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  className={`kinetic-input has-icon ${errors.name ? 'is-invalid' : ''}`}
                />
              </div>
              {errors.name && <span className="kinetic-input-error">{errors.name}</span>}
            </div>

            {/* Email Address */}
            <div className="kinetic-input-group">
              <label className="kinetic-label">Email Address *</label>
              <div className="kinetic-input-wrapper">
                <Mail size={18} className="kinetic-input-icon" />
                <input
                  type="email"
                  placeholder="e.g. athlete@strivex.fit"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  className={`kinetic-input has-icon ${errors.email ? 'is-invalid' : ''}`}
                />
              </div>
              {errors.email && <span className="kinetic-input-error">{errors.email}</span>}
            </div>

            {/* Phone Number with Sri Lankan & international validation */}
            <div className="kinetic-input-group">
              <label className="kinetic-label">Phone Number *</label>
              <div className="kinetic-input-wrapper">
                <Phone size={18} className="kinetic-input-icon" />
                <input
                  type="tel"
                  placeholder="e.g. 0771234567 or +94771234567"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  onBlur={() => handleBlur('phone')}
                  className={`kinetic-input has-icon ${errors.phone ? 'is-invalid' : ''}`}
                />
              </div>
              {errors.phone ? (
                <span className="kinetic-input-error">{errors.phone}</span>
              ) : (
                <span className="kinetic-input-hint">Sri Lankan format (07X... / +94...) or international format</span>
              )}
            </div>

            {/* Password */}
            <div className="kinetic-input-group">
              <label className="kinetic-label">Password *</label>
              <div className="kinetic-input-wrapper">
                <Lock size={18} className="kinetic-input-icon" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  onBlur={() => handleBlur('password')}
                  className={`kinetic-input has-icon ${errors.password ? 'is-invalid' : ''}`}
                />
              </div>

              {/* Password Strength Indicator */}
              {formData.password.length > 0 && (
                <div style={{ marginTop: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Security Strength:</span>
                    <span
                      style={{
                        fontWeight: 700,
                        color:
                          passValidation.score >= 75
                            ? 'var(--status-success)'
                            : passValidation.score >= 50
                            ? 'var(--status-warning)'
                            : 'var(--status-error)'
                      }}
                    >
                      {passValidation.score >= 75 ? 'Strong' : passValidation.score >= 50 ? 'Medium' : 'Weak'}
                    </span>
                  </div>
                  <div style={{ height: '4px', background: 'var(--surface-input)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${passValidation.score}%`,
                        background:
                          passValidation.score >= 75
                            ? 'var(--status-success)'
                            : passValidation.score >= 50
                            ? 'var(--status-warning)'
                            : 'var(--status-error)',
                        transition: 'width var(--transition-fast)'
                      }}
                    />
                  </div>
                </div>
              )}
              {errors.password && <span className="kinetic-input-error">{errors.password}</span>}
            </div>

            {/* Next Action */}
            <button
              type="button"
              onClick={handleStep1Next}
              className="kinetic-btn-primary"
              style={{ width: '100%', padding: '14px', marginTop: '12px' }}
            >
              Continue to Athlete Profile
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* Step 2: Fitness Profile & Goals */}
        {step === 2 && (
          <div className="animate-fade-in">
            {/* Custom Dropdown: Goal */}
            <div style={{ marginBottom: '18px' }}>
              <CustomDropdown
                label="Primary Fitness Goal *"
                value={formData.goal}
                onChange={(val) => handleChange('goal', val)}
                options={[
                  { value: 'Hypertrophy', label: 'Muscle Hypertrophy & Growth' },
                  { value: 'FatLoss', label: 'Fat Loss & Body Recomposition' },
                  { value: 'Strength', label: 'Maximal Strength & Powerlifting' },
                  { value: 'Endurance', label: 'Endurance & Athletic Conditioning' },
                  { value: 'Mobility', label: 'Joint Mobility & Functional Health' }
                ]}
              />
            </div>

            {/* Custom Dropdown: Experience */}
            <div style={{ marginBottom: '18px' }}>
              <CustomDropdown
                label="Training Experience Level *"
                value={formData.experience}
                onChange={(val) => handleChange('experience', val)}
                options={[
                  { value: 'Beginner', label: 'Beginner (< 1 Year Training)' },
                  { value: 'Intermediate', label: 'Intermediate (1 - 3 Years Training)' },
                  { value: 'Advanced', label: 'Advanced (3+ Years Consistent Lifting)' }
                ]}
              />
            </div>

            {/* Custom Dropdown: Target Days */}
            <div style={{ marginBottom: '24px' }}>
              <CustomDropdown
                label="Target Training Frequency *"
                value={formData.targetDays}
                onChange={(val) => handleChange('targetDays', val)}
                options={[
                  { value: '3', label: '3 Days / Week (Full Body Split)' },
                  { value: '4', label: '4 Days / Week (Upper / Lower Split)' },
                  { value: '5', label: '5 Days / Week (Push / Pull / Legs Split)' },
                  { value: '6', label: '6 Days / Week (High Frequency Athletic)' }
                ]}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="kinetic-btn-ghost"
                style={{ flex: 1 }}
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                type="button"
                onClick={handleStep2Next}
                className="kinetic-btn-primary"
                style={{ flex: 2 }}
              >
                Continue to Checkout <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Plan Checkout & Mock Payment */}
        {step === 3 && (
          <form onSubmit={handleFinalSubmit} className="animate-fade-in">
            {/* Plan Summary Card */}
            <div
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--surface-input)',
                border: '1px solid var(--border-hover)',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: '0.74rem', color: 'var(--accent)', fontWeight: 800 }}>SELECTED TIER</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {formData.selectedPlan}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {formData.isAnnualBilling ? 'Annual Billing ($39/mo, Save 20%)' : 'Monthly Billing ($49/mo)'}
                </div>
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--accent)' }}>
                {formData.isAnnualBilling ? '$39' : '$49'}
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>/mo</span>
              </div>
            </div>

            {/* Cardholder Name */}
            <div className="kinetic-input-group">
              <label className="kinetic-label">Name on Card *</label>
              <input
                type="text"
                placeholder={formData.name || 'e.g. Kasun Fernando'}
                value={formData.cardName}
                onChange={(e) => handleChange('cardName', e.target.value)}
                onBlur={() => handleBlur('cardName')}
                className={`kinetic-input ${errors.cardName ? 'is-invalid' : ''}`}
              />
              {errors.cardName && <span className="kinetic-input-error">{errors.cardName}</span>}
            </div>

            {/* Card Number */}
            <div className="kinetic-input-group">
              <label className="kinetic-label">Card Number *</label>
              <div className="kinetic-input-wrapper">
                <CreditCard size={18} className="kinetic-input-icon" />
                <input
                  type="text"
                  placeholder="4532 •••• •••• 8892"
                  value={formData.cardNumber}
                  onChange={(e) => handleChange('cardNumber', e.target.value)}
                  onBlur={() => handleBlur('cardNumber')}
                  className={`kinetic-input has-icon ${errors.cardNumber ? 'is-invalid' : ''}`}
                  maxLength={19}
                />
              </div>
              {errors.cardNumber && <span className="kinetic-input-error">{errors.cardNumber}</span>}
            </div>

            {/* Expiry & CVC */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="kinetic-input-group">
                <label className="kinetic-label">Expiry (MM/YY) *</label>
                <input
                  type="text"
                  placeholder="12/28"
                  value={formData.cardExpiry}
                  onChange={(e) => handleChange('cardExpiry', e.target.value)}
                  onBlur={() => handleBlur('cardExpiry')}
                  className={`kinetic-input ${errors.cardExpiry ? 'is-invalid' : ''}`}
                  maxLength={5}
                />
                {errors.cardExpiry && <span className="kinetic-input-error">{errors.cardExpiry}</span>}
              </div>

              <div className="kinetic-input-group">
                <label className="kinetic-label">CVC / CVV *</label>
                <input
                  type="password"
                  placeholder="892"
                  value={formData.cardCVC}
                  onChange={(e) => handleChange('cardCVC', e.target.value)}
                  onBlur={() => handleBlur('cardCVC')}
                  className={`kinetic-input ${errors.cardCVC ? 'is-invalid' : ''}`}
                  maxLength={4}
                />
                {errors.cardCVC && <span className="kinetic-input-error">{errors.cardCVC}</span>}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="kinetic-btn-ghost"
                style={{ flex: 1 }}
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                type="submit"
                className="kinetic-btn-primary"
                style={{ flex: 2 }}
              >
                <ShieldCheck size={16} /> Complete & Start Trial
              </button>
            </div>
          </form>
        )}

        {/* Step 4: Success State */}
        {step === 4 && (
          <div
            className="animate-scale-up"
            style={{
              textAlign: 'center',
              padding: '36px 12px'
            }}
          >
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'var(--status-success-bg)',
                border: '2px solid var(--status-success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                animation: 'pulseGlow 2s infinite'
              }}
            >
              <CheckCircle2 size={40} color="var(--status-success)" />
            </div>

            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: '8px'
              }}
            >
              Athlete Account Activated!
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '380px', margin: '0 auto 24px' }}>
              Welcome to StriveX, <strong>{formData.name}</strong>. Redirecting you to your Member Athlete Hub...
            </p>

            <div className="kinetic-badge">
              <Sparkles size={14} />
              <span>Initializing Live Biometrics</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

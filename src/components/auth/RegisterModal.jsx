import React, { useState } from 'react';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  ShieldCheck, 
  CreditCard, 
  Dumbbell, 
  Sparkles,
  Zap
} from 'lucide-react';
import { 
  validateName, 
  validateEmail, 
  validatePhone, 
  evaluatePasswordStrength, 
  validateCardNumber, 
  validateExpiryDate, 
  validateCVC 
} from '../../utils/validators';
import { useToast } from '../../context/ToastContext';
import { PRICING_TIERS } from '../../data/mockData';
import './RegisterModal.css';

export const RegisterModal = ({ isOpen, onClose, initialTier = 'tier-pro', onSuccessRegister }) => {
  const { showToast } = useToast();
  const [step, setStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    fitnessGoal: 'Hypertrophy & Muscle Growth',
    experienceLevel: 'Intermediate (1-3 years)',
    frequency: '5 days / week',
    selectedTier: initialTier || 'tier-pro',
    billingCycle: 'monthly',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    promoCode: '',
    discountApplied: false
  });

  // Validation Errors State
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  if (!isOpen) return null;

  const currentTierData = PRICING_TIERS.find(t => t.id === formData.selectedTier) || PRICING_TIERS[1];
  const price = formData.billingCycle === 'annual' ? currentTierData.annualPrice : currentTierData.monthlyPrice;
  const finalPrice = formData.discountApplied ? (price * 0.8).toFixed(2) : price;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Run real-time validation for touched field
    let validationResult = { isValid: true, message: '' };
    if (field === 'fullName') validationResult = validateName(value);
    if (field === 'email') validationResult = validateEmail(value);
    if (field === 'phone') validationResult = validatePhone(value);
    if (field === 'cardNumber') validationResult = validateCardNumber(value);
    if (field === 'expiry') validationResult = validateExpiryDate(value);
    if (field === 'cvc') validationResult = validateCVC(value);

    setErrors(prev => ({
      ...prev,
      [field]: validationResult.isValid ? '' : validationResult.message
    }));
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    handleInputChange(field, formData[field]);
  };

  // Step 1 Validation & Next
  const handleNextFromStep1 = (e) => {
    e.preventDefault();
    const nameVal = validateName(formData.fullName);
    const emailVal = validateEmail(formData.email);
    const phoneVal = validatePhone(formData.phone);
    const passStrength = evaluatePasswordStrength(formData.password);

    const newErrors = {
      fullName: nameVal.isValid ? '' : nameVal.message,
      email: emailVal.isValid ? '' : emailVal.message,
      phone: phoneVal.isValid ? '' : phoneVal.message,
      password: passStrength.score < 2 ? 'Password is too weak. Include uppercase, numbers & symbols.' : ''
    };

    setErrors(newErrors);
    setTouched({ fullName: true, email: true, phone: true, password: true });

    if (nameVal.isValid && emailVal.isValid && phoneVal.isValid && passStrength.score >= 2) {
      setStep(2);
    } else {
      showToast({
        type: 'warning',
        title: 'Validation Notice',
        message: 'Please resolve the highlighted fields to proceed.'
      });
    }
  };

  // Step 2 Next
  const handleNextFromStep2 = () => {
    setStep(3);
  };

  // Step 3 Payment & Submission
  const handleCompleteRegistration = (e) => {
    e.preventDefault();
    const cardVal = validateCardNumber(formData.cardNumber);
    const expiryVal = validateExpiryDate(formData.expiry);
    const cvcVal = validateCVC(formData.cvc);
    const nameVal = validateName(formData.cardName);

    const paymentErrors = {
      cardName: nameVal.isValid ? '' : nameVal.message,
      cardNumber: cardVal.isValid ? '' : cardVal.message,
      expiry: expiryVal.isValid ? '' : expiryVal.message,
      cvc: cvcVal.isValid ? '' : cvcVal.message
    };

    setErrors(prev => ({ ...prev, ...paymentErrors }));
    setTouched(prev => ({ ...prev, cardName: true, cardNumber: true, expiry: true, cvc: true }));

    if (cardVal.isValid && expiryVal.isValid && cvcVal.isValid && nameVal.isValid) {
      setStep(4);
      setTimeout(() => {
        showToast({
          type: 'success',
          title: 'Registration Successful',
          message: `Welcome to StriveX, ${formData.fullName}! Redirecting to Athlete Hub...`
        });
        if (onSuccessRegister) onSuccessRegister(formData);
        onClose();
      }, 2000);
    } else {
      showToast({
        type: 'error',
        title: 'Payment Error',
        message: 'Please enter valid credit card details to activate your membership.'
      });
    }
  };

  const applyPromo = () => {
    if (formData.promoCode.trim().toUpperCase() === 'STRIVEX20') {
      setFormData(prev => ({ ...prev, discountApplied: true }));
      showToast({
        type: 'success',
        title: 'Promo Applied',
        message: '20% off promotional discount applied to your first billing cycle!'
      });
    } else {
      showToast({
        type: 'warning',
        title: 'Invalid Code',
        message: "Code not recognized. Try 'STRIVEX20' for 20% off."
      });
    }
  };

  const passwordStrength = evaluatePasswordStrength(formData.password);

  return (
    <div className="auth-modal-backdrop" onClick={onClose}>
      <div className="auth-modal-container glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="auth-modal-header">
          <div className="auth-header-left">
            <div className="brand-logo-badge">
              <Zap size={18} className="brand-pulse-icon" />
            </div>
            <div>
              <h3 className="auth-modal-title">Join StriveX</h3>
              <p className="auth-modal-subtitle">Step {step} of 3: {
                step === 1 ? 'Personal Profile' :
                step === 2 ? 'Athletic Track' :
                step === 3 ? 'Membership & Billing' : 'Activation Complete'
              }</p>
            </div>
          </div>
          <button className="auth-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Multi-Step Progress Indicator */}
        <div className="auth-progress-track">
          <div className={`auth-progress-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'done' : ''}`}>
            <span>1</span> Profile
          </div>
          <div className={`auth-progress-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'done' : ''}`}>
            <span>2</span> Goals
          </div>
          <div className={`auth-progress-step ${step >= 3 ? 'active' : ''} ${step > 3 ? 'done' : ''}`}>
            <span>3</span> Checkout
          </div>
        </div>

        {/* Modal Body */}
        <div className="auth-modal-body">
          {/* STEP 1: Personal Info */}
          {step === 1 && (
            <form onSubmit={handleNextFromStep1} className="auth-form-step">
              <div className="form-group">
                <label className="form-label">Full Legal Name *</label>
                <input
                  type="text"
                  className={`form-input ${touched.fullName && errors.fullName ? 'is-error' : ''}`}
                  placeholder="e.g. Alex Rivera (letters only)"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  onBlur={() => handleBlur('fullName')}
                  autoFocus
                />
                {touched.fullName && errors.fullName && (
                  <div className="form-warning">{errors.fullName}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  className={`form-input ${touched.email && errors.email ? 'is-error' : ''}`}
                  placeholder="e.g. alex@athletemail.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                />
                {touched.email && errors.email && (
                  <div className="form-warning">{errors.email}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Mobile Phone Number *</label>
                <input
                  type="tel"
                  className={`form-input ${touched.phone && errors.phone ? 'is-error' : ''}`}
                  placeholder="e.g. 0771234567 or +94771234567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  onBlur={() => handleBlur('phone')}
                />
                <span className="form-helper">Accepts Sri Lankan (07X, +94) and international formats</span>
                {touched.phone && errors.phone && (
                  <div className="form-warning">{errors.phone}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Create Password *</label>
                <input
                  type="password"
                  className={`form-input ${touched.password && errors.password ? 'is-error' : ''}`}
                  placeholder="Minimum 8 characters"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  onBlur={() => handleBlur('password')}
                />
                {/* Strength Meter Bar */}
                {formData.password && (
                  <div className="password-strength-wrap">
                    <div className="strength-bar-bg">
                      <div 
                        className="strength-bar-fill"
                        style={{ 
                          width: `${passwordStrength.score * 25}%`,
                          backgroundColor: passwordStrength.color
                        }}
                      />
                    </div>
                    <span className="strength-label" style={{ color: passwordStrength.color }}>
                      {passwordStrength.label} Password
                    </span>
                  </div>
                )}
                {touched.password && errors.password && (
                  <div className="form-warning">{errors.password}</div>
                )}
              </div>

              <button type="submit" className="btn btn-primary btn-lg auth-submit-btn">
                Continue to Athletic Track <ArrowRight size={16} />
              </button>
            </form>
          )}

          {/* STEP 2: Goals & Experience */}
          {step === 2 && (
            <div className="auth-form-step">
              <div className="form-group">
                <label className="form-label">Primary Fitness Goal</label>
                <div className="goal-options-grid">
                  {[
                    'Hypertrophy & Muscle Growth',
                    'Fat Loss & Conditioning',
                    'Strength & Powerlifting',
                    'Mobility & Athletic Longevity'
                  ].map((goal) => (
                    <button
                      key={goal}
                      type="button"
                      className={`goal-card ${formData.fitnessGoal === goal ? 'active' : ''}`}
                      onClick={() => setFormData(p => ({ ...p, fitnessGoal: goal }))}
                    >
                      <Dumbbell size={16} className="goal-icon" />
                      <span>{goal}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Experience Level</label>
                <div className="frequency-pills">
                  {['Beginner (< 1 yr)', 'Intermediate (1-3 yrs)', 'Advanced (3+ yrs)'].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      className={`pill-btn ${formData.experienceLevel === lvl ? 'active' : ''}`}
                      onClick={() => setFormData(p => ({ ...p, experienceLevel: lvl }))}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Weekly Training Commitment</label>
                <div className="frequency-pills">
                  {['3 days / week', '4 days / week', '5 days / week', '6 days / week'].map((freq) => (
                    <button
                      key={freq}
                      type="button"
                      className={`pill-btn ${formData.frequency === freq ? 'active' : ''}`}
                      onClick={() => setFormData(p => ({ ...p, frequency: freq }))}
                    >
                      {freq}
                    </button>
                  ))}
                </div>
              </div>

              <div className="auth-step-buttons">
                <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>
                  <ArrowLeft size={16} /> Back
                </button>
                <button type="button" className="btn btn-primary" onClick={handleNextFromStep2}>
                  Proceed to Checkout <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Plan Confirmation & Payment */}
          {step === 3 && (
            <form onSubmit={handleCompleteRegistration} className="auth-form-step">
              {/* Selected Plan Summary Card */}
              <div className="selected-plan-banner glass-panel">
                <div className="plan-banner-info">
                  <span className="badge badge-primary">{currentTierData.name}</span>
                  <div className="plan-price-display">
                    <span className="price-amount">${finalPrice}</span>
                    <span className="price-cycle">/month ({formData.billingCycle})</span>
                  </div>
                </div>
                <div className="billing-cycle-switch">
                  <button
                    type="button"
                    className={`cycle-btn ${formData.billingCycle === 'monthly' ? 'active' : ''}`}
                    onClick={() => setFormData(p => ({ ...p, billingCycle: 'monthly' }))}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    className={`cycle-btn ${formData.billingCycle === 'annual' ? 'active' : ''}`}
                    onClick={() => setFormData(p => ({ ...p, billingCycle: 'annual' }))}
                  >
                    Annual (Save 20%)
                  </button>
                </div>
              </div>

              {/* Promo Code Box */}
              <div className="promo-input-row">
                <input
                  type="text"
                  className="form-input promo-field"
                  placeholder="Promo code (e.g. STRIVEX20)"
                  value={formData.promoCode}
                  onChange={(e) => setFormData(p => ({ ...p, promoCode: e.target.value }))}
                />
                <button type="button" className="btn btn-secondary btn-sm" onClick={applyPromo}>
                  Apply
                </button>
              </div>

              {/* Mock Credit Card Fields */}
              <div className="form-group">
                <label className="form-label">Name on Card *</label>
                <input
                  type="text"
                  className={`form-input ${touched.cardName && errors.cardName ? 'is-error' : ''}`}
                  placeholder="e.g. Alex Rivera"
                  value={formData.cardName}
                  onChange={(e) => handleInputChange('cardName', e.target.value)}
                  onBlur={() => handleBlur('cardName')}
                />
                {touched.cardName && errors.cardName && (
                  <div className="form-warning">{errors.cardName}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Card Number *</label>
                <input
                  type="text"
                  className={`form-input ${touched.cardNumber && errors.cardNumber ? 'is-error' : ''}`}
                  placeholder="4000 1234 5678 9010 (Test Luhn)"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  onBlur={() => handleBlur('cardNumber')}
                  maxLength={19}
                />
                {touched.cardNumber && errors.cardNumber && (
                  <div className="form-warning">{errors.cardNumber}</div>
                )}
              </div>

              <div className="card-split-row">
                <div className="form-group">
                  <label className="form-label">Expiry (MM/YY) *</label>
                  <input
                    type="text"
                    className={`form-input ${touched.expiry && errors.expiry ? 'is-error' : ''}`}
                    placeholder="12/28"
                    value={formData.expiry}
                    onChange={(e) => handleInputChange('expiry', e.target.value)}
                    onBlur={() => handleBlur('expiry')}
                    maxLength={5}
                  />
                  {touched.expiry && errors.expiry && (
                    <div className="form-warning">{errors.expiry}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">CVC *</label>
                  <input
                    type="text"
                    className={`form-input ${touched.cvc && errors.cvc ? 'is-error' : ''}`}
                    placeholder="123"
                    value={formData.cvc}
                    onChange={(e) => handleInputChange('cvc', e.target.value)}
                    onBlur={() => handleBlur('cvc')}
                    maxLength={4}
                  />
                  {touched.cvc && errors.cvc && (
                    <div className="form-warning">{errors.cvc}</div>
                  )}
                </div>
              </div>

              <div className="secure-badge">
                <ShieldCheck size={16} className="secure-icon" />
                <span>256-bit Encrypted Mock Checkout • Instant Activation</span>
              </div>

              <div className="auth-step-buttons">
                <button type="button" className="btn btn-secondary" onClick={() => setStep(2)}>
                  <ArrowLeft size={16} /> Back
                </button>
                <button type="submit" className="btn btn-primary btn-lg">
                  Complete & Start Training <Sparkles size={16} />
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Success Animation */}
          {step === 4 && (
            <div className="auth-success-state">
              <div className="success-circle-pulse">
                <Check size={36} className="success-check" />
              </div>
              <h4>Account Activated!</h4>
              <p>Welcome to StriveX, {formData.fullName}. Setting up your customized training dashboard...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

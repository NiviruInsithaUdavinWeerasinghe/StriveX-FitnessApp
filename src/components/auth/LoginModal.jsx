import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { validateEmail } from '../../utils/validation';
import { X, Mail, Lock, UserCheck, Shield, Dumbbell, ArrowRight } from 'lucide-react';

export const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
  const { login } = useAuth();
  const { addToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});
  const [isForgot, setIsForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRes = validateEmail(email);
    if (!emailRes.isValid) {
      setErrors({ email: emailRes.message });
      addToast({
        type: 'error',
        title: 'Sign In Failed',
        message: emailRes.message
      });
      return;
    }
    if (!password) {
      setErrors({ password: 'Password is required' });
      return;
    }

    // Authenticate as member by default
    login('member', { email });
    onClose();
  };

  const handleDemoLogin = (roleType) => {
    login(roleType);
    onClose();
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    const emailRes = validateEmail(forgotEmail);
    if (!emailRes.isValid) {
      addToast({
        type: 'error',
        title: 'Invalid Email',
        message: 'Please enter a valid registered email to reset password'
      });
      return;
    }
    addToast({
      type: 'success',
      title: 'Reset Link Dispatched',
      message: `Password reset instructions sent to ${forgotEmail}`
    });
    setIsForgot(false);
  };

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
          maxWidth: '480px',
          padding: '32px',
          background: 'var(--surface-elevated)',
          border: '1px solid var(--border-hover)',
          borderRadius: 'var(--radius-xl)',
          position: 'relative',
          boxShadow: 'var(--shadow-lg)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px'
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
              Athlete & Staff Access
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
              {isForgot ? 'Reset Password' : 'Sign in to StriveX'}
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

        {!isForgot ? (
          <div>
            {/* Quick Demo Switcher Section */}
            <div
              style={{
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--surface-input)',
                border: '1px solid var(--border-subtle)',
                marginBottom: '24px'
              }}
            >
              <div
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: 'var(--text-tertiary)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '8px'
                }}
              >
                1-Click Quick Demo Sign-In
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('member')}
                  className="kinetic-btn-secondary"
                  style={{ padding: '8px 4px', fontSize: '0.74rem', fontWeight: 700 }}
                >
                  <UserCheck size={12} color="var(--accent)" /> Member
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('trainer')}
                  className="kinetic-btn-secondary"
                  style={{ padding: '8px 4px', fontSize: '0.74rem', fontWeight: 700 }}
                >
                  <Dumbbell size={12} color="var(--accent)" /> Trainer
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('admin')}
                  className="kinetic-btn-secondary"
                  style={{ padding: '8px 4px', fontSize: '0.74rem', fontWeight: 700 }}
                >
                  <Shield size={12} color="var(--accent)" /> Admin
                </button>
              </div>
            </div>

            {/* Standard Login Form */}
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="kinetic-input-group">
                <label className="kinetic-label">Email Address *</label>
                <div className="kinetic-input-wrapper">
                  <Mail size={18} className="kinetic-input-icon" />
                  <input
                    type="email"
                    placeholder="athlete@strivex.fit"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((prev) => ({ ...prev, email: '' }));
                    }}
                    className={`kinetic-input has-icon ${errors.email ? 'is-invalid' : ''}`}
                  />
                </div>
                {errors.email && <span className="kinetic-input-error">{errors.email}</span>}
              </div>

              {/* Password */}
              <div className="kinetic-input-group">
                <div className="kinetic-label">
                  <span>Password *</span>
                  <button
                    type="button"
                    onClick={() => setIsForgot(true)}
                    style={{
                      color: 'var(--accent)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="kinetic-input-wrapper">
                  <Lock size={18} className="kinetic-input-icon" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors((prev) => ({ ...prev, password: '' }));
                    }}
                    className={`kinetic-input has-icon ${errors.password ? 'is-invalid' : ''}`}
                  />
                </div>
                {errors.password && <span className="kinetic-input-error">{errors.password}</span>}
              </div>

              {/* Remember Me */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '24px',
                  fontSize: '0.86rem',
                  color: 'var(--text-secondary)'
                }}
              >
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: 'var(--accent)', width: '16px', height: '16px' }}
                />
                <label htmlFor="remember" style={{ cursor: 'pointer' }}>
                  Remember this device for 30 days
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="kinetic-btn-primary"
                style={{ width: '100%', padding: '14px', fontSize: '0.95rem' }}
              >
                Sign In to Account
                <ArrowRight size={16} />
              </button>
            </form>

            {/* Switch to Registration */}
            <div
              style={{
                textAlign: 'center',
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid var(--border-subtle)',
                fontSize: '0.88rem',
                color: 'var(--text-secondary)'
              }}
            >
              Don't have an athlete account?{' '}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSwitchToRegister();
                }}
                style={{ color: 'var(--accent)', fontWeight: 700, cursor: 'pointer' }}
              >
                Register Here
              </button>
            </div>
          </div>
        ) : (
          /* Forgot Password Drawer */
          <form onSubmit={handleForgotSubmit} className="animate-fade-in">
            <p
              style={{
                fontSize: '0.88rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
                marginBottom: '20px'
              }}
            >
              Enter your registered email address below. We will send a secure verification code to reset your password.
            </p>

            <div className="kinetic-input-group">
              <label className="kinetic-label">Registered Email</label>
              <div className="kinetic-input-wrapper">
                <Mail size={18} className="kinetic-input-icon" />
                <input
                  type="email"
                  placeholder="athlete@strivex.fit"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="kinetic-input has-icon"
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button
                type="button"
                onClick={() => setIsForgot(false)}
                className="kinetic-btn-ghost"
                style={{ flex: 1 }}
              >
                Back to Sign In
              </button>
              <button type="submit" className="kinetic-btn-primary" style={{ flex: 2 }}>
                Send Reset Code
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

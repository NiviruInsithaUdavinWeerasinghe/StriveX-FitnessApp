import React, { useState } from 'react';
import { 
  X, 
  ArrowRight, 
  Zap, 
  Lock, 
  Mail, 
  User, 
  Dumbbell, 
  ShieldCheck, 
  Users,
  CheckCircle2
} from 'lucide-react';
import { validateEmail } from '../../utils/validators';
import { useToast } from '../../context/ToastContext';
import './LoginModal.css';

export const LoginModal = ({ 
  isOpen, 
  onClose, 
  onRoleSelect, 
  onOpenRegister 
}) => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const emailVal = validateEmail(email);
    if (!emailVal.isValid) {
      setEmailError(emailVal.message);
      showToast({
        type: 'error',
        title: 'Login Notice',
        message: emailVal.message
      });
      return;
    }
    if (!password) {
      showToast({
        type: 'warning',
        title: 'Password Required',
        message: 'Please enter your account password.'
      });
      return;
    }

    // Role inference by email or default to member
    let selectedRole = 'member';
    if (email.includes('trainer') || email.includes('coach')) selectedRole = 'trainer';
    if (email.includes('admin') || email.includes('ops')) selectedRole = 'admin';

    showToast({
      type: 'success',
      title: 'Welcome Back',
      message: `Signed in as ${email}. Redirecting to workspace...`
    });

    onRoleSelect(selectedRole);
    onClose();
  };

  const handleQuickDemoLogin = (role) => {
    const roleLabels = {
      member: 'Alex Rivera (Member Athlete)',
      trainer: 'Coach Marcus (Personal Trainer)',
      admin: 'Niviru Weerasinghe (Admin Ops)'
    };
    showToast({
      type: 'info',
      title: '1-Click Demo Login',
      message: `Signed in as ${roleLabels[role]}. Workspace activated.`
    });
    onRoleSelect(role);
    onClose();
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    const emailVal = validateEmail(resetEmail);
    if (!emailVal.isValid) {
      showToast({ type: 'error', title: 'Invalid Email', message: emailVal.message });
      return;
    }
    setResetSent(true);
    showToast({
      type: 'success',
      title: 'Reset Code Sent',
      message: `Security PIN sent to ${resetEmail}. Check your inbox.`
    });
  };

  return (
    <div className="auth-modal-backdrop" onClick={onClose}>
      <div className="auth-modal-container glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="auth-modal-header">
          <div className="auth-header-left">
            <div className="brand-logo-badge">
              <Zap size={18} className="brand-pulse-icon" />
            </div>
            <div>
              <h3 className="auth-modal-title">
                {isForgotPassword ? 'Reset Password' : 'Sign In to StriveX'}
              </h3>
              <p className="auth-modal-subtitle">
                {isForgotPassword ? 'Receive a 6-digit recovery code' : 'Access your unified fitness portal'}
              </p>
            </div>
          </div>
          <button className="auth-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="auth-modal-body">
          {!isForgotPassword ? (
            <>
              {/* 1-Click Demo Switcher Section */}
              <div className="demo-accounts-section">
                <span className="demo-section-label">1-Click Demo Profiles:</span>
                <div className="demo-buttons-grid">
                  <button 
                    type="button"
                    className="demo-profile-card"
                    onClick={() => handleQuickDemoLogin('member')}
                  >
                    <Dumbbell size={16} className="demo-card-icon" />
                    <div className="demo-card-text">
                      <span className="demo-name">Alex Rivera</span>
                      <span className="demo-role">Member Athlete</span>
                    </div>
                  </button>

                  <button 
                    type="button"
                    className="demo-profile-card"
                    onClick={() => handleQuickDemoLogin('trainer')}
                  >
                    <Users size={16} className="demo-card-icon" />
                    <div className="demo-card-text">
                      <span className="demo-name">Coach Marcus</span>
                      <span className="demo-role">Personal Trainer</span>
                    </div>
                  </button>

                  <button 
                    type="button"
                    className="demo-profile-card"
                    onClick={() => handleQuickDemoLogin('admin')}
                  >
                    <ShieldCheck size={16} className="demo-card-icon" />
                    <div className="demo-card-text">
                      <span className="demo-name">Operations HQ</span>
                      <span className="demo-role">Admin Center</span>
                    </div>
                  </button>
                </div>
              </div>

              <div className="auth-or-divider">
                <span>or continue with credentials</span>
              </div>

              {/* Standard Login Form */}
              <form onSubmit={handleLoginSubmit} className="auth-form-step">
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <div className="input-with-icon">
                    <Mail size={16} className="field-inner-icon" />
                    <input
                      type="email"
                      className={`form-input has-icon ${emailError ? 'is-error' : ''}`}
                      placeholder="e.g. member@strivex.fit"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError('');
                      }}
                      autoFocus
                    />
                  </div>
                  {emailError && <div className="form-warning">{emailError}</div>}
                </div>

                <div className="form-group">
                  <div className="form-label">
                    <span>Password</span>
                    <button 
                      type="button" 
                      className="forgot-pass-link"
                      onClick={() => setIsForgotPassword(true)}
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="input-with-icon">
                    <Lock size={16} className="field-inner-icon" />
                    <input
                      type="password"
                      className="form-input has-icon"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="login-options-row">
                  <label className="remember-checkbox-label">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span>Remember this session</span>
                  </label>
                </div>

                <button type="submit" className="btn btn-primary btn-lg auth-submit-btn">
                  Sign In <ArrowRight size={16} />
                </button>
              </form>

              <div className="auth-footer-switch">
                <span>Don't have an account?</span>
                <button 
                  type="button" 
                  className="switch-action-btn"
                  onClick={() => {
                    onClose();
                    onOpenRegister();
                  }}
                >
                  Join StriveX Now
                </button>
              </div>
            </>
          ) : (
            /* Forgot Password Flow */
            <div className="forgot-password-view">
              {!resetSent ? (
                <form onSubmit={handleForgotPasswordSubmit} className="auth-form-step">
                  <div className="form-group">
                    <label className="form-label">Account Email</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="name@domain.com"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <button type="submit" className="btn btn-primary auth-submit-btn">
                    Send Verification Code
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary auth-submit-btn"
                    onClick={() => setIsForgotPassword(false)}
                  >
                    Back to Sign In
                  </button>
                </form>
              ) : (
                <div className="reset-sent-confirmation">
                  <CheckCircle2 size={48} className="reset-icon" />
                  <h4>Verification Code Sent</h4>
                  <p>We dispatched a 6-digit PIN to <strong>{resetEmail}</strong>.</p>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => {
                      setIsForgotPassword(false);
                      setResetSent(false);
                    }}
                  >
                    Return to Login
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

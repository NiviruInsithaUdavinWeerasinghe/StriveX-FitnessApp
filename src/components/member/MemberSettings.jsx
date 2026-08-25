import React, { useState } from 'react';
import { 
  User, 
  CreditCard, 
  ShieldCheck, 
  Bell, 
  ArrowLeft, 
  Save, 
  Download, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { validateName, validateEmail, validatePhone } from '../../utils/validators';
import { useToast } from '../../context/ToastContext';
import { INITIAL_USER_PROFILE } from '../../data/mockData';
import './MemberSettings.css';

export const MemberSettings = ({ onBackToDashboard }) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  
  const [profile, setProfile] = useState({
    name: INITIAL_USER_PROFILE.name,
    email: INITIAL_USER_PROFILE.email,
    phone: INITIAL_USER_PROFILE.phone,
    bio: 'Dedicated natural athlete aiming for progressive overload and metabolic conditioning.',
    smsAlerts: true,
    emailDigest: true,
    twoFactorAuth: false
  });

  const [errors, setErrors] = useState({});

  const handleProfileSave = (e) => {
    e.preventDefault();
    const nameVal = validateName(profile.name);
    const emailVal = validateEmail(profile.email);
    const phoneVal = validatePhone(profile.phone);

    const newErrors = {
      name: nameVal.isValid ? '' : nameVal.message,
      email: emailVal.isValid ? '' : emailVal.message,
      phone: phoneVal.isValid ? '' : phoneVal.message
    };

    setErrors(newErrors);

    if (nameVal.isValid && emailVal.isValid && phoneVal.isValid) {
      showToast({
        type: 'success',
        title: 'Settings Saved',
        message: 'Your athlete profile and notification preferences were updated.'
      });
    } else {
      showToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please resolve errors in the profile form before saving.'
      });
    }
  };

  const handleDownloadInvoice = (invoiceId) => {
    showToast({
      type: 'info',
      title: 'Invoice Downloaded',
      message: `Tax Receipt for ${invoiceId} has been exported to your downloads folder.`
    });
  };

  return (
    <div className="member-settings-root">
      <div className="settings-header-row">
        <button className="btn btn-secondary btn-sm" onClick={onBackToDashboard}>
          <ArrowLeft size={16} /> Return to Dashboard
        </button>
        <h2>Athlete Settings & Preferences</h2>
      </div>

      <div className="settings-container-grid">
        {/* Left Tabs Sidebar */}
        <div className="settings-tabs-sidebar glass-panel">
          <button 
            className={`tab-link-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={18} />
            <span>Profile & Biometrics</span>
          </button>

          <button 
            className={`tab-link-btn ${activeTab === 'subscription' ? 'active' : ''}`}
            onClick={() => setActiveTab('subscription')}
          >
            <CreditCard size={18} />
            <span>Plan & Invoices</span>
          </button>

          <button 
            className={`tab-link-btn ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <ShieldCheck size={18} />
            <span>Security & Alerts</span>
          </button>
        </div>

        {/* Right Content Panel */}
        <div className="settings-content-panel glass-panel">
          {/* TAB 1: Profile */}
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSave} className="settings-form-layout">
              <h3 className="panel-section-title">Athlete Profile Information</h3>

              <div className="avatar-edit-row">
                <img 
                  src={INITIAL_USER_PROFILE.avatar} 
                  alt="Avatar" 
                  className="profile-preview-avatar"
                />
                <div className="avatar-edit-info">
                  <span className="avatar-name-display">{profile.name}</span>
                  <span className="badge badge-primary">{INITIAL_USER_PROFILE.tier}</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  className={`form-input ${errors.name ? 'is-error' : ''}`}
                  value={profile.name}
                  onChange={(e) => {
                    setProfile({ ...profile, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                />
                {errors.name && <div className="form-warning">{errors.name}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  className={`form-input ${errors.email ? 'is-error' : ''}`}
                  value={profile.email}
                  onChange={(e) => {
                    setProfile({ ...profile, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                />
                {errors.email && <div className="form-warning">{errors.email}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  className={`form-input ${errors.phone ? 'is-error' : ''}`}
                  value={profile.phone}
                  onChange={(e) => {
                    setProfile({ ...profile, phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                />
                <span className="form-helper">Sri Lankan formats (07X, +94) and international numbers</span>
                {errors.phone && <div className="form-warning">{errors.phone}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Athlete Bio & Objectives</label>
                <textarea
                  className="form-input"
                  rows={3}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg save-settings-btn">
                <Save size={16} /> Save Profile Changes
              </button>
            </form>
          )}

          {/* TAB 2: Subscription */}
          {activeTab === 'subscription' && (
            <div className="settings-form-layout">
              <h3 className="panel-section-title">Active Membership Plan</h3>

              <div className="current-plan-card glass-panel">
                <div className="plan-card-left">
                  <span className="badge badge-primary">Active Subscription</span>
                  <h4>Pro Athlete Tier</h4>
                  <p>$49.00 / month • Renews automatically on September 25, 2026</p>
                </div>
                <button 
                  type="button" 
                  className="btn btn-secondary btn-sm"
                  onClick={() => showToast({ type: 'info', title: 'Plan Upgrade', message: 'To upgrade to Elite VIP ($89/mo), contact front desk or switch in registration.' })}
                >
                  Change Plan
                </button>
              </div>

              <h4 className="sub-section-title">Recent Invoices & Receipts</h4>
              <div className="invoices-list">
                {[
                  { id: 'INV-9104', date: 'Aug 25, 2026', amount: '$49.00', status: 'Paid' },
                  { id: 'INV-8742', date: 'Jul 25, 2026', amount: '$49.00', status: 'Paid' },
                  { id: 'INV-8319', date: 'Jun 25, 2026', amount: '$49.00', status: 'Paid' }
                ].map((inv) => (
                  <div key={inv.id} className="invoice-row glass-panel">
                    <div className="invoice-info">
                      <span className="invoice-id">{inv.id}</span>
                      <span className="invoice-date">{inv.date}</span>
                    </div>
                    <div className="invoice-right">
                      <span className="invoice-amount">{inv.amount}</span>
                      <span className="badge badge-success">{inv.status}</span>
                      <button 
                        className="btn-icon btn-sm" 
                        onClick={() => handleDownloadInvoice(inv.id)}
                        title="Download PDF"
                      >
                        <Download size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Security & Alerts */}
          {activeTab === 'security' && (
            <div className="settings-form-layout">
              <h3 className="panel-section-title">Notifications & Security</h3>

              <div className="toggle-setting-row">
                <div>
                  <div className="toggle-title">SMS Workout Reminders</div>
                  <div className="toggle-sub">Receive daily reminders 30 mins before scheduled routine</div>
                </div>
                <input
                  type="checkbox"
                  checked={profile.smsAlerts}
                  onChange={(e) => {
                    setProfile({ ...profile, smsAlerts: e.target.checked });
                    showToast({ type: 'info', title: 'Preferences Updated', message: `SMS Alerts ${e.target.checked ? 'Enabled' : 'Disabled'}` });
                  }}
                />
              </div>

              <div className="toggle-setting-row">
                <div>
                  <div className="toggle-title">Weekly Biometric Digest</div>
                  <div className="toggle-sub">Get caloric, volume, and consistency analysis via email</div>
                </div>
                <input
                  type="checkbox"
                  checked={profile.emailDigest}
                  onChange={(e) => {
                    setProfile({ ...profile, emailDigest: e.target.checked });
                    showToast({ type: 'info', title: 'Preferences Updated', message: `Email Digest ${e.target.checked ? 'Enabled' : 'Disabled'}` });
                  }}
                />
              </div>

              <div className="toggle-setting-row">
                <div>
                  <div className="toggle-title">Two-Factor Authentication (2FA)</div>
                  <div className="toggle-sub">Require security PIN verification upon signing in</div>
                </div>
                <input
                  type="checkbox"
                  checked={profile.twoFactorAuth}
                  onChange={(e) => {
                    setProfile({ ...profile, twoFactorAuth: e.target.checked });
                    showToast({ type: 'info', title: 'Security Updated', message: `2FA ${e.target.checked ? 'Activated' : 'Deactivated'}` });
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

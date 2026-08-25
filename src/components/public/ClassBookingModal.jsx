import { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { validateName, validatePhoneNumber } from '../../utils/validation';
import { X, Clock, User, Phone } from 'lucide-react';

export const ClassBookingModal = ({ isOpen, onClose, classData, onConfirmBooking }) => {
  const { addToast } = useToast();
  const [athleteName, setAthleteName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  if (!isOpen || !classData) return null;

  const handleNameChange = (e) => {
    const val = e.target.value;
    setAthleteName(val);
    if (touched.name) {
      const res = validateName(val);
      setErrors((prev) => ({ ...prev, name: res.isValid ? '' : res.message }));
    }
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value;
    setPhoneNumber(val);
    if (touched.phone) {
      const res = validatePhoneNumber(val);
      setErrors((prev) => ({ ...prev, phone: res.isValid ? '' : res.message }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameRes = validateName(athleteName);
    const phoneRes = validatePhoneNumber(phoneNumber);

    const newErrors = {};
    if (!nameRes.isValid) newErrors.name = nameRes.message;
    if (!phoneRes.isValid) newErrors.phone = phoneRes.message;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({ name: true, phone: true });
      addToast({
        type: 'error',
        title: 'Booking Incomplete',
        message: 'Please resolve the highlighted fields to reserve your station'
      });
      return;
    }

    onConfirmBooking(classData.id);
    addToast({
      type: 'success',
      title: 'Station Spot Confirmed',
      message: `Reserved for ${athleteName} in ${classData.title} on ${classData.day}`
    });
    onClose();
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
          maxWidth: '520px',
          padding: '28px',
          background: 'var(--surface-elevated)',
          border: '1px solid var(--border-hover)',
          borderRadius: 'var(--radius-xl)',
          position: 'relative',
          boxShadow: 'var(--shadow-lg)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
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
              Class Reservation
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginTop: '2px'
              }}
            >
              {classData.title}
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

        <div
          style={{
            padding: '14px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--surface-input)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginBottom: '24px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
              <Clock size={14} color="var(--accent)" />
              {classData.time} ({classData.duration})
            </span>
            <span style={{ fontWeight: 700, color: 'var(--accent)' }}>Day: {classData.day}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Instructor: {classData.coach}</span>
            <span style={{ color: 'var(--status-success)', fontWeight: 700 }}>
              {classData.spotsAvailable} Spots Remaining
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="kinetic-input-group">
            <label className="kinetic-label">Athlete Full Name *</label>
            <div className="kinetic-input-wrapper">
              <User size={18} className="kinetic-input-icon" />
              <input
                type="text"
                placeholder="e.g. Kasun Fernando"
                value={athleteName}
                onChange={handleNameChange}
                onBlur={() => {
                  setTouched((prev) => ({ ...prev, name: true }));
                  const res = validateName(athleteName);
                  setErrors((prev) => ({ ...prev, name: res.isValid ? '' : res.message }));
                }}
                className={`kinetic-input has-icon ${errors.name ? 'is-invalid' : ''}`}
              />
            </div>
            {errors.name && <span className="kinetic-input-error">{errors.name}</span>}
          </div>

          <div className="kinetic-input-group">
            <label className="kinetic-label">Contact Phone Number (SMS confirmation) *</label>
            <div className="kinetic-input-wrapper">
              <Phone size={18} className="kinetic-input-icon" />
              <input
                type="tel"
                placeholder="e.g. 0771234567 or +94771234567"
                value={phoneNumber}
                onChange={handlePhoneChange}
                onBlur={() => {
                  setTouched((prev) => ({ ...prev, phone: true }));
                  const res = validatePhoneNumber(phoneNumber);
                  setErrors((prev) => ({ ...prev, phone: res.isValid ? '' : res.message }));
                }}
                className={`kinetic-input has-icon ${errors.phone ? 'is-invalid' : ''}`}
              />
            </div>
            {errors.phone ? (
              <span className="kinetic-input-error">{errors.phone}</span>
            ) : (
              <span className="kinetic-input-hint">Accepts Sri Lankan (07X... / +94...) or international numbers</span>
            )}
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
            <button
              type="button"
              onClick={onClose}
              className="kinetic-btn-ghost"
              style={{ flex: 1 }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="kinetic-btn-primary"
              style={{ flex: 1 }}
            >
              Confirm Reservation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

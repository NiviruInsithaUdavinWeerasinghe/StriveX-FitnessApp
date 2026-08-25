import { useState, useMemo } from 'react';
import { useToast } from '../../context/ToastContext';
import { CustomDropdown } from '../ui/CustomDropdown';
import {
  X,
  Search,
  Users,
  UserCheck,
  UserPlus,
  TrendingUp,
  Award,
  Sliders
} from 'lucide-react';

const INITIAL_STAFF = [
  {
    id: 'tr_1',
    name: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=150&auto=format&fit=crop',
    specialty: 'Hypertrophy & Biomechanics',
    cert: 'NSCA-CSCS',
    assignedAthletes: 28,
    maxCapacity: 30,
    monthlySessions: 112,
    status: 'on_duty',
    shift: '06:00 AM - 02:00 PM',
    rating: 4.96
  },
  {
    id: 'tr_2',
    name: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    specialty: 'High-Intensity Athletic Conditioning',
    cert: 'EXOS-XPS',
    assignedAthletes: 24,
    maxCapacity: 28,
    monthlySessions: 98,
    status: 'in_session',
    shift: '08:00 AM - 04:00 PM',
    rating: 4.92
  },
  {
    id: 'tr_3',
    name: 'David Lee',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    specialty: 'Maximal Strength & Powerlifting',
    cert: 'USAW-L2',
    assignedAthletes: 22,
    maxCapacity: 25,
    monthlySessions: 90,
    status: 'on_duty',
    shift: '12:00 PM - 08:00 PM',
    rating: 4.98
  },
  {
    id: 'tr_4',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop',
    specialty: 'Olympic Lifting & Peaking',
    cert: 'CSCCa Master',
    assignedAthletes: 18,
    maxCapacity: 20,
    monthlySessions: 76,
    status: 'off_shift',
    shift: '02:00 PM - 10:00 PM',
    rating: 5.00
  },
  {
    id: 'tr_5',
    name: 'Dr. Kevin Vance',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
    specialty: 'Corrective Exercise & Joint Mobility',
    cert: 'DPT, FMS',
    assignedAthletes: 16,
    maxCapacity: 20,
    monthlySessions: 64,
    status: 'on_duty',
    shift: '07:00 AM - 03:00 PM',
    rating: 4.94
  }
];

const SPECIALTY_OPTIONS = [
  { value: 'Hypertrophy & Biomechanics', label: 'Hypertrophy & Biomechanics' },
  { value: 'High-Intensity Athletic Conditioning', label: 'High-Intensity Athletic Conditioning' },
  { value: 'Maximal Strength & Powerlifting', label: 'Maximal Strength & Powerlifting' },
  { value: 'Olympic Lifting & Peaking', label: 'Olympic Lifting & Peaking' },
  { value: 'Corrective Exercise & Joint Mobility', label: 'Corrective Exercise & Joint Mobility' }
];

export const StaffManagerModal = ({ isOpen, onClose }) => {
  const { addToast } = useToast();

  const [staffList, setStaffList] = useState(INITIAL_STAFF);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // New Coach Modal / Form
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newSpecialty, setNewSpecialty] = useState('Hypertrophy & Biomechanics');
  const [newCert, setNewCert] = useState('NSCA-CSCS');
  const [newCap, setNewCap] = useState('25');
  const [formErrors, setFormErrors] = useState({});

  // Client Cap Adjustment Modal
  const [selectedCoachForCap, setSelectedCoachForCap] = useState(null);
  const [adjustedCap, setAdjustedCap] = useState(30);

  // Filtered staff
  const filteredStaff = useMemo(() => {
    return staffList.filter((coach) => {
      const matchesSearch =
        coach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coach.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coach.cert.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || coach.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [staffList, searchQuery, statusFilter]);

  if (!isOpen) return null;

  // Real-time phone validation (Sri Lankan + Foreign formats)
  const validatePhone = (phone) => {
    const clean = phone.replace(/\s+/g, '');
    const slRegex = /^(?:\+94|0)?7[0-9]{8}$/;
    const foreignRegex = /^\+?[1-9]\d{7,14}$/;
    return slRegex.test(clean) || foreignRegex.test(clean);
  };

  // Real-time name validation (Alphabetical letters only)
  const validateName = (name) => {
    return /^[a-zA-Z\s.'-]+$/.test(name.trim()) && name.trim().length >= 3;
  };

  // Real-time email validation
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const handleCreateCoach = (e) => {
    e.preventDefault();
    const errors = {};

    if (!validateName(newName)) {
      errors.name = 'Full name must contain letters only (minimum 3 characters)';
    }
    if (!validateEmail(newEmail)) {
      errors.email = 'Please provide a valid corporate email address';
    }
    if (!validatePhone(newPhone)) {
      errors.phone = 'Valid phone required (e.g., +94 77 123 4567 or 0771234567)';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      addToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please resolve form highlighted warnings before submitting.'
      });
      return;
    }

    const newCoach = {
      id: `tr_${Date.now()}`,
      name: newName.trim(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
      specialty: newSpecialty,
      cert: newCert.trim(),
      assignedAthletes: 0,
      maxCapacity: parseInt(newCap, 10) || 25,
      monthlySessions: 0,
      status: 'on_duty',
      shift: '08:00 AM - 04:00 PM',
      rating: 5.00
    };

    setStaffList((prev) => [newCoach, ...prev]);
    setIsOnboardingOpen(false);
    setNewName('');
    setNewEmail('');
    setNewPhone('');
    setFormErrors({});

    addToast({
      type: 'success',
      title: 'Trainer Onboarded',
      message: `Coach ${newCoach.name} successfully registered in StriveX Enterprise Roster.`
    });
  };

  const handleSaveCap = () => {
    if (!selectedCoachForCap) return;
    setStaffList((prev) =>
      prev.map((c) => (c.id === selectedCoachForCap.id ? { ...c, maxCapacity: adjustedCap } : c))
    );
    addToast({
      type: 'success',
      title: 'Capacity Updated',
      message: `Updated client ceiling for ${selectedCoachForCap.name} to ${adjustedCap} athletes.`
    });
    setSelectedCoachForCap(null);
  };

  const handleToggleStatus = (coachId) => {
    setStaffList((prev) =>
      prev.map((c) => {
        if (c.id === coachId) {
          const nextStatus = c.status === 'on_duty' ? 'off_shift' : 'on_duty';
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
    addToast({
      type: 'info',
      title: 'Duty Status Updated',
      message: 'Staff live facility status synchronized with access terminals.'
    });
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
        background: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        className="kinetic-card animate-scale-up"
        style={{
          width: '100%',
          maxWidth: '1080px',
          height: '88vh',
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
        {/* Modal Header */}
        <div
          style={{
            padding: '16px 24px',
            background: 'var(--surface-glass)',
            borderBottom: '1px solid var(--border-glass)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(212, 255, 0, 0.15)',
                border: '1px solid var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent)'
              }}
            >
              <Users size={18} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="type-eyebrow">COACHING STAFF & CAPACITY MANAGER</span>
                <span className="kinetic-badge" style={{ fontSize: '0.66rem', padding: '1px 6px' }}>
                  24 TRAINERS
                </span>
              </div>
              <h3 className="type-h3" style={{ fontSize: '1.2rem', margin: 0, whiteSpace: 'nowrap' }}>
                Trainer Roster & Utilization Grid
              </h3>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <button
              type="button"
              onClick={() => setIsOnboardingOpen(true)}
              className="kinetic-btn-primary"
              style={{ padding: '8px 16px', fontSize: '0.8rem', fontWeight: 800, whiteSpace: 'nowrap', flexShrink: 0 }}
            >
              <UserPlus size={14} />
              <span>Onboard New Coach</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--surface-input)',
                border: '1px solid var(--border-glass)',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Staff Utilization KPIs */}
        <div
          style={{
            padding: '16px 24px',
            background: 'var(--surface-input)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(212, 255, 0, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserCheck size={16} color="var(--accent)" />
            </div>
            <div>
              <div className="type-caption">TOTAL ROSTER</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--text-primary)' }}>24 Coaches</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(6, 182, 212, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={16} color="#06b6d4" />
            </div>
            <div>
              <div className="type-caption">AVERAGE CAPACITY LOAD</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#06b6d4' }}>88.5% Optimal</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Award size={16} color="var(--status-success)" />
            </div>
            <div>
              <div className="type-caption">COHORT SATISFACTION</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--status-success)' }}>4.96 / 5.00 Rating</div>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div
          style={{
            padding: '14px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
            flexShrink: 0
          }}
        >
          {/* Search Input */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 14px',
              borderRadius: 'var(--radius-pill)',
              background: 'var(--surface-input)',
              border: '1px solid var(--border-subtle)',
              minWidth: '280px',
              flex: 1
            }}
          >
            <Search size={15} color="var(--text-tertiary)" />
            <input
              type="text"
              placeholder="Search coach by name, specialty, or certification..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.84rem',
                width: '100%'
              }}
            />
          </div>

          {/* Status Filter Pills */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {[
              { id: 'all', label: 'All Coaches' },
              { id: 'on_duty', label: 'On Duty' },
              { id: 'in_session', label: 'In 1-on-1' },
              { id: 'off_shift', label: 'Off Shift' }
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setStatusFilter(st.id)}
                style={{
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-pill)',
                  background: statusFilter === st.id ? 'var(--accent)' : 'var(--surface-input)',
                  color: statusFilter === st.id ? '#111111' : 'var(--text-secondary)',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  border: `1px solid ${statusFilter === st.id ? 'var(--accent)' : 'var(--border-subtle)'}`,
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  cursor: 'pointer'
                }}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Staff Table Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
          <div
            style={{
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              overflow: 'hidden',
              background: 'var(--surface-input)'
            }}
          >
            {/* Table Header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.6fr 1.4fr 1.4fr 1fr 1fr 1fr',
                padding: '12px 18px',
                background: 'var(--surface-glass)',
                borderBottom: '1px solid var(--border-subtle)',
                fontSize: '0.74rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                letterSpacing: '0.05em'
              }}
            >
              <div>Coach Name / Cert</div>
              <div>Primary Specialty</div>
              <div>Athlete Load & Cap</div>
              <div>Monthly Sessions</div>
              <div>Live Status</div>
              <div style={{ textAlign: 'right' }}>Actions</div>
            </div>

            {/* Table Rows */}
            {filteredStaff.map((coach) => {
              const utilPercent = Math.round((coach.assignedAthletes / coach.maxCapacity) * 100);
              return (
                <div
                  key={coach.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1.6fr 1.4fr 1.4fr 1fr 1fr 1fr',
                    alignItems: 'center',
                    padding: '14px 18px',
                    borderBottom: '1px solid var(--border-glass)',
                    fontSize: '0.84rem'
                  }}
                >
                  {/* Coach Avatar & Name */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={coach.avatar}
                      alt={coach.name}
                      style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--accent)' }}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{coach.name}</span>
                        <span className="kinetic-badge" style={{ fontSize: '0.62rem', padding: '1px 6px' }}>
                          {coach.cert}
                        </span>
                      </div>
                      <div className="type-caption">★ {coach.rating.toFixed(2)} Rating</div>
                    </div>
                  </div>

                  {/* Specialty */}
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                    {coach.specialty}
                  </div>

                  {/* Utilization Bar */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>
                        {coach.assignedAthletes} / {coach.maxCapacity} Athletes
                      </span>
                      <span
                        style={{
                          fontWeight: 800,
                          color: utilPercent >= 90 ? 'var(--status-warning)' : 'var(--status-success)'
                        }}
                      >
                        {utilPercent}%
                      </span>
                    </div>
                    <div style={{ height: '6px', background: 'var(--surface-elevated)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${Math.min(utilPercent, 100)}%`,
                          background: utilPercent >= 90 ? 'var(--status-warning)' : 'var(--accent)'
                        }}
                      />
                    </div>
                  </div>

                  {/* Monthly Sessions */}
                  <div style={{ fontWeight: 800, color: 'var(--text-primary)' }}>
                    {coach.monthlySessions} calls
                  </div>

                  {/* Status Toggle */}
                  <div>
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(coach.id)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-pill)',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        background:
                          coach.status === 'on_duty'
                            ? 'rgba(16, 185, 129, 0.15)'
                            : coach.status === 'in_session'
                            ? 'rgba(6, 182, 212, 0.15)'
                            : 'var(--surface-elevated)',
                        color:
                          coach.status === 'on_duty'
                            ? 'var(--status-success)'
                            : coach.status === 'in_session'
                            ? '#06b6d4'
                            : 'var(--text-tertiary)',
                        border: `1px solid ${
                          coach.status === 'on_duty'
                            ? 'rgba(16, 185, 129, 0.3)'
                            : coach.status === 'in_session'
                            ? 'rgba(6, 182, 212, 0.3)'
                            : 'var(--border-subtle)'
                        }`,
                        cursor: 'pointer'
                      }}
                    >
                      {coach.status === 'on_duty'
                        ? 'ON DUTY'
                        : coach.status === 'in_session'
                        ? 'IN SESSION'
                        : 'OFF SHIFT'}
                    </button>
                  </div>

                  {/* Adjust Capacity Button */}
                  <div style={{ textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCoachForCap(coach);
                        setAdjustedCap(coach.maxCapacity);
                      }}
                      className="kinetic-btn-ghost"
                      style={{ padding: '6px 10px', fontSize: '0.74rem' }}
                      title="Adjust Max Athlete Ceiling"
                    >
                      <Sliders size={13} color="var(--accent)" />
                      <span>Edit Cap</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Onboard New Trainer Modal */}
      {isOnboardingOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9998,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.92)',
            padding: '16px'
          }}
          onClick={() => setIsOnboardingOpen(false)}
        >
          <div
            className="kinetic-card animate-scale-up"
            style={{
              width: '100%',
              maxWidth: '520px',
              padding: '28px',
              background: 'var(--surface-elevated)',
              border: '1px solid var(--border-hover)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UserPlus size={18} color="var(--accent)" />
                <h4 className="type-h3" style={{ fontSize: '1.2rem', margin: 0 }}>
                  Onboard Certified Trainer
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsOnboardingOpen(false)}
                style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCoach} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="kinetic-input-group" style={{ margin: 0 }}>
                <label className="kinetic-label">Coach Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Marcus Vance"
                  value={newName}
                  onChange={(e) => {
                    setNewName(e.target.value);
                    if (formErrors.name) setFormErrors((p) => ({ ...p, name: null }));
                  }}
                  className={`kinetic-input ${formErrors.name ? 'input-error' : ''}`}
                />
                {formErrors.name && (
                  <span style={{ fontSize: '0.74rem', color: 'var(--status-error)', marginTop: '4px' }}>
                    {formErrors.name}
                  </span>
                )}
              </div>

              <div className="kinetic-input-group" style={{ margin: 0 }}>
                <label className="kinetic-label">Corporate Email Address *</label>
                <input
                  type="email"
                  placeholder="e.g. marcus.vance@strivex.fit"
                  value={newEmail}
                  onChange={(e) => {
                    setNewEmail(e.target.value);
                    if (formErrors.email) setFormErrors((p) => ({ ...p, email: null }));
                  }}
                  className={`kinetic-input ${formErrors.email ? 'input-error' : ''}`}
                />
                {formErrors.email && (
                  <span style={{ fontSize: '0.74rem', color: 'var(--status-error)', marginTop: '4px' }}>
                    {formErrors.email}
                  </span>
                )}
              </div>

              <div className="kinetic-input-group" style={{ margin: 0 }}>
                <label className="kinetic-label">Phone Hotline (SL / Foreign) *</label>
                <input
                  type="tel"
                  placeholder="e.g. +94 77 123 4567"
                  value={newPhone}
                  onChange={(e) => {
                    setNewPhone(e.target.value);
                    if (formErrors.phone) setFormErrors((p) => ({ ...p, phone: null }));
                  }}
                  className={`kinetic-input ${formErrors.phone ? 'input-error' : ''}`}
                />
                {formErrors.phone && (
                  <span style={{ fontSize: '0.74rem', color: 'var(--status-error)', marginTop: '4px' }}>
                    {formErrors.phone}
                  </span>
                )}
              </div>

              <div className="kinetic-input-group" style={{ margin: 0 }}>
                <label className="kinetic-label">Primary Coaching Specialty *</label>
                <CustomDropdown
                  options={SPECIALTY_OPTIONS}
                  value={newSpecialty}
                  onChange={setNewSpecialty}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="kinetic-input-group" style={{ margin: 0 }}>
                  <label className="kinetic-label">Certification</label>
                  <input
                    type="text"
                    value={newCert}
                    onChange={(e) => setNewCert(e.target.value)}
                    className="kinetic-input"
                  />
                </div>
                <div className="kinetic-input-group" style={{ margin: 0 }}>
                  <label className="kinetic-label">Max Athlete Cap</label>
                  <input
                    type="number"
                    min="10"
                    max="50"
                    value={newCap}
                    onChange={(e) => setNewCap(e.target.value)}
                    className="kinetic-input"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsOnboardingOpen(false)}
                  className="kinetic-btn-ghost"
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="kinetic-btn-primary"
                  style={{ flex: 2 }}
                >
                  <UserPlus size={14} />
                  <span>Register Coach</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Adjust Capacity Modal */}
      {selectedCoachForCap && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9998,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.92)',
            padding: '16px'
          }}
          onClick={() => setSelectedCoachForCap(null)}
        >
          <div
            className="kinetic-card animate-scale-up"
            style={{
              width: '100%',
              maxWidth: '440px',
              padding: '24px',
              background: 'var(--surface-elevated)',
              border: '1px solid var(--border-hover)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="type-h3" style={{ fontSize: '1.15rem', margin: '0 0 12px' }}>
              Adjust Client Capacity Cap
            </h4>
            <p className="type-small" style={{ margin: '0 0 18px' }}>
              Set maximum active athlete allowance for <strong>{selectedCoachForCap.name}</strong>.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <input
                type="range"
                min="10"
                max="45"
                value={adjustedCap}
                onChange={(e) => setAdjustedCap(parseInt(e.target.value, 10))}
                style={{ flex: 1, accentColor: 'var(--accent)' }}
              />
              <span style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--accent)', minWidth: '60px', textAlign: 'right' }}>
                {adjustedCap} Max
              </span>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setSelectedCoachForCap(null)}
                className="kinetic-btn-ghost"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveCap}
                className="kinetic-btn-primary"
                style={{ flex: 2 }}
              >
                Save Capacity
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

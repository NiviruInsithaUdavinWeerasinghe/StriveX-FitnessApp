import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { useBroadcast } from '../../context/BroadcastContext';
import {
  ShieldCheck,
  Users,
  DollarSign,
  UserCheck,
  Search,
  Sun,
  Moon,
  LogOut,
  CreditCard,
  Radio,
  FileSpreadsheet,
  LayoutDashboard,
  Building2
} from 'lucide-react';

import { FinancialLedgerModal } from './FinancialLedgerModal';
import { StaffManagerModal } from './StaffManagerModal';

const EXECUTIVE_METRICS = [
  {
    id: 'mrr',
    label: 'Monthly Recurring Revenue',
    value: '$48,250',
    change: '+14.2%',
    subtext: 'vs previous month',
    trend: 'positive',
    icon: DollarSign,
    color: 'var(--accent)'
  },
  {
    id: 'members',
    label: 'Active Member Athletes',
    value: '1,240',
    change: '+86 new',
    subtext: '84% Pro & Elite tiers',
    trend: 'positive',
    icon: Users,
    color: '#06b6d4'
  },
  {
    id: 'staff',
    label: 'Coach Staff Utilization',
    value: '88.5%',
    change: 'Optimal',
    subtext: '24 active trainers on roster',
    trend: 'neutral',
    icon: UserCheck,
    color: '#f59e0b'
  },
  {
    id: 'churn',
    label: 'Net Monthly Churn',
    value: '1.4%',
    change: '-0.3%',
    subtext: 'Top decile retention',
    trend: 'positive',
    icon: ShieldCheck,
    color: 'var(--status-success)'
  }
];

const SYSTEM_AUDIT_LOGS = [
  {
    id: 'audit_1',
    timestamp: '2 mins ago',
    type: 'billing',
    title: 'Membership Tier Upgrade',
    details: 'Alex Mercer upgraded to Elite Athlete Tier ($89/mo via Visa •••• 8892)',
    status: 'success',
    badge: '+$89.00'
  },
  {
    id: 'audit_2',
    timestamp: '14 mins ago',
    type: 'booking',
    title: '1-on-1 Consultation Booked',
    details: 'Maya Lin scheduled Biomechanics Form Check with Coach Marcus Vance (11:30 AM)',
    status: 'info',
    badge: 'Confirmed'
  },
  {
    id: 'audit_3',
    timestamp: '45 mins ago',
    type: 'system',
    title: 'Routine Sync Telemetry',
    details: 'Hypertrophy Push Day A deployed to 142 athlete dashboards by Coach Marcus',
    status: 'success',
    badge: 'Synced'
  },
  {
    id: 'audit_4',
    timestamp: '1 hour ago',
    type: 'billing',
    title: 'Annual Plan Renewal',
    details: 'Kasun Fernando renewed Elite Annual Plan ($468/yr via Mastercard •••• 4012)',
    status: 'success',
    badge: '+$468.00'
  },
  {
    id: 'audit_5',
    timestamp: '2 hours ago',
    type: 'security',
    title: 'Facility Digital Access Entry',
    details: 'Sarah Tan badged into Colombo 07 High Performance Zone (Sauna & Turf)',
    status: 'info',
    badge: 'Door 02'
  }
];

const TIER_REVENUE_DISTRIBUTION = [
  { tier: 'Elite Athlete Tier ($89/mo)', revenue: '$22,250', percentage: 46, members: '250 athletes', color: 'var(--accent)' },
  { tier: 'Pro Athlete Tier ($49/mo)', revenue: '$19,600', percentage: 41, members: '400 athletes', color: '#06b6d4' },
  { tier: 'Starter Access Tier ($29/mo)', revenue: '$6,400', percentage: 13, members: '220 athletes', color: '#f59e0b' }
];

export const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { addToast } = useToast();
  const { sendBroadcast } = useBroadcast();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'financials' | 'staff'
  const [activeLogFilter, setActiveLogFilter] = useState('all');
  const [searchAudit, setSearchAudit] = useState('');
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastAudience, setBroadcastAudience] = useState('all');

  const filteredLogs = SYSTEM_AUDIT_LOGS.filter((log) => {
    const matchesFilter = activeLogFilter === 'all' || log.type === activeLogFilter;
    const matchesSearch =
      log.title.toLowerCase().includes(searchAudit.toLowerCase()) ||
      log.details.toLowerCase().includes(searchAudit.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) {
      addToast({
        type: 'error',
        title: 'Message Required',
        message: 'Please enter notification content before broadcasting'
      });
      return;
    }

    sendBroadcast({
      title: 'Live Facility Announcement',
      message: broadcastMessage,
      audience: broadcastAudience
    });

    addToast({
      type: 'success',
      title: 'System Notice Broadcasted',
      message: `Announcement dispatched to ${broadcastAudience === 'all' ? 'All 1,240 Members & Staff' : 'Selected Cohort'}`
    });

    setBroadcastMessage('');
    setIsBroadcastModalOpen(false);
  };

  const handleExportAudit = () => {
    addToast({
      type: 'success',
      title: 'Financial & System Audit Exported',
      message: 'Generated cryptographic CSV report for StriveX Facility operations.'
    });
  };

  const navItems = [
    { id: 'overview', label: 'Executive Dashboard', icon: LayoutDashboard },
    { id: 'financials', label: 'Financial Ledger & Revenue', icon: CreditCard },
    { id: 'staff', label: 'Staff & Trainer Management', icon: Users }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex' }}>
      {/* LEFT NAVIGATION SIDEBAR */}
      <aside
        style={{
          width: '260px',
          minWidth: '260px',
          background: 'var(--surface-elevated)',
          borderRight: '1px solid var(--border-glass)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '24px 16px',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 900
        }}
      >
        <div>
          {/* Logo / Brand Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 8px 24px 8px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '24px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#111',
                fontWeight: 900
              }}
            >
              <Building2 size={20} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.1rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                STRIVEX
              </div>
              <span className="type-eyebrow" style={{ fontSize: '0.65rem', color: 'var(--accent)' }}>
                ADMIN HQ
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: isActive ? 'rgba(212, 255, 0, 0.12)' : 'transparent',
                    color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                    border: isActive ? '1px solid rgba(212, 255, 0, 0.25)' : '1px solid transparent',
                    fontWeight: isActive ? 800 : 600,
                    fontSize: '0.86rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Icon size={18} color={isActive ? 'var(--accent)' : 'var(--text-tertiary)'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* User Card & Logout */}
        <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 4px' }}>
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop'}
              alt="Elena Rostova"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1.5px solid var(--accent)'
              }}
            />
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Elena Rostova
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>Head of Ops</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={toggleTheme}
              className="kinetic-btn-ghost"
              style={{ flex: 1, padding: '8px', justifyContent: 'center' }}
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={16} color="var(--accent)" /> : <Moon size={16} color="var(--accent)" />}
            </button>
            <button
              type="button"
              onClick={logout}
              className="kinetic-btn-ghost"
              style={{ flex: 2, padding: '8px 12px', justifyContent: 'center', fontSize: '0.8rem' }}
              title="Sign Out"
            >
              <LogOut size={14} />
              <span>Exit</span>
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, paddingBottom: '60px' }}>
        {/* Top Header */}
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 800,
            background: 'var(--surface-glass)',
            backdropFilter: 'var(--blur-glass)',
            WebkitBackdropFilter: 'var(--blur-glass)',
            borderBottom: '1px solid var(--border-glass)',
            padding: '16px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}
        >
          <div>
            <div className="type-eyebrow">ENTERPRISE COMMAND CENTER</div>
            <h1 className="type-h3" style={{ fontSize: '1.25rem', margin: 0 }}>
              {activeTab === 'overview' && 'Executive Operations Dashboard'}
              {activeTab === 'financials' && 'Financial Ledger & Billing Operations'}
              {activeTab === 'staff' && 'Coaching Roster & Staff Management'}
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              onClick={() => setIsBroadcastModalOpen(true)}
              className="kinetic-btn-secondary"
              style={{ padding: '8px 16px', fontSize: '0.82rem', fontWeight: 800 }}
            >
              <Radio size={14} color="var(--accent)" />
              <span>Broadcast Notice</span>
            </button>

            <button
              type="button"
              onClick={handleExportAudit}
              className="kinetic-btn-ghost"
              style={{ padding: '8px 12px', fontSize: '0.82rem' }}
              title="Export CSV Audit"
            >
              <FileSpreadsheet size={16} color="var(--accent)" />
              <span>Export CSV</span>
            </button>
          </div>
        </header>

        {/* Tab Content Space */}
        <main style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px', flex: 1 }}>
          {/* TAB 1: EXECUTIVE OVERVIEW */}
          {activeTab === 'overview' && (
            <>
              {/* Row 1: Executive KPI Cards Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '24px'
                }}
              >
                {EXECUTIVE_METRICS.map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <div key={metric.id} className="kinetic-card" style={{ padding: '24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                        <span className="type-caption" style={{ fontWeight: 800, textTransform: 'uppercase' }}>
                          {metric.label}
                        </span>
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '10px',
                            background: 'var(--surface-input)',
                            border: '1px solid var(--border-subtle)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Icon size={18} color={metric.color} />
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '2.2rem',
                            fontWeight: 900,
                            color: 'var(--text-primary)'
                          }}
                        >
                          {metric.value}
                        </span>
                        <span
                          style={{
                            fontSize: '0.82rem',
                            fontWeight: 800,
                            color: metric.trend === 'positive' ? 'var(--status-success)' : 'var(--text-secondary)'
                          }}
                        >
                          {metric.change}
                        </span>
                      </div>

                      <div className="type-caption">{metric.subtext}</div>
                    </div>
                  );
                })}
              </div>

              {/* Row 2: Revenue Distribution by Tier & Live System Audit Trail */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 2fr',
                  gap: '28px',
                  alignItems: 'start'
                }}
              >
                {/* Column 1: Tier Revenue Trajectory */}
                <div className="kinetic-card" style={{ padding: '28px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div>
                      <h3 className="type-h3" style={{ margin: 0 }}>
                        Revenue by Tier
                      </h3>
                      <p className="type-small" style={{ margin: '4px 0 0' }}>
                        Monthly subscription contribution
                      </p>
                    </div>
                    <span className="type-caption" style={{ color: 'var(--accent)', fontWeight: 800 }}>
                      $48,250 MRR
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {TIER_REVENUE_DISTRIBUTION.map((tier, idx) => (
                      <div key={idx}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                          <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{tier.tier}</span>
                          <span style={{ fontWeight: 800, color: tier.color }}>
                            {tier.revenue} ({tier.percentage}%)
                          </span>
                        </div>

                        <div style={{ height: '8px', background: 'var(--surface-input)', borderRadius: '4px', overflow: 'hidden', marginBottom: '4px' }}>
                          <div
                            style={{
                              height: '100%',
                              width: `${tier.percentage}%`,
                              background: tier.color,
                              boxShadow: `0 0 10px ${tier.color}`,
                              transition: 'width var(--transition-normal)'
                            }}
                          />
                        </div>

                        <div style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)' }}>
                          Enrolled: {tier.members}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action link to Staff Management */}
                  <button
                    type="button"
                    onClick={() => setActiveTab('staff')}
                    className="kinetic-btn-secondary"
                    style={{ width: '100%', marginTop: '24px', padding: '10px 16px', fontSize: '0.82rem', justifyContent: 'center' }}
                  >
                    <Users size={14} color="var(--accent)" />
                    <span>Manage Staff & Trainer Roster</span>
                  </button>
                </div>

                {/* Column 2: Live System Audit Trail & Events */}
                <div className="kinetic-card" style={{ padding: '28px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '20px',
                      flexWrap: 'wrap',
                      gap: '12px'
                    }}
                  >
                    <div>
                      <h3 className="type-h3" style={{ margin: 0 }}>
                        System Audit & Financial Activity
                      </h3>
                      <p className="type-small" style={{ margin: '4px 0 0' }}>
                        Real-time facility transactions, security badges, and memberships.
                      </p>
                    </div>

                    {/* Event Filter Pills */}
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {['all', 'billing', 'booking', 'system', 'security'].map((flt) => (
                        <button
                          key={flt}
                          type="button"
                          onClick={() => setActiveLogFilter(flt)}
                          style={{
                            padding: '4px 10px',
                            borderRadius: 'var(--radius-pill)',
                            background: activeLogFilter === flt ? 'var(--accent)' : 'var(--surface-input)',
                            color: activeLogFilter === flt ? '#111111' : 'var(--text-secondary)',
                            fontSize: '0.74rem',
                            fontWeight: 800,
                            border: `1px solid ${activeLogFilter === flt ? 'var(--accent)' : 'var(--border-subtle)'}`,
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                            cursor: 'pointer'
                          }}
                        >
                          {flt.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Search Audit Logs */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-pill)',
                      background: 'var(--surface-input)',
                      border: '1px solid var(--border-subtle)',
                      marginBottom: '16px'
                    }}
                  >
                    <Search size={16} color="var(--text-tertiary)" />
                    <input
                      type="text"
                      placeholder="Search audit trail by keyword, member, or transaction ID..."
                      value={searchAudit}
                      onChange={(e) => setSearchAudit(e.target.value)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        color: 'var(--text-primary)',
                        fontSize: '0.86rem',
                        width: '100%'
                      }}
                    />
                  </div>

                  {/* Audit Logs List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {filteredLogs.map((log) => (
                      <div
                        key={log.id}
                        style={{
                          padding: '14px 16px',
                          borderRadius: 'var(--radius-md)',
                          background: 'var(--surface-input)',
                          border: '1px solid var(--border-subtle)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '16px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                          <div
                            style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              background:
                                log.status === 'success'
                                  ? 'var(--status-success)'
                                  : log.status === 'info'
                                  ? 'var(--accent)'
                                  : 'var(--status-warning)',
                              marginTop: '6px',
                              flexShrink: 0
                            }}
                          />
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                                {log.title}
                              </span>
                              <span className="type-caption">• {log.timestamp}</span>
                            </div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                              {log.details}
                            </div>
                          </div>
                        </div>

                        <span
                          className="kinetic-badge"
                          style={{
                            fontSize: '0.74rem',
                            fontWeight: 800,
                            background: log.badge.startsWith('+') ? 'rgba(16, 185, 129, 0.15)' : 'var(--surface-elevated)',
                            color: log.badge.startsWith('+') ? 'var(--status-success)' : 'var(--text-primary)',
                            border: log.badge.startsWith('+') ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-subtle)'
                          }}
                        >
                          {log.badge}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: FINANCIAL LEDGER INLINE */}
          {activeTab === 'financials' && (
            <FinancialLedgerModal isOpen={true} isInline={true} />
          )}

          {/* TAB 3: STAFF MANAGEMENT INLINE */}
          {activeTab === 'staff' && (
            <StaffManagerModal isOpen={true} isInline={true} />
          )}
        </main>
      </div>

      {/* Broadcast Live System Notice Modal */}
      {isBroadcastModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9995,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.88)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            padding: '16px'
          }}
          onClick={() => setIsBroadcastModalOpen(false)}
        >
          <div
            className="kinetic-card animate-scale-up"
            style={{
              width: '100%',
              maxWidth: '560px',
              padding: '28px',
              background: 'var(--surface-elevated)',
              border: '1px solid var(--border-hover)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Radio size={18} color="var(--accent)" />
                <h4 className="type-h3" style={{ fontSize: '1.2rem', margin: 0 }}>
                  Broadcast Live Facility Announcement
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsBroadcastModalOpen(false)}
                style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendBroadcast} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="kinetic-input-group" style={{ margin: 0 }}>
                <label className="kinetic-label">Target Audience *</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[
                    { id: 'all', label: 'All 1,240 Athletes & Staff' },
                    { id: 'elite', label: 'Elite Tier Only' },
                    { id: 'trainers', label: 'Coaching Staff Only' }
                  ].map((aud) => (
                    <button
                      key={aud.id}
                      type="button"
                      onClick={() => setBroadcastAudience(aud.id)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-pill)',
                        background: broadcastAudience === aud.id ? 'var(--accent)' : 'var(--surface-input)',
                        color: broadcastAudience === aud.id ? '#111111' : 'var(--text-secondary)',
                        fontSize: '0.76rem',
                        fontWeight: 800,
                        border: '1px solid var(--border-subtle)',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                        cursor: 'pointer'
                      }}
                    >
                      {aud.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="kinetic-input-group" style={{ margin: 0 }}>
                <label className="kinetic-label">Announcement Content *</label>
                <textarea
                  rows={3}
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  placeholder="e.g. Colombo 07 Olympic Platform scheduled for maintenance on Sunday 8:00 AM - 10:00 AM..."
                  className="kinetic-input"
                  style={{ resize: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setIsBroadcastModalOpen(false)}
                  className="kinetic-btn-ghost"
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
                <button type="submit" className="kinetic-btn-primary" style={{ flex: 2 }}>
                  <Radio size={14} />
                  <span>Send Broadcast</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

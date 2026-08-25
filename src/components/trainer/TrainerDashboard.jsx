import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import {
  Users,
  Search,
  Calendar,
  TrendingUp,
  MessageSquare,
  Video,
  Edit3,
  Sun,
  Moon,
  LogOut,
  Activity
} from 'lucide-react';

const INITIAL_CLIENTS = [
  {
    id: 'cli_1',
    name: 'Alex Mercer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    tier: 'Pro Athlete',
    goal: 'Hypertrophy',
    program: 'Hypertrophy Push/Pull/Legs',
    adherence: 96,
    lastActive: 'Logged Push Day A 2h ago',
    weeklyVolume: '45,200 kg',
    streak: 5,
    status: 'on_track'
  },
  {
    id: 'cli_2',
    name: 'Kasun Fernando',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    tier: 'Elite Athlete',
    goal: 'Strength',
    program: 'Maximal Strength 5×5',
    adherence: 92,
    lastActive: 'Logged Squats Yesterday',
    weeklyVolume: '58,400 kg',
    streak: 8,
    status: 'on_track'
  },
  {
    id: 'cli_3',
    name: 'Sarah Tan',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop',
    tier: 'Pro Athlete',
    goal: 'FatLoss',
    program: 'Metabolic Athletic Conditioning',
    adherence: 88,
    lastActive: 'Logged HIIT Interval 1d ago',
    weeklyVolume: '28,900 kg',
    streak: 3,
    status: 'warning'
  },
  {
    id: 'cli_4',
    name: 'Maya Lin',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop',
    tier: 'Elite Athlete',
    goal: 'Hypertrophy',
    program: 'Upper / Lower Power Hypertrophy',
    adherence: 98,
    lastActive: 'Logged RDLs 3h ago',
    weeklyVolume: '52,100 kg',
    streak: 12,
    status: 'on_track'
  },
  {
    id: 'cli_5',
    name: 'Ryan Patel',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
    tier: 'Starter',
    goal: 'Mobility',
    program: 'Functional Joint Mobility',
    adherence: 74,
    lastActive: 'Logged Stretching 3d ago',
    weeklyVolume: '14,500 kg',
    streak: 1,
    status: 'at_risk'
  }
];

const TODAY_CONSULTATIONS = [
  {
    id: 'call_1',
    time: '9:00 AM',
    clientName: 'Alex Mercer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    type: 'Progress Telemetry Audit',
    duration: '30 mins',
    status: 'completed'
  },
  {
    id: 'call_2',
    time: '11:30 AM',
    clientName: 'Maya Lin',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop',
    type: 'Biomechanics Form Check',
    duration: '45 mins',
    status: 'ready'
  },
  {
    id: 'call_3',
    time: '2:00 PM',
    clientName: 'Ryan Patel',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
    type: 'Mobility Routine Onboarding',
    duration: '30 mins',
    status: 'upcoming'
  },
  {
    id: 'call_4',
    time: '4:30 PM',
    clientName: 'Kasun Fernando',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    type: 'Strength Peaking Assessment',
    duration: '45 mins',
    status: 'upcoming'
  }
];

export const TrainerDashboard = ({ onOpenRoutineBuilder, onOpenClientChat }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { addToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGoalFilter, setSelectedGoalFilter] = useState('All');
  const [selectedClientDetail, setSelectedClientDetail] = useState(null);

  // Filter clients
  const filteredClients = INITIAL_CLIENTS.filter((cli) => {
    const matchesSearch =
      cli.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cli.program.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGoal = selectedGoalFilter === 'All' || cli.goal === selectedGoalFilter;
    return matchesSearch && matchesGoal;
  });

  const handleStartVideoCall = (call) => {
    addToast({
      type: 'success',
      title: 'Joining Live Consultation Room',
      message: `Connecting secure HD 1-on-1 video call with ${call.clientName}...`
    });
  };

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
          {/* Trainer Profile Greeting */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ position: 'relative' }}>
              <img
                src={
                  user?.avatar ||
                  'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=150&auto=format&fit=crop'
                }
                alt="Coach Marcus"
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>
                  TRAINER COMMAND SUITE
                </span>
                <span className="kinetic-badge" style={{ fontSize: '0.66rem', padding: '1px 8px' }}>
                  NSCA-CSCS
                </span>
              </div>
              <div
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-display)'
                }}
              >
                Coach Marcus Vance
              </div>
            </div>
          </div>

          {/* Right Header Utilities */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
              <Users size={15} color="var(--accent)" />
              <span>28 ACTIVE CLIENTS</span>
            </div>

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

      {/* Main Trainer Operations Space */}
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
        {/* Row 1: Operations KPI Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px'
          }}
        >
          <div className="kinetic-card" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                Total Active Cohort
              </span>
              <Users size={18} color="var(--accent)" />
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-primary)' }}>
              28
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--status-success)', fontWeight: 600 }}>
              +3 new athletes enrolled this week
            </span>
          </div>

          <div className="kinetic-card" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                Average Adherence
              </span>
              <TrendingUp size={18} color="var(--status-success)" />
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--status-success)' }}>
              91.4%
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              High progressive compliance
            </span>
          </div>

          <div className="kinetic-card" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                Today's Consultations
              </span>
              <Video size={18} color="#06b6d4" />
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: '#06b6d4' }}>
              4 Sessions
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Next: Maya Lin (11:30 AM)
            </span>
          </div>

          <div className="kinetic-card" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                Pending Form Audits
              </span>
              <Activity size={18} color="#f59e0b" />
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: '#f59e0b' }}>
              2 Videos
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Alex Mercer (Bench Press)
            </span>
          </div>
        </div>

        {/* Row 2: Client Roster Table & Consultations Schedule */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '24px',
            alignItems: 'start'
          }}
        >
          {/* Athlete Client Roster */}
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
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Athlete Client Roster ({filteredClients.length})
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
                  Monitor individual progressive overload and assign customized routines.
                </p>
              </div>

              {/* Goal Filter Pills */}
              <div style={{ display: 'flex', gap: '6px' }}>
                {['All', 'Hypertrophy', 'Strength', 'FatLoss', 'Mobility'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setSelectedGoalFilter(g)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-pill)',
                      background: selectedGoalFilter === g ? 'var(--accent)' : 'var(--surface-input)',
                      color: selectedGoalFilter === g ? '#111111' : 'var(--text-secondary)',
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      border: `1px solid ${selectedGoalFilter === g ? 'var(--accent)' : 'var(--border-subtle)'}`,
                      cursor: 'pointer'
                    }}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--surface-input)',
                border: '1px solid var(--border-subtle)',
                marginBottom: '20px'
              }}
            >
              <Search size={16} color="var(--text-tertiary)" />
              <input
                type="text"
                placeholder="Search athlete by name, tier, or routine..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

            {/* Clients Table List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filteredClients.map((client) => (
                <div
                  key={client.id}
                  style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--surface-input)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    flexWrap: 'wrap'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <img
                      src={client.avatar}
                      alt={client.name}
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid var(--accent)'
                      }}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                          {client.name}
                        </span>
                        <span className="kinetic-badge" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>
                          {client.tier}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {client.program} • <strong style={{ color: 'var(--text-tertiary)' }}>{client.lastActive}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Adherence and Action Buttons */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)' }}>ADHERENCE</div>
                      <div
                        style={{
                          fontSize: '1rem',
                          fontWeight: 900,
                          color:
                            client.adherence >= 90
                              ? 'var(--status-success)'
                              : client.adherence >= 80
                              ? 'var(--status-warning)'
                              : 'var(--status-error)'
                        }}
                      >
                        {client.adherence}%
                      </div>
                    </div>

                    {/* Action Triggers */}
                    <button
                      type="button"
                      onClick={() => {
                        if (onOpenRoutineBuilder) onOpenRoutineBuilder(client);
                        else {
                          addToast({
                            type: 'info',
                            title: 'Interface 3.2: Routine Builder',
                            message: `Opening program editor for ${client.name}`
                          });
                        }
                      }}
                      className="kinetic-btn-secondary"
                      style={{ padding: '8px 14px', fontSize: '0.78rem', fontWeight: 700 }}
                      title="Assign / Customize Routine"
                    >
                      <Edit3 size={13} /> Edit Routine
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (onOpenClientChat) onOpenClientChat(client);
                        else {
                          addToast({
                            type: 'info',
                            title: 'Direct Athlete Messaging',
                            message: `Opening direct telemetry thread with ${client.name}`
                          });
                        }
                      }}
                      className="kinetic-btn-ghost"
                      style={{ padding: '8px 12px', fontSize: '0.78rem' }}
                      title="Message Athlete"
                    >
                      <MessageSquare size={15} color="var(--accent)" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedClientDetail(client)}
                      className="kinetic-btn-ghost"
                      style={{ padding: '8px 12px', fontSize: '0.78rem' }}
                      title="View Telemetry Breakdown"
                    >
                      <Activity size={15} color="#06b6d4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's 1-on-1 Consultation Schedule */}
          <div className="kinetic-card" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={18} color="var(--accent)" />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Today's Schedule
                </h4>
              </div>
              <span style={{ fontSize: '0.74rem', color: 'var(--accent)', fontWeight: 700 }}>
                {TODAY_CONSULTATIONS.length} BOOKED
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {TODAY_CONSULTATIONS.map((call) => (
                <div
                  key={call.id}
                  style={{
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--surface-input)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent)' }}>
                      {call.time} ({call.duration})
                    </span>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color:
                          call.status === 'completed'
                            ? 'var(--status-success)'
                            : call.status === 'ready'
                            ? 'var(--accent)'
                            : 'var(--text-tertiary)'
                      }}
                    >
                      {call.status.toUpperCase()}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={call.avatar}
                      alt={call.clientName}
                      style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {call.clientName}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                        {call.type}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleStartVideoCall(call)}
                    className="kinetic-btn-primary"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      marginTop: '4px'
                    }}
                  >
                    <Video size={13} /> Join Consultation Room
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Client Telemetry Detail Drawer / Modal */}
      {selectedClientDetail && (
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
            padding: '16px'
          }}
          onClick={() => setSelectedClientDetail(null)}
        >
          <div
            className="kinetic-card animate-scale-up"
            style={{
              width: '100%',
              maxWidth: '540px',
              padding: '28px',
              background: 'var(--surface-elevated)',
              border: '1px solid var(--border-hover)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src={selectedClientDetail.avatar}
                  alt={selectedClientDetail.name}
                  style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid var(--accent)' }}
                />
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {selectedClientDetail.name}
                  </h4>
                  <span style={{ fontSize: '0.78rem', color: 'var(--accent)' }}>
                    {selectedClientDetail.tier} • {selectedClientDetail.goal} Focus
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedClientDetail(null)}
                style={{ color: 'var(--text-secondary)' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              <div style={{ padding: '12px', background: 'var(--surface-input)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>WEEKLY VOLUME</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--accent)' }}>
                  {selectedClientDetail.weeklyVolume}
                </div>
              </div>
              <div style={{ padding: '12px', background: 'var(--surface-input)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>ACTIVE STREAK</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--status-success)' }}>
                  {selectedClientDetail.streak} Days
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => {
                  setSelectedClientDetail(null);
                  if (onOpenRoutineBuilder) onOpenRoutineBuilder(selectedClientDetail);
                }}
                className="kinetic-btn-primary"
                style={{ flex: 1, padding: '12px', fontSize: '0.85rem' }}
              >
                <Edit3 size={14} /> Customize Program
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedClientDetail(null);
                  if (onOpenClientChat) onOpenClientChat(selectedClientDetail);
                }}
                className="kinetic-btn-secondary"
                style={{ flex: 1, padding: '12px', fontSize: '0.85rem' }}
              >
                <MessageSquare size={14} /> Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

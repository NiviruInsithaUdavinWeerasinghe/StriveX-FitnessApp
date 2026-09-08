import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useBroadcast } from '../../context/BroadcastContext';
import { RoutineBuilderModal } from './RoutineBuilderModal';
import { TrainerConsultationHubModal } from './TrainerConsultationHubModal';
import { TrainerChatModal } from './TrainerChatModal';
import { LiveBroadcastBanner } from '../ui/LiveBroadcastBanner';
import { NotificationDrawerModal } from '../ui/NotificationDrawerModal';
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
  Activity,
  LayoutDashboard,
  Dumbbell,
  Zap
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
    clientId: 'cli_1',
    time: '9:00 AM',
    clientName: 'Alex Mercer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    type: 'Progress Telemetry Audit',
    duration: '30 mins',
    status: 'completed'
  },
  {
    id: 'call_2',
    clientId: 'cli_4',
    time: '11:30 AM',
    clientName: 'Maya Lin',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop',
    type: '1-on-1 Biomechanics Review',
    duration: '45 mins',
    status: 'upcoming'
  },
  {
    id: 'call_3',
    clientId: 'cli_5',
    time: '2:00 PM',
    clientName: 'Ryan Patel',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
    type: 'Onboarding & Assessment',
    duration: '30 mins',
    status: 'upcoming'
  }
];

export const TrainerDashboard = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { unreadCount } = useBroadcast();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'builder' | 'consultations' | 'chat'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGoalFilter, setSelectedGoalFilter] = useState('All');

  // Modals / Selected targets
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [builderTargetClient, setBuilderTargetClient] = useState(null);
  const [chatTargetClientId, setChatTargetClientId] = useState('cli_1');
  const [consultHubTargetClient, setConsultHubTargetClient] = useState(null);

  const filteredClients = INITIAL_CLIENTS.filter((cli) => {
    const matchesSearch =
      cli.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cli.program.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGoal = selectedGoalFilter === 'All' || cli.goal === selectedGoalFilter;
    return matchesSearch && matchesGoal;
  });

  const navItems = [
    { id: 'overview', label: 'Roster & Dashboard', icon: LayoutDashboard },
    { id: 'builder', label: 'Program Builder', icon: Dumbbell },
    { id: 'consultations', label: 'Consultation Hub & Videos', icon: Video },
    { id: 'chat', label: 'Athlete Chat & Cues', icon: MessageSquare }
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
              <Activity size={20} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.1rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                STRIVEX
              </div>
              <span className="type-eyebrow" style={{ fontSize: '0.65rem', color: 'var(--accent)' }}>
                TRAINER PORTAL
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
              src={user?.avatar || 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=150&auto=format&fit=crop'}
              alt="Coach Marcus"
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
                Coach Marcus
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>NSCA-CSCS Head Coach</div>
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
        {/* LIVE BROADCAST BANNER AT TOP */}
        <LiveBroadcastBanner userRole="trainer" />

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
            <div className="type-eyebrow">TRAINER COMMAND SUITE</div>
            <h1 className="type-h3" style={{ fontSize: '1.25rem', margin: 0 }}>
              {activeTab === 'overview' && 'Athlete Roster & Performance Overview'}
              {activeTab === 'builder' && 'Hypertrophy & Strength Program Builder'}
              {activeTab === 'consultations' && 'Biomechanics & Consultation Hub'}
              {activeTab === 'chat' && 'Live Athlete Communication Mesh'}
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Notification Bell Button */}
            <button
              type="button"
              onClick={() => setIsNotificationDrawerOpen(true)}
              className="kinetic-btn-secondary"
              style={{ padding: '8px', position: 'relative' }}
              title="Notification Center & Announcements"
            >
              <Zap size={18} color="var(--accent)" />
              {unreadCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    background: '#ff3b30',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    fontSize: '0.65rem',
                    fontWeight: 900,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid var(--bg-primary)'
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('builder')}
              className="kinetic-btn-primary"
              style={{ padding: '8px 16px', fontSize: '0.82rem', fontWeight: 800 }}
            >
              <Edit3 size={14} />
              <span>New Program</span>
            </button>
          </div>
        </header>

        {/* Content Tabs */}
        <main style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px', flex: 1 }}>
          {/* TAB 1: ROSTER OVERVIEW */}
          {activeTab === 'overview' && (
            <>
              {/* Row 1: KPI Stats Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                <div className="kinetic-card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span className="type-caption">Active Roster</span>
                    <Users size={18} color="var(--accent)" />
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                    24 Athletes
                  </div>
                  <span className="type-caption" style={{ color: 'var(--status-success)', marginTop: '4px', display: 'block' }}>
                    96.4% Adherence Avg
                  </span>
                </div>

                <div className="kinetic-card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span className="type-caption">Consultations Today</span>
                    <Calendar size={18} color="#06b6d4" />
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                    3 Sessions
                  </div>
                  <span className="type-caption" style={{ color: 'var(--text-secondary)', marginTop: '4px', display: 'block' }}>
                    1 Completed • 2 Upcoming
                  </span>
                </div>

                <div className="kinetic-card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span className="type-caption">Weekly Tonnage Sync</span>
                    <TrendingUp size={18} color="#f59e0b" />
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                    199.1 Tons
                  </div>
                  <span className="type-caption" style={{ color: 'var(--status-success)', marginTop: '4px', display: 'block' }}>
                    +18% volume vs prior week
                  </span>
                </div>
              </div>

              {/* Row 2: Roster Table & Consultations Schedule */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '28px', alignItems: 'start' }}>
                {/* Roster Table */}
                <div className="kinetic-card" style={{ padding: '28px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <h3 className="type-h3" style={{ margin: 0 }}>Assigned Athlete Roster</h3>
                      <p className="type-small" style={{ margin: '4px 0 0' }}>Real-time telemetry, volume load, and program adherence.</p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: 'var(--radius-pill)', background: 'var(--surface-input)', border: '1px solid var(--border-subtle)' }}>
                        <Search size={14} color="var(--text-tertiary)" />
                        <input
                          type="text"
                          placeholder="Filter roster..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', fontSize: '0.8rem', width: '120px' }}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
                          gap: '16px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <img
                            src={client.avatar}
                            alt={client.name}
                            style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--accent)' }}
                          />
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{client.name}</strong>
                              <span className="kinetic-badge" style={{ fontSize: '0.64rem', padding: '1px 6px' }}>{client.tier}</span>
                            </div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                              {client.program}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                          <div>
                            <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', display: 'block' }}>Adherence</span>
                            <span style={{ fontWeight: 800, color: client.adherence > 90 ? 'var(--status-success)' : '#f59e0b', fontSize: '0.9rem' }}>
                              {client.adherence}%
                            </span>
                          </div>

                          <div>
                            <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', display: 'block' }}>Weekly Volume</span>
                            <span style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                              {client.weeklyVolume}
                            </span>
                          </div>

                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button
                              type="button"
                              onClick={() => {
                                setChatTargetClientId(client.id);
                                setActiveTab('chat');
                              }}
                              className="kinetic-btn-ghost"
                              style={{ padding: '6px', borderRadius: 'var(--radius-pill)' }}
                              title="Chat with Athlete"
                            >
                              <MessageSquare size={16} color="var(--accent)" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setConsultHubTargetClient(client);
                                setActiveTab('consultations');
                              }}
                              className="kinetic-btn-ghost"
                              style={{ padding: '6px', borderRadius: 'var(--radius-pill)' }}
                              title="View Telemetry & Videos"
                            >
                              <Video size={16} color="#06b6d4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Consultations Schedule */}
                <div className="kinetic-card" style={{ padding: '28px' }}>
                  <h3 className="type-h3" style={{ margin: '0 0 16px 0' }}>Today's Consultations</h3>

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
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img src={call.avatar} alt={call.clientName} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                          <div>
                            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)' }}>{call.clientName}</div>
                            <div className="type-caption">{call.time} • {call.type}</div>
                          </div>
                        </div>

                        <span className="kinetic-badge" style={{ fontSize: '0.66rem' }}>
                          {call.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: PROGRAM BUILDER INLINE */}
          {activeTab === 'builder' && (
            <RoutineBuilderModal
              isOpen={true}
              isInline={true}
              targetClient={builderTargetClient}
            />
          )}

          {/* TAB 3: CONSULTATION HUB INLINE */}
          {activeTab === 'consultations' && (
            <TrainerConsultationHubModal
              isOpen={true}
              isInline={true}
              defaultClient={consultHubTargetClient}
            />
          )}

          {/* TAB 4: CHAT INLINE */}
          {activeTab === 'chat' && (
            <TrainerChatModal
              isOpen={true}
              isInline={true}
              defaultClientId={chatTargetClientId}
              onOpenTelemetry={(cli) => {
                setConsultHubTargetClient(cli);
                setActiveTab('consultations');
              }}
            />
          )}
        </main>
      </div>

      {/* NOTIFICATION DRAWER MODAL */}
      <NotificationDrawerModal
        isOpen={isNotificationDrawerOpen}
        onClose={() => setIsNotificationDrawerOpen(false)}
        userRole="trainer"
      />
    </div>
  );
};

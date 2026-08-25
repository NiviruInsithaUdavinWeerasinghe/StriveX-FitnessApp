import { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Search,
  Activity,
  Sparkles,
  Dumbbell
} from 'lucide-react';

const INITIAL_CLIENT_CONVERSATIONS = {
  cli_1: {
    id: 'cli_1',
    name: 'Alex Mercer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    tier: 'Pro Athlete',
    routine: 'Hypertrophy Push Day A',
    adherence: 96,
    status: 'Online',
    unread: false,
    messages: [
      {
        id: 'msg_1',
        sender: 'athlete',
        senderName: 'Alex Mercer',
        text: 'Hey Coach Marcus! Just finished Push Day A. My bench press felt really strong at 85kg for 8 reps.',
        time: '10:14 AM'
      },
      {
        id: 'msg_2',
        sender: 'coach',
        senderName: 'Coach Marcus Vance',
        text: 'Great work Alex! I reviewed your Set 3 video. Scapular retraction looked solid. Next session, try ramping the first set to 87.5kg.',
        time: '10:18 AM'
      },
      {
        id: 'msg_3',
        sender: 'athlete',
        senderName: 'Alex Mercer',
        text: 'Will do! Should I keep the 90-second rest intervals or increase to 2 minutes for the heavier load?',
        time: '10:22 AM'
      }
    ]
  },
  cli_2: {
    id: 'cli_2',
    name: 'Kasun Fernando',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    tier: 'Elite Athlete',
    routine: 'Maximal Strength 5×5',
    adherence: 92,
    status: 'Online',
    unread: true,
    messages: [
      {
        id: 'msg_k1',
        sender: 'athlete',
        senderName: 'Kasun Fernando',
        text: 'Coach, completed 5x5 squats with 140kg today. Depth felt deep and hip drive was explosive.',
        time: 'Yesterday'
      },
      {
        id: 'msg_k2',
        sender: 'coach',
        senderName: 'Coach Marcus Vance',
        text: 'Checked the telemetry log, 58,400 kg weekly volume is peak strength territory. Take an active recovery walk tomorrow.',
        time: 'Yesterday'
      }
    ]
  },
  cli_3: {
    id: 'cli_3',
    name: 'Sarah Tan',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop',
    tier: 'Pro Athlete',
    routine: 'Metabolic Athletic Conditioning',
    adherence: 88,
    status: 'Offline',
    unread: false,
    messages: [
      {
        id: 'msg_s1',
        sender: 'athlete',
        senderName: 'Sarah Tan',
        text: 'Hi Marcus, the interval sprint session was intense! Heart rate spiked to 165 bpm during round 4.',
        time: '2 days ago'
      },
      {
        id: 'msg_s2',
        sender: 'coach',
        senderName: 'Coach Marcus Vance',
        text: 'That puts you right in high-aerobic VO2 threshold. Keep water intake above 3L today.',
        time: '2 days ago'
      }
    ]
  },
  cli_4: {
    id: 'cli_4',
    name: 'Maya Lin',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop',
    tier: 'Elite Athlete',
    routine: 'Upper / Lower Power',
    adherence: 98,
    status: 'Online',
    unread: false,
    messages: [
      {
        id: 'msg_m1',
        sender: 'athlete',
        senderName: 'Maya Lin',
        text: 'Uploaded my Romanian Deadlift video for form check. Looking forward to our 11:30 AM video call.',
        time: '8:45 AM'
      },
      {
        id: 'msg_m2',
        sender: 'coach',
        senderName: 'Coach Marcus Vance',
        text: 'Noted Maya! I will have your progressive overload graph ready for our consultation call.',
        time: '8:50 AM'
      }
    ]
  },
  cli_5: {
    id: 'cli_5',
    name: 'Ryan Patel',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
    tier: 'Starter',
    routine: 'Functional Joint Mobility',
    adherence: 74,
    status: 'Offline',
    unread: false,
    messages: [
      {
        id: 'msg_r1',
        sender: 'athlete',
        senderName: 'Ryan Patel',
        text: 'Coach, hip flexors feeling tighter than usual after the stretching routine.',
        time: '3 days ago'
      },
      {
        id: 'msg_r2',
        sender: 'coach',
        senderName: 'Coach Marcus Vance',
        text: 'Lets review your foam rolling protocol during our 2:00 PM session today.',
        time: '3 days ago'
      }
    ]
  }
};

const QUICK_COACH_CUES = [
  'Form looks solid. Add 2.5kg to your next set.',
  'Keep rest intervals strict at 90 seconds.',
  'Record a video of your next heavy set for telemetry review.',
  'Great adherence this week! Keep protein above 160g today.'
];

export const TrainerChatModal = ({ isOpen, onClose, defaultClientId, onOpenTelemetry }) => {
  const [conversations, setConversations] = useState(INITIAL_CLIENT_CONVERSATIONS);
  const [activeClientId, setActiveClientId] = useState(defaultClientId || 'cli_1');
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAthleteTyping, setIsAthleteTyping] = useState(false);

  const messagesEndRef = useRef(null);

  // Sync defaultClientId when opened
  useEffect(() => {
    if (defaultClientId && conversations[defaultClientId]) {
      setActiveClientId(defaultClientId);
    }
  }, [defaultClientId, conversations]);

  const activeClient = conversations[activeClientId] || conversations.cli_1;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, activeClientId, conversations, isAthleteTyping]);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend = null) => {
    const messageContent = (typeof textToSend === 'string' ? textToSend : inputText).trim();
    if (!messageContent) return;

    const newMsg = {
      id: `msg_coach_${Date.now()}`,
      sender: 'coach',
      senderName: 'Coach Marcus Vance',
      text: messageContent,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversations((prev) => ({
      ...prev,
      [activeClientId]: {
        ...prev[activeClientId],
        messages: [...prev[activeClientId].messages, newMsg]
      }
    }));

    setInputText('');

    // Simulate realistic athlete reply after 1.5 seconds
    setIsAthleteTyping(true);
    setTimeout(() => {
      setIsAthleteTyping(false);
      const athleteReplies = [
        `Thanks Coach! Logged it in my telemetry journal right now.`,
        `Got it! I will execute that cue on my next workout session.`,
        `Understood Marcus! Really feeling the progressive overload gains.`,
        `Awesome, thanks for the quick feedback on my form!`
      ];
      const randomReply = athleteReplies[Math.floor(Math.random() * athleteReplies.length)];

      const autoReply = {
        id: `msg_ath_${Date.now()}`,
        sender: 'athlete',
        senderName: activeClient.name,
        text: randomReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setConversations((prev) => ({
        ...prev,
        [activeClientId]: {
          ...prev[activeClientId],
          messages: [...prev[activeClientId].messages, autoReply]
        }
      }));
    }, 1500);
  };

  const filteredClients = Object.values(conversations).filter((cli) =>
    cli.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cli.routine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
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
      onClick={onClose}
    >
      <div
        className="kinetic-card animate-scale-up"
        style={{
          width: '100%',
          maxWidth: '960px',
          height: '86vh',
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
            gap: '16px'
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
              <Dumbbell size={18} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="type-eyebrow">COACH ATHLETE DIRECT MESSAGING</span>
                <span className="kinetic-badge" style={{ fontSize: '0.66rem', padding: '1px 6px' }}>
                  COACH VIEW
                </span>
              </div>
              <h3 className="type-h3" style={{ fontSize: '1.15rem', margin: 0, whiteSpace: 'nowrap' }}>
                Athlete Telemetry & Coaching Communications
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: 'var(--radius-pill)',
              background: 'var(--surface-glass)',
              color: 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* 2-Column Body */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '280px 1fr', overflow: 'hidden' }}>
          {/* Left Sidebar: Athlete Roster */}
          <div
            style={{
              borderRight: '1px solid var(--border-subtle)',
              background: 'var(--bg-secondary)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Search Athletes */}
            <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border-subtle)' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-pill)',
                  background: 'var(--surface-input)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <Search size={14} color="var(--text-tertiary)" />
                <input
                  type="text"
                  placeholder="Search athletes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '0.8rem',
                    width: '100%'
                  }}
                />
              </div>
            </div>

            {/* Athletes List */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {filteredClients.map((cli) => {
                  const isSelected = cli.id === activeClientId;
                  return (
                    <button
                      key={cli.id}
                      type="button"
                      onClick={() => setActiveClientId(cli.id)}
                      style={{
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-md)',
                        background: isSelected ? 'var(--surface-elevated)' : 'transparent',
                        border: `1px solid ${isSelected ? 'var(--accent)' : 'transparent'}`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      <div style={{ position: 'relative' }}>
                        <img
                          src={cli.avatar}
                          alt={cli.name}
                          style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: `1.5px solid ${isSelected ? 'var(--accent)' : 'var(--border-subtle)'}`
                          }}
                        />
                        <span
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: cli.status === 'Online' ? 'var(--status-success)' : 'var(--text-tertiary)',
                            border: '1.5px solid var(--bg-primary)'
                          }}
                        />
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                            {cli.name}
                          </span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--accent)', fontWeight: 700 }}>
                            {cli.adherence}%
                          </span>
                        </div>
                        <div
                          style={{
                            fontSize: '0.74rem',
                            color: 'var(--text-secondary)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            marginTop: '2px'
                          }}
                        >
                          {cli.routine}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Chat Pane */}
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-primary)' }}>
            {/* Active Athlete Header Strip */}
            <div
              style={{
                padding: '12px 20px',
                background: 'var(--surface-glass)',
                borderBottom: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src={activeClient.avatar}
                  alt={activeClient.name}
                  style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1.5px solid var(--accent)' }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {activeClient.name}
                    </span>
                    <span className="kinetic-badge" style={{ fontSize: '0.66rem', padding: '1px 6px' }}>
                      {activeClient.tier}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                    Active Split: <strong style={{ color: 'var(--text-primary)' }}>{activeClient.routine}</strong> • Status: {activeClient.status}
                  </div>
                </div>
              </div>

              {onOpenTelemetry && (
                <button
                  type="button"
                  onClick={() => onOpenTelemetry(activeClient)}
                  className="kinetic-btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.76rem', whiteSpace: 'nowrap', flexShrink: 0 }}
                >
                  <Activity size={13} color="var(--accent)" />
                  <span>Telemetry Audit</span>
                </button>
              )}
            </div>

            {/* Messages Scroll Area */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}
            >
              {activeClient.messages.map((msg) => {
                const isCoach = msg.sender === 'coach';
                return (
                  <div
                    key={msg.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: isCoach ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <div
                      style={{
                        maxWidth: '72%',
                        padding: '12px 16px',
                        borderRadius: isCoach ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                        background: isCoach
                          ? 'linear-gradient(135deg, rgba(212, 255, 0, 0.22), rgba(212, 255, 0, 0.08))'
                          : 'var(--surface-input)',
                        border: isCoach
                          ? '1px solid rgba(212, 255, 0, 0.4)'
                          : '1px solid var(--border-subtle)',
                        color: 'var(--text-primary)',
                        fontSize: '0.86rem',
                        lineHeight: 1.5,
                        boxShadow: isCoach ? '0 0 16px rgba(212, 255, 0, 0.1)' : 'none'
                      }}
                    >
                      <div
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          color: isCoach ? 'var(--accent)' : 'var(--text-tertiary)',
                          marginBottom: '4px'
                        }}
                      >
                        {isCoach ? 'Coach Marcus Vance (You)' : msg.senderName}
                      </div>
                      <div>{msg.text}</div>
                    </div>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)', marginTop: '3px', padding: '0 4px' }}>
                      {msg.time}
                    </span>
                  </div>
                );
              })}

              {isAthleteTyping && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-tertiary)', fontSize: '0.74rem' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)' }} />
                  <span>{activeClient.name} is typing response...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Coach Cues Pill Bar */}
            <div
              style={{
                padding: '8px 16px',
                background: 'var(--surface-glass)',
                borderTop: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                overflowX: 'auto',
                whiteSpace: 'nowrap'
              }}
            >
              <span style={{ fontSize: '0.72rem', color: 'var(--accent)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                <Sparkles size={12} /> Cues:
              </span>
              {QUICK_COACH_CUES.map((cue, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(cue)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-pill)',
                    background: 'var(--surface-input)',
                    border: '1px solid var(--border-glass)',
                    color: 'var(--text-secondary)',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                >
                  {cue}
                </button>
              ))}
            </div>

            {/* Input Composer */}
            <div
              style={{
                padding: '14px 16px',
                background: 'var(--surface-glass)',
                borderTop: '1px solid var(--border-glass)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <input
                type="text"
                placeholder={`Message ${activeClient.name} with coaching instructions or technique feedback...`}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-pill)',
                  background: 'var(--surface-input)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '0.86rem',
                  outline: 'none'
                }}
              />

              <button
                type="button"
                onClick={() => handleSendMessage()}
                className="kinetic-btn-primary"
                style={{ padding: '10px 18px', fontSize: '0.82rem', whiteSpace: 'nowrap', flexShrink: 0 }}
              >
                <Send size={14} />
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

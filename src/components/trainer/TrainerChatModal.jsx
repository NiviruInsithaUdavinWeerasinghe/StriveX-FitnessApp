import { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Search,
  Activity,
  Sparkles,
  Dumbbell,
  CheckCheck
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
        text: 'Great work Alex! I reviewed your Set 3 video. Scapular retraction was locked in. Next session, ramp set 1 to 87.5kg.',
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
        time: '9:30 AM'
      },
      {
        id: 'msg_k2',
        sender: 'coach',
        senderName: 'Coach Marcus Vance',
        text: 'Sensational effort Kasun! Make sure you prioritize posterior chain recovery tonight.',
        time: '9:40 AM'
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
        text: 'Hi Coach! Completed the HIIT interval session on Concept2 rower.',
        time: 'Yesterday'
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
        text: 'Uploaded my Romanian Deadlift video for form check. Ready for our 11:30 AM video call.',
        time: '8:45 AM'
      },
      {
        id: 'msg_m2',
        sender: 'coach',
        senderName: 'Coach Marcus Vance',
        text: 'Noted Maya! I have your overload curve ready for our session.',
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
        text: 'Coach, hip flexors feeling tight after the mobility routine.',
        time: '3 days ago'
      },
      {
        id: 'msg_r2',
        sender: 'coach',
        senderName: 'Coach Marcus Vance',
        text: 'We will review your foam rolling protocol during our 2:00 PM session.',
        time: '3 days ago'
      }
    ]
  }
};

const QUICK_COACH_CUES = [
  'Form looks solid. Add 2.5kg to your next set.',
  'Keep rest intervals strict at 90 seconds.',
  'Record a video of your next heavy set for review.',
  'Great adherence! Keep protein intake high today.'
];

export const TrainerChatModal = ({ isOpen, onClose, defaultClientId, onOpenTelemetry, isInline = false }) => {
  const [conversations, setConversations] = useState(INITIAL_CLIENT_CONVERSATIONS);
  const [activeClientId, setActiveClientId] = useState(defaultClientId || 'cli_1');
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAthleteTyping, setIsAthleteTyping] = useState(false);

  const messagesEndRef = useRef(null);

  // Sync client selection when modal opens
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
    if (isOpen || isInline) {
      scrollToBottom();
    }
  }, [isOpen, isInline, activeClientId, conversations, isAthleteTyping]);

  if (!isOpen && !isInline) return null;

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

    // Simulate athlete reply
    setIsAthleteTyping(true);
    setTimeout(() => {
      setIsAthleteTyping(false);
      const athleteReplies = [
        `Thanks Coach! Logged it in my journal right now.`,
        `Got it! I will apply that cue on my next set.`,
        `Understood Marcus! Really feeling the progressive overload gains.`,
        `Awesome, thanks for the quick technique feedback!`
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
    }, 1200);
  };

  const filteredClients = Object.values(conversations).filter((cli) =>
    cli.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cli.routine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const contentUI = (
    <div
      className={isInline ? 'kinetic-card' : 'kinetic-card animate-scale-up'}
      style={{
        width: '100%',
        maxWidth: isInline ? '100%' : '1080px',
        height: isInline ? '100%' : '88vh',
        display: 'flex',
        background: 'var(--surface-elevated)',
        border: '1px solid var(--border-hover)',
        borderRadius: isInline ? 'var(--radius-lg)' : 'var(--radius-xl)',
        overflow: 'hidden',
        boxShadow: isInline ? 'none' : 'var(--shadow-lg)'
      }}
      onClick={(e) => isInline ? null : e.stopPropagation()}
    >
      {/* Left Sidebar: Roster Conversations List */}
      <div
        style={{
          width: '320px',
          minWidth: '320px',
          background: 'rgba(0,0,0,0.25)',
          borderRight: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Roster Search Header */}
        <div style={{ padding: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span className="type-eyebrow" style={{ fontSize: '0.68rem' }}>ATHLETE MESSAGING MESH</span>
            <span className="kinetic-badge" style={{ fontSize: '0.64rem', padding: '1px 6px' }}>
              5 ACTIVE
            </span>
          </div>

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
              placeholder="Search athlete roster..."
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

        {/* Clients List */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          {filteredClients.map((client) => {
            const isSelected = activeClientId === client.id;
            const lastMsg = client.messages[client.messages.length - 1];

            return (
              <div
                key={client.id}
                onClick={() => setActiveClientId(client.id)}
                style={{
                  padding: '14px 16px',
                  borderBottom: '1px solid var(--border-glass)',
                  background: isSelected ? 'rgba(212, 255, 0, 0.1)' : 'transparent',
                  borderLeft: isSelected ? '3px solid var(--accent)' : '3px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div style={{ position: 'relative' }}>
                  <img
                    src={client.avatar}
                    alt={client.name}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: isSelected ? '2px solid var(--accent)' : '1px solid var(--border-subtle)'
                    }}
                  />
                  {client.status === 'Online' && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: '9px',
                        height: '9px',
                        borderRadius: '50%',
                        background: 'var(--status-success)',
                        border: '1.5px solid var(--bg-primary)'
                      }}
                    />
                  )}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h5 style={{ fontSize: '0.88rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {client.name}
                    </h5>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>
                      {lastMsg ? lastMsg.time : ''}
                    </span>
                  </div>

                  <p className="type-caption" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: '2px 0 0 0' }}>
                    {lastMsg ? lastMsg.text : 'No messages yet'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Chat Window & Controls */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Header */}
        <div
          style={{
            padding: '14px 20px',
            background: 'var(--surface-glass)',
            borderBottom: '1px solid var(--border-glass)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src={activeClient.avatar}
              alt={activeClient.name}
              style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--accent)' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                  {activeClient.name}
                </h4>
                <span className="kinetic-badge" style={{ fontSize: '0.64rem', padding: '1px 6px' }}>
                  {activeClient.tier}
                </span>
              </div>
              <span className="type-caption" style={{ color: 'var(--text-tertiary)' }}>
                Program: <strong style={{ color: 'var(--text-secondary)' }}>{activeClient.routine}</strong> • Adherence {activeClient.adherence}%
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {onOpenTelemetry && (
              <button
                type="button"
                onClick={() => onOpenTelemetry(activeClient)}
                className="kinetic-btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.78rem' }}
              >
                <Activity size={13} color="var(--accent)" />
                <span>View Telemetry</span>
              </button>
            )}

            {!isInline && onClose && (
              <button
                type="button"
                onClick={onClose}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-pill)',
                  background: 'var(--surface-input)',
                  border: '1px solid var(--border-glass)',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Message Trail */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
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
                <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginBottom: '3px', padding: '0 4px' }}>
                  {msg.senderName} • {msg.time}
                </div>

                <div
                  style={{
                    maxWidth: '75%',
                    padding: '12px 16px',
                    borderRadius: isCoach ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: isCoach ? 'var(--accent)' : 'var(--surface-input)',
                    color: isCoach ? '#111111' : 'var(--text-primary)',
                    fontWeight: isCoach ? 700 : 500,
                    fontSize: '0.88rem',
                    lineHeight: '1.4',
                    border: isCoach ? 'none' : '1px solid var(--border-subtle)'
                  }}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}

          {isAthleteTyping && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-tertiary)', fontSize: '0.78rem', fontStyle: 'italic' }}>
              <span>{activeClient.name} is typing telemetry response...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Cues & Input Area */}
        <div style={{ padding: '16px 20px', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid var(--border-subtle)' }}>
          {/* Quick Cues Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
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
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                  fontSize: '0.74rem',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}
              >
                {cue}
              </button>
            ))}
          </div>

          {/* Form Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Send coaching feedback to ${activeClient.name}...`}
              className="kinetic-input"
              style={{ flex: 1, padding: '10px 16px', fontSize: '0.86rem' }}
            />
            <button
              type="submit"
              className="kinetic-btn-primary"
              style={{ padding: '10px 18px', borderRadius: 'var(--radius-pill)' }}
            >
              <Send size={16} />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  if (isInline) return contentUI;

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
      {contentUI}
    </div>
  );
};

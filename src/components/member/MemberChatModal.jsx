import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import {
  X,
  Send,
  Paperclip,
  Video,
  CheckCheck,
  Sparkles,
  Search,
  Users
} from 'lucide-react';

const CONTACTS = [
  {
    id: 'trn_1',
    name: 'Coach Marcus Vance',
    role: 'Head Strength Coach',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=150&auto=format&fit=crop',
    status: 'online',
    program: 'Hypertrophy Push/Pull/Legs',
    nextAssessment: 'Monday 9:00 AM',
    unread: 0,
    initialMessages: [
      {
        id: 'msg_m1',
        sender: 'trainer',
        senderName: 'Coach Marcus Vance',
        text: "Hey Alex! Great job completing Hypertrophy Push Day A earlier today. How did the barbell bench top sets feel on the shoulders?",
        time: '2:15 PM',
        isFormVideo: false
      },
      {
        id: 'msg_m2',
        sender: 'member',
        senderName: 'Alex Mercer',
        text: 'Felt solid! Managed 90kg for 6 reps clean. Elbow tuck felt much more natural with the cue you gave on Monday.',
        time: '2:18 PM',
        isFormVideo: false
      },
      {
        id: 'msg_m3',
        sender: 'trainer',
        senderName: 'Coach Marcus Vance',
        text: 'Outstanding progression. I reviewed your telemetry — progressive overload is up 6.2% this month. On Friday we will ramp up incline fly volume.',
        time: '2:20 PM',
        isFormVideo: false
      }
    ]
  },
  {
    id: 'trn_2',
    name: 'Coach Sarah Jenkins',
    role: 'HIIT & Conditioning Lead',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop',
    status: 'online',
    program: 'High Intensity Conditioning',
    nextAssessment: 'Wednesday 4:30 PM',
    unread: 1,
    initialMessages: [
      {
        id: 'msg_s1',
        sender: 'trainer',
        senderName: 'Coach Sarah Jenkins',
        text: 'Alex, your heart rate recovery between sprint intervals was under 45 seconds yesterday! Excellent anaerobic endurance.',
        time: '11:30 AM',
        isFormVideo: false
      }
    ]
  },
  {
    id: 'trn_3',
    name: 'Coach David Lee',
    role: 'Olympic Lifting Specialist',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
    status: 'offline',
    program: 'Power & Explosive Clean/Snatch',
    nextAssessment: 'Friday 10:00 AM',
    unread: 0,
    initialMessages: [
      {
        id: 'msg_d1',
        sender: 'trainer',
        senderName: 'Coach David Lee',
        text: 'Whenever you want to test your snatch 1RM, let me know so I can reserve the Olympic lifting platform for you.',
        time: 'Yesterday',
        isFormVideo: false
      }
    ]
  },
  {
    id: 'sup_1',
    name: 'StriveX Front Desk & Ops',
    role: 'Facility Operations & Booking',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop',
    status: 'online',
    program: 'Member Facility Access & Lockers',
    nextAssessment: '24/7 Service',
    unread: 0,
    initialMessages: [
      {
        id: 'msg_f1',
        sender: 'trainer',
        senderName: 'StriveX Operations',
        text: 'Welcome to StriveX! Your digital access pass is active. Locker 42 is reserved under your profile.',
        time: '2 days ago',
        isFormVideo: false
      }
    ]
  }
];

export const MemberChatModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const messagesEndRef = useRef(null);

  const [activeContactId, setActiveContactId] = useState('trn_1');
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState(() => {
    const map = {};
    CONTACTS.forEach((c) => {
      map[c.id] = [...c.initialMessages];
    });
    return map;
  });

  const [inputMessage, setInputMessage] = useState('');
  const [isCoachTyping, setIsCoachTyping] = useState(false);

  const activeContact = CONTACTS.find((c) => c.id === activeContactId) || CONTACTS[0];
  const activeMessages = conversations[activeContactId] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, activeContactId, conversations, isCoachTyping]);

  if (!isOpen) return null;

  const filteredContacts = CONTACTS.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg = {
      id: `msg_${Date.now()}`,
      sender: 'member',
      senderName: user?.name || 'Alex Mercer',
      text: inputMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isFormVideo: false
    };

    setConversations((prev) => ({
      ...prev,
      [activeContactId]: [...(prev[activeContactId] || []), newMsg]
    }));
    setInputMessage('');

    // Trigger realistic automated coach reply
    setIsCoachTyping(true);
    setTimeout(() => {
      setIsCoachTyping(false);
      const coachReplies = [
        `Noted! I'll update your targets for our next session on ${activeContact.nextAssessment}.`,
        "Spot on! Make sure to stay on top of your hydration and recovery.",
        "Keep that intensity dialed in. Send over a quick video clip on your next set so I can review your bar path.",
        "Excellent execution. Your consistency score is leading the cohort this week!"
      ];
      const randomReply = coachReplies[Math.floor(Math.random() * coachReplies.length)];

      setConversations((prev) => ({
        ...prev,
        [activeContactId]: [
          ...(prev[activeContactId] || []),
          {
            id: `msg_${Date.now() + 1}`,
            sender: 'trainer',
            senderName: activeContact.name,
            text: randomReply,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isFormVideo: false
          }
        ]
      }));
    }, 1500);
  };

  const handleAttachVideo = () => {
    const videoMsg = {
      id: `msg_vid_${Date.now()}`,
      sender: 'member',
      senderName: user?.name || 'Alex Mercer',
      text: '📹 Attached: Lifting Form Check Video (HD 60fps) for technique analysis.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isFormVideo: true
    };

    setConversations((prev) => ({
      ...prev,
      [activeContactId]: [...(prev[activeContactId] || []), videoMsg]
    }));

    addToast({
      type: 'info',
      title: 'Form Video Attached',
      message: `Video footage sent to ${activeContact.name} for telemetry review`
    });

    setIsCoachTyping(true);
    setTimeout(() => {
      setIsCoachTyping(false);
      setConversations((prev) => ({
        ...prev,
        [activeContactId]: [
          ...(prev[activeContactId] || []),
          {
            id: `msg_${Date.now() + 2}`,
            sender: 'trainer',
            senderName: activeContact.name,
            text: '✅ Form analysis completed: Bar path is vertical and joint angles are optimal. Ready to progress weight next set!',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isFormVideo: false
          }
        ]
      }));
    }, 2000);
  };

  const handleBookVideoCall = () => {
    addToast({
      type: 'success',
      title: 'Consultation Scheduled',
      message: `1-on-1 Video Assessment booked with ${activeContact.name} for ${activeContact.nextAssessment}`
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9990,
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
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          background: 'var(--surface-elevated)',
          border: '1px solid var(--border-hover)',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* LEFT COLUMN: CONTACTS & CHAT ROSTER */}
        <div
          style={{
            background: 'var(--surface-input)',
            borderRight: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Contacts Header */}
          <div
            style={{
              padding: '18px 20px',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={18} color="var(--accent)" />
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Conversations
              </h4>
            </div>
            <span className="kinetic-badge" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
              {CONTACTS.length} STAFF
            </span>
          </div>

          {/* Search Box */}
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-subtle)' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--surface-elevated)',
                border: '1px solid var(--border-glass)'
              }}
            >
              <Search size={14} color="var(--text-tertiary)" />
              <input
                type="text"
                placeholder="Search trainers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '0.82rem',
                  width: '100%'
                }}
              />
            </div>
          </div>

          {/* Contact List */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {filteredContacts.map((contact) => {
                const isActive = contact.id === activeContactId;
                const contactMsgs = conversations[contact.id] || [];
                const lastMsg = contactMsgs[contactMsgs.length - 1];

                return (
                  <button
                    key={contact.id}
                    type="button"
                    onClick={() => setActiveContactId(contact.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      borderRadius: 'var(--radius-md)',
                      background: isActive ? 'rgba(212, 255, 0, 0.12)' : 'transparent',
                      border: `1px solid ${isActive ? 'rgba(212, 255, 0, 0.3)' : 'transparent'}`,
                      textAlign: 'left',
                      width: '100%',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    {/* Avatar with status indicator */}
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: isActive ? '2px solid var(--accent)' : '1px solid var(--border-subtle)'
                        }}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          width: '9px',
                          height: '9px',
                          borderRadius: '50%',
                          background: contact.status === 'online' ? 'var(--status-success)' : 'var(--text-tertiary)',
                          border: '2px solid var(--bg-primary)'
                        }}
                      />
                    </div>

                    {/* Name and last snippet */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span
                          style={{
                            fontSize: '0.86rem',
                            fontWeight: 700,
                            color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {contact.name}
                        </span>
                        {contact.unread > 0 && (
                          <span
                            style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              background: 'var(--accent)',
                              boxShadow: '0 0 6px var(--accent-glow)'
                            }}
                          />
                        )}
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
                        {lastMsg ? lastMsg.text : contact.role}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ACTIVE CONVERSATION */}
        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Header */}
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
              <img
                src={activeContact.avatar}
                alt={activeContact.name}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--accent)'
                }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {activeContact.name}
                  </h4>
                  <span
                    className="kinetic-badge"
                    style={{
                      fontSize: '0.68rem',
                      padding: '2px 8px',
                      background: activeContact.status === 'online' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.05)',
                      color: activeContact.status === 'online' ? 'var(--status-success)' : 'var(--text-tertiary)'
                    }}
                  >
                    {activeContact.status.toUpperCase()}
                  </span>
                </div>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                  {activeContact.role}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={handleBookVideoCall}
                className="kinetic-btn-secondary"
                style={{ padding: '8px 14px', fontSize: '0.8rem', fontWeight: 700 }}
                title="Schedule 1-on-1 Consultation"
              >
                <Video size={15} color="var(--accent)" />
                <span>Book Call</span>
              </button>

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
          </div>

          {/* Program Telemetry Header */}
          <div
            style={{
              padding: '8px 24px',
              background: 'var(--surface-input)',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.76rem'
            }}
          >
            <span style={{ color: 'var(--text-secondary)' }}>
              Focus: <strong style={{ color: 'var(--text-primary)' }}>{activeContact.program}</strong>
            </span>
            <span style={{ color: 'var(--text-secondary)' }}>
              Next Assessment: <strong style={{ color: 'var(--accent)' }}>{activeContact.nextAssessment}</strong>
            </span>
          </div>

          {/* Message Stream */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            {activeMessages.map((msg) => {
              const isMe = msg.sender === 'member';
              return (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isMe ? 'flex-end' : 'flex-start',
                    maxWidth: '82%',
                    alignSelf: isMe ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div
                    style={{
                      padding: '12px 18px',
                      borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                      background: isMe ? 'var(--accent)' : 'var(--surface-input)',
                      color: isMe ? '#111111' : 'var(--text-primary)',
                      border: `1px solid ${isMe ? 'var(--accent)' : 'var(--border-subtle)'}`,
                      fontSize: '0.88rem',
                      lineHeight: 1.5,
                      boxShadow: isMe ? '0 0 16px var(--accent-glow)' : 'none'
                    }}
                  >
                    {msg.isFormVideo ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
                        <Video size={16} />
                        <span>{msg.text}</span>
                      </div>
                    ) : (
                      msg.text
                    )}
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.7rem',
                      color: 'var(--text-tertiary)',
                      marginTop: '4px',
                      padding: '0 4px'
                    }}
                  >
                    <span>{msg.time}</span>
                    {isMe && <CheckCheck size={13} color="var(--accent)" />}
                  </div>
                </div>
              );
            })}

            {/* Coach Typing Indicator */}
            {isCoachTyping && (
              <div
                className="animate-fade-in"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  borderRadius: '16px',
                  background: 'var(--surface-input)',
                  border: '1px solid var(--border-subtle)',
                  width: 'fit-content',
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)'
                }}
              >
                <Sparkles size={14} color="var(--accent)" className="animate-pulse" />
                <span>{activeContact.name} is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Message Input Box */}
          <form
            onSubmit={handleSendMessage}
            style={{
              padding: '16px 24px',
              background: 'var(--surface-glass)',
              borderTop: '1px solid var(--border-glass)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <button
              type="button"
              onClick={handleAttachVideo}
              style={{
                padding: '10px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--surface-input)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title="Attach Form Check Video"
            >
              <Paperclip size={18} />
            </button>

            <input
              type="text"
              placeholder={`Message ${activeContact.name}...`}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              style={{
                flex: 1,
                padding: '12px 18px',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--surface-input)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />

            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="kinetic-btn-primary"
              style={{
                padding: '12px 20px',
                borderRadius: 'var(--radius-pill)',
                opacity: inputMessage.trim() ? 1 : 0.4
              }}
            >
              <Send size={16} />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

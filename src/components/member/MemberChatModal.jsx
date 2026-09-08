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
        text: 'Hi Alex! Your VO2 max cardiovascular recovery metrics on the Concept2 ergometer were top tier yesterday.',
        time: '11:00 AM',
        isFormVideo: false
      }
    ]
  },
  {
    id: 'trn_3',
    name: 'Dr. David Lee (DPT)',
    role: 'Sports Physical Therapist',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=150&auto=format&fit=crop',
    status: 'offline',
    program: 'Joint Mobility & Prehab',
    nextAssessment: 'Friday 2:00 PM',
    unread: 0,
    initialMessages: [
      {
        id: 'msg_d1',
        sender: 'trainer',
        senderName: 'Dr. David Lee',
        text: 'Mobility assessment results synced to your profile. Focus on thoracic spine extension twice daily.',
        time: 'Yesterday',
        isFormVideo: false
      }
    ]
  },
  {
    id: 'trn_4',
    name: 'StriveX Concierge HQ',
    role: 'Facility Operations',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    status: 'online',
    program: 'Member Services',
    nextAssessment: 'N/A',
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

export const MemberChatModal = ({ isOpen, onClose, isInline = false }) => {
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
    if (isOpen || isInline) {
      scrollToBottom();
    }
  }, [isOpen, isInline, activeContactId, conversations, isCoachTyping]);

  if (!isOpen && !isInline) return null;

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

    // Simulate trainer auto-reply
    setIsCoachTyping(true);
    setTimeout(() => {
      setIsCoachTyping(false);

      const replies = [
        `Got it! I will review this during our next session assessment.`,
        `Solid update! Keep pushing on that tempo and progressive overload.`,
        `Checked your telemetry stream. Everything looks optimal!`,
        `Great question! Make sure to prioritize post-workout hydration & protein.`
      ];

      const randomReplyText = replies[Math.floor(Math.random() * replies.length)];

      const coachReply = {
        id: `msg_${Date.now() + 1}`,
        sender: 'trainer',
        senderName: activeContact.name,
        text: randomReplyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isFormVideo: false
      };

      setConversations((prev) => ({
        ...prev,
        [activeContactId]: [...(prev[activeContactId] || []), coachReply]
      }));
    }, 1200);
  };

  const handleUploadFormVideo = () => {
    addToast({
      type: 'info',
      title: 'Uploading Form Clip...',
      message: 'Processing 1080p 60fps set video for AI biomechanics review...'
    });

    setTimeout(() => {
      const videoMsg = {
        id: `msg_${Date.now()}`,
        sender: 'member',
        senderName: user?.name || 'Alex Mercer',
        text: 'Uploaded Bench Press Set 3 (85kg × 8 reps) form check video.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isFormVideo: true,
        videoUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=400&auto=format&fit=crop'
      };

      setConversations((prev) => ({
        ...prev,
        [activeContactId]: [...(prev[activeContactId] || []), videoMsg]
      }));

      addToast({
        type: 'success',
        title: 'Video Uploaded to Mesh',
        message: `Sent to ${activeContact.name} for biomechanical annotation.`
      });
    }, 1500);
  };

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
      {/* Left Contacts Sidebar */}
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
        {/* Search header */}
        <div style={{ padding: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span className="type-eyebrow" style={{ fontSize: '0.68rem' }}>COACHING DIRECTORY</span>
            <span className="kinetic-badge" style={{ fontSize: '0.64rem', padding: '1px 6px' }}>
              ONLINE
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
              placeholder="Search coaches..."
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

        {/* Contacts list */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          {filteredContacts.map((contact) => {
            const isSelected = activeContactId === contact.id;
            const msgs = conversations[contact.id] || [];
            const lastMsg = msgs[msgs.length - 1];

            return (
              <div
                key={contact.id}
                onClick={() => setActiveContactId(contact.id)}
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
                    src={contact.avatar}
                    alt={contact.name}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: isSelected ? '2px solid var(--accent)' : '1px solid var(--border-subtle)'
                    }}
                  />
                  {contact.status === 'online' && (
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
                      {contact.name}
                    </h5>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>
                      {lastMsg ? lastMsg.time : ''}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.72rem', color: 'var(--accent)', fontWeight: 600 }}>
                    {contact.role}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Chat Column */}
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
              src={activeContact.avatar}
              alt={activeContact.name}
              style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--accent)' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                  {activeContact.name}
                </h4>
                <span className="kinetic-badge" style={{ fontSize: '0.64rem', padding: '1px 6px' }}>
                  {activeContact.role}
                </span>
              </div>
              <span className="type-caption" style={{ color: 'var(--text-tertiary)' }}>
                Program: <strong style={{ color: 'var(--text-secondary)' }}>{activeContact.program}</strong>
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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

        {/* Message Thread */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {activeMessages.map((msg) => {
            const isMember = msg.sender === 'member';
            return (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isMember ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginBottom: '3px', padding: '0 4px' }}>
                  {msg.senderName} • {msg.time}
                </div>

                <div
                  style={{
                    maxWidth: '75%',
                    padding: '12px 16px',
                    borderRadius: isMember ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: isMember ? 'var(--accent)' : 'var(--surface-input)',
                    color: isMember ? '#111111' : 'var(--text-primary)',
                    fontWeight: isMember ? 700 : 500,
                    fontSize: '0.88rem',
                    lineHeight: '1.4',
                    border: isMember ? 'none' : '1px solid var(--border-subtle)'
                  }}
                >
                  {msg.text}
                  {msg.isFormVideo && msg.videoUrl && (
                    <div style={{ marginTop: '8px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.2)' }}>
                      <img src={msg.videoUrl} alt="Form Video" style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isCoachTyping && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-tertiary)', fontSize: '0.78rem', fontStyle: 'italic' }}>
              <span>{activeContact.name} is typing feedback...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div style={{ padding: '16px 20px', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid var(--border-subtle)' }}>
          <form onSubmit={handleSendMessage} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={handleUploadFormVideo}
              className="kinetic-btn-ghost"
              style={{ padding: '10px', borderRadius: '50%' }}
              title="Attach Set Video Clip for Form Review"
            >
              <Paperclip size={18} color="var(--accent)" />
            </button>

            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Message ${activeContact.name}...`}
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

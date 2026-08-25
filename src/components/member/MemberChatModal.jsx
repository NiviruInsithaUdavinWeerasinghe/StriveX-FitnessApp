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
  Calendar,
  Dumbbell
} from 'lucide-react';

export const MemberChatModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const messagesEndRef = useRef(null);

  const [inputMessage, setInputMessage] = useState('');
  const [isCoachTyping, setIsCoachTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 'msg_1',
      sender: 'trainer',
      senderName: 'Coach Marcus Vance',
      text: "Hey Alex! Great job completing Hypertrophy Push Day A earlier today. How did the barbell bench top sets feel on the shoulders?",
      time: '2:15 PM',
      isFormVideo: false
    },
    {
      id: 'msg_2',
      sender: 'member',
      senderName: 'Alex Mercer',
      text: 'Felt solid! Managed 90kg for 6 reps clean. Elbow tuck felt much more natural with the cue you gave on Monday.',
      time: '2:18 PM',
      isFormVideo: false
    },
    {
      id: 'msg_3',
      sender: 'trainer',
      senderName: 'Coach Marcus Vance',
      text: 'Outstanding progression. I reviewed your telemetry — progressive overload is up 6.2% this month. On Friday we will ramp up incline fly volume.',
      time: '2:20 PM',
      isFormVideo: false
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages, isCoachTyping]);

  if (!isOpen) return null;

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

    setMessages((prev) => [...prev, newMsg]);
    setInputMessage('');

    // Trigger realistic automated coach reply
    setIsCoachTyping(true);
    setTimeout(() => {
      setIsCoachTyping(false);
      const coachReplies = [
        "Noted! I'll adjust your Friday routine targets to account for that feedback.",
        "Spot on. Make sure your hydration is over 3,000ml today to optimize muscular recovery.",
        "Keep that intensity dialed in. Send over a quick video clip on your next set of dips so I can audit your scapular retraction.",
        "Excellent execution. Your consistency score is leading the cohort this week!"
      ];
      const randomReply = coachReplies[Math.floor(Math.random() * coachReplies.length)];

      setMessages((prev) => [
        ...prev,
        {
          id: `msg_${Date.now() + 1}`,
          sender: 'trainer',
          senderName: 'Coach Marcus Vance',
          text: randomReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isFormVideo: false
        }
      ]);
    }, 1600);
  };

  const handleAttachVideo = () => {
    const videoMsg = {
      id: `msg_vid_${Date.now()}`,
      sender: 'member',
      senderName: user?.name || 'Alex Mercer',
      text: '📹 Attached: Bench Press Form Check (90kg × 6 reps) for technique analysis.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isFormVideo: true
    };
    setMessages((prev) => [...prev, videoMsg]);
    addToast({
      type: 'info',
      title: 'Form Video Attached',
      message: 'Video footage sent to Coach Marcus for telemetry review'
    });

    setIsCoachTyping(true);
    setTimeout(() => {
      setIsCoachTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg_${Date.now() + 2}`,
          sender: 'trainer',
          senderName: 'Coach Marcus Vance',
          text: '✅ Form analysis completed: Bar path is straight, wrist alignment is locked. Ready to load 92.5kg next cycle!',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isFormVideo: false
        }
      ]);
    }, 2000);
  };

  const handleBookVideoCall = () => {
    addToast({
      type: 'success',
      title: 'Consultation Scheduled',
      message: '1-on-1 Video Assessment booked with Coach Marcus for Monday at 9:00 AM'
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
          maxWidth: '720px',
          height: '84vh',
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
        {/* Header: Coach Status Bar */}
        <div
          style={{
            padding: '18px 24px',
            background: 'var(--surface-glass)',
            borderBottom: '1px solid var(--border-glass)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=150&auto=format&fit=crop"
                alt="Coach Marcus Vance"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--accent)'
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
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Coach Marcus Vance
                </h4>
                <span className="kinetic-badge" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                  ONLINE
                </span>
              </div>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                Head Strength & Hypertrophy Specialist
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={handleBookVideoCall}
              className="kinetic-btn-secondary"
              style={{ padding: '8px 14px', fontSize: '0.8rem', fontWeight: 700 }}
              title="Book Video Assessment"
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

        {/* Coach Telemetry Info Banner */}
        <div
          style={{
            padding: '10px 24px',
            background: 'var(--surface-input)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.78rem'
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
            <Dumbbell size={14} color="var(--accent)" />
            Assigned Program: <strong>Hypertrophy Push/Pull/Legs</strong>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
            <Calendar size={14} color="var(--status-info)" />
            Next Assessment: <strong>Monday 9:00 AM</strong>
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
          {messages.map((msg) => {
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
                    padding: '14px 18px',
                    borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: isMe ? 'var(--accent)' : 'var(--surface-input)',
                    color: isMe ? '#111111' : 'var(--text-primary)',
                    border: `1px solid ${isMe ? 'var(--accent)' : 'var(--border-subtle)'}`,
                    fontSize: '0.9rem',
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
              <span>Coach Marcus is typing...</span>
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
            placeholder="Ask Coach Marcus about routine, form cues, or nutrition..."
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
  );
};

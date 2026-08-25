import { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import {
  X,
  Video,
  Play,
  Pause,
  Activity,
  CheckCircle2,
  Plus,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  PhoneOff,
  Clock
} from 'lucide-react';

const CLIENT_TELEMETRY_DATA = {
  cli_1: {
    id: 'cli_1',
    name: 'Alex Mercer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    tier: 'Pro Athlete',
    goal: 'Hypertrophy',
    routine: 'Hypertrophy Push Day A',
    adherence: 96,
    weeklyVolumeKg: '45,200',
    estimatedBench1RM: '105 kg',
    avgHeartRate: '142 bpm (Zone 4)',
    formVideos: [
      {
        id: 'vid_1',
        title: 'Barbell Bench Press (Set 3 @ 85kg)',
        duration: '0:28',
        uploadedAt: '2 hours ago',
        thumbnail: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=400&auto=format&fit=crop',
        status: 'pending_review',
        annotations: [
          { time: '0:06', note: 'Slight elbow flare on descent. Bring elbows 5 degrees inward.' },
          { time: '0:14', note: 'Solid leg drive and scapular retraction maintained.' }
        ]
      }
    ]
  },
  cli_2: {
    id: 'cli_2',
    name: 'Kasun Fernando',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    tier: 'Elite Athlete',
    goal: 'Strength',
    routine: 'Maximal Strength 5×5',
    adherence: 92,
    weeklyVolumeKg: '58,400',
    estimatedBench1RM: '135 kg',
    avgHeartRate: '148 bpm (Zone 4)',
    formVideos: [
      {
        id: 'vid_2',
        title: 'Barbell Back Squat (Set 5 @ 140kg)',
        duration: '0:35',
        uploadedAt: 'Yesterday',
        thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=400&auto=format&fit=crop',
        status: 'approved',
        annotations: [
          { time: '0:10', note: 'Depth achieved below parallel. Spine neutral.' },
          { time: '0:22', note: 'Excellent hip drive on ascent.' }
        ]
      }
    ]
  },
  cli_4: {
    id: 'cli_4',
    name: 'Maya Lin',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop',
    tier: 'Elite Athlete',
    goal: 'Hypertrophy',
    routine: 'Upper / Lower Power',
    adherence: 98,
    weeklyVolumeKg: '52,100',
    estimatedBench1RM: '70 kg',
    avgHeartRate: '138 bpm (Zone 3)',
    formVideos: [
      {
        id: 'vid_3',
        title: 'Romanian Deadlift (RDL Set 3 @ 90kg)',
        duration: '0:30',
        uploadedAt: '3 hours ago',
        thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
        status: 'pending_review',
        annotations: [
          { time: '0:08', note: 'Great hamstring stretch. Keep bar glued to shins.' }
        ]
      }
    ]
  }
};

export const TrainerConsultationHubModal = ({ isOpen, onClose, defaultClient }) => {
  const { addToast } = useToast();

  const [activeClientId, setActiveClientId] = useState(defaultClient?.id || 'cli_1');
  const [activeTab, setActiveTab] = useState('telemetry'); // 'telemetry' | 'form_check' | 'live_call'
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [newAnnotationTime, setNewAnnotationTime] = useState('0:12');
  const [newAnnotationText, setNewAnnotationText] = useState('');

  // Live Consultation Call State
  const [isInCall, setIsInCall] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);

  const activeClient = CLIENT_TELEMETRY_DATA[activeClientId] || CLIENT_TELEMETRY_DATA.cli_1;
  const activeVideo = activeClient.formVideos[0] || null;

  if (!isOpen) return null;

  const handleAddAnnotation = (e) => {
    e.preventDefault();
    if (!newAnnotationText.trim()) return;

    if (activeVideo) {
      activeVideo.annotations.push({
        time: newAnnotationTime,
        note: newAnnotationText.trim()
      });
    }

    setNewAnnotationText('');
    addToast({
      type: 'success',
      title: 'Biomechanics Cue Added',
      message: `Timestamped cue logged at ${newAnnotationTime} for ${activeClient.name}`
    });
  };

  const handleApproveForm = () => {
    if (activeVideo) {
      activeVideo.status = 'approved';
      addToast({
        type: 'success',
        title: 'Form Assessment Approved',
        message: `${activeVideo.title} approved. Athlete notified.`
      });
    }
  };

  const handleStartCall = () => {
    setIsInCall(true);
    setActiveTab('live_call');
    addToast({
      type: 'success',
      title: 'Connected to 1-on-1 Video Consultation',
      message: `HD stream active with ${activeClient.name}`
    });
  };

  const handleEndCall = () => {
    setIsInCall(false);
    setActiveTab('telemetry');
    addToast({
      type: 'info',
      title: 'Consultation Concluded',
      message: `Session summary telemetry logged with ${activeClient.name}`
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
        background: 'rgba(0, 0, 0, 0.92)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div
        className="kinetic-card animate-scale-up"
        style={{
          width: '100%',
          maxWidth: '1080px',
          height: '90vh',
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
              <Activity size={18} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="type-eyebrow">COACH TELEMETRY & CONSULTATION HUB</span>
                <span className="kinetic-badge" style={{ fontSize: '0.66rem', padding: '1px 6px' }}>
                  {activeClient.tier}
                </span>
              </div>
              <h3 className="type-h3" style={{ fontSize: '1.15rem', margin: 0, whiteSpace: 'nowrap' }}>
                {activeClient.name} • Biometrics Hub
              </h3>
            </div>
          </div>

          {/* Tab Navigation Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <button
              type="button"
              onClick={() => setActiveTab('telemetry')}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-pill)',
                background: activeTab === 'telemetry' ? 'var(--accent)' : 'var(--surface-input)',
                color: activeTab === 'telemetry' ? '#111111' : 'var(--text-secondary)',
                fontSize: '0.8rem',
                fontWeight: 800,
                border: '1px solid var(--border-subtle)',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                cursor: 'pointer'
              }}
            >
              Telemetry
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('form_check')}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-pill)',
                background: activeTab === 'form_check' ? 'var(--accent)' : 'var(--surface-input)',
                color: activeTab === 'form_check' ? '#111111' : 'var(--text-secondary)',
                fontSize: '0.8rem',
                fontWeight: 800,
                border: '1px solid var(--border-subtle)',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                cursor: 'pointer'
              }}
            >
              Video Checks ({activeClient.formVideos.length})
            </button>

            <button
              type="button"
              onClick={handleStartCall}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-pill)',
                background: isInCall ? 'var(--status-error)' : 'rgba(6, 182, 212, 0.2)',
                color: isInCall ? '#ffffff' : '#06b6d4',
                fontSize: '0.8rem',
                fontWeight: 800,
                border: '1px solid rgba(6, 182, 212, 0.4)',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <Video size={13} />
              <span>{isInCall ? 'In HD Call (Live)' : '1-on-1 HD Call'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '6px',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--surface-glass)',
                color: 'var(--text-secondary)',
                marginLeft: '6px',
                flexShrink: 0
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal 2-Column Body */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '260px 1fr', overflow: 'hidden' }}>
          {/* Left Athlete Client Selector Sidebar */}
          <div
            style={{
              borderRight: '1px solid var(--border-subtle)',
              background: 'var(--bg-secondary)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              overflowY: 'auto'
            }}
          >
            <div className="type-caption" style={{ fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>
              Assigned Athletes
            </div>

            {Object.values(CLIENT_TELEMETRY_DATA).map((cli) => (
              <button
                key={cli.id}
                type="button"
                onClick={() => {
                  setActiveClientId(cli.id);
                  if (isInCall) setIsInCall(false);
                }}
                style={{
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  background: activeClientId === cli.id ? 'var(--surface-elevated)' : 'transparent',
                  border: `1px solid ${activeClientId === cli.id ? 'var(--accent)' : 'transparent'}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <img
                  src={cli.avatar}
                  alt={cli.name}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: `1.5px solid ${activeClientId === cli.id ? 'var(--accent)' : 'var(--border-subtle)'}`
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {cli.name}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                    {cli.goal} • {cli.adherence}% Adherence
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right Workspace Main Content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
            {/* TAB 1: TELEMETRY ANALYTICS */}
            {activeTab === 'telemetry' && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* 4 Stat Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
                  <div className="kinetic-card" style={{ padding: '16px' }}>
                    <div className="type-caption">WEEKLY VOLUME</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 900, color: 'var(--accent)', marginTop: '4px' }}>
                      {activeClient.weeklyVolumeKg} kg
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--status-success)', marginTop: '2px' }}>
                      +8.4% progressive overload
                    </div>
                  </div>

                  <div className="kinetic-card" style={{ padding: '16px' }}>
                    <div className="type-caption">ESTIMATED 1RM BENCH</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '4px' }}>
                      {activeClient.estimatedBench1RM}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Linear trend line
                    </div>
                  </div>

                  <div className="kinetic-card" style={{ padding: '16px' }}>
                    <div className="type-caption">TRAINING HR PEAK</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 900, color: '#f59e0b', marginTop: '4px' }}>
                      {activeClient.avgHeartRate.split(' ')[0]}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {activeClient.avgHeartRate.split('(')[1]?.replace(')', '') || 'Zone 4'}
                    </div>
                  </div>

                  <div className="kinetic-card" style={{ padding: '16px' }}>
                    <div className="type-caption">ADHERENCE RATE</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 900, color: 'var(--status-success)', marginTop: '4px' }}>
                      {activeClient.adherence}%
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Top quartile compliance
                    </div>
                  </div>
                </div>

                {/* Program Card */}
                <div className="kinetic-card" style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h4 className="type-h4" style={{ margin: 0 }}>
                      Active Training Protocol: {activeClient.routine}
                    </h4>
                    <span className="type-caption" style={{ color: 'var(--accent)', fontWeight: 800 }}>
                      OVERLOAD PHASE 2
                    </span>
                  </div>
                  <p className="type-body" style={{ margin: 0 }}>
                    Targeting 4-day mechanical tension split with progressive resistance micro-cycles. Current phase focus is clavicular chest density and bar deceleration control.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2: VIDEO FORM-CHECK ASSESSMENT & ANNOTATION */}
            {activeTab === 'form_check' && activeVideo && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }}>
                  {/* Left Simulated Video Player */}
                  <div
                    style={{
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      position: 'relative',
                      background: '#000000',
                      border: '1px solid var(--border-subtle)',
                      aspectRatio: '16/10',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <img
                      src={activeVideo.thumbnail}
                      alt={activeVideo.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: isPlayingVideo ? 0.9 : 0.6 }}
                    />

                    {/* Play/Pause Overlay */}
                    <button
                      type="button"
                      onClick={() => setIsPlayingVideo((prev) => !prev)}
                      style={{
                        position: 'absolute',
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: 'var(--accent)',
                        color: '#111111',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 24px var(--accent-glow)',
                        cursor: 'pointer'
                      }}
                    >
                      {isPlayingVideo ? <Pause size={24} /> : <Play size={24} style={{ marginLeft: '3px' }} />}
                    </button>

                    {/* Video Duration & Status Pill */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        left: '12px',
                        right: '12px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '6px 12px',
                        background: 'rgba(0, 0, 0, 0.75)',
                        borderRadius: 'var(--radius-pill)',
                        fontSize: '0.76rem',
                        color: 'var(--text-primary)'
                      }}
                    >
                      <span>⏱ {activeVideo.duration} • Uploaded {activeVideo.uploadedAt}</span>
                      <span
                        style={{
                          fontWeight: 800,
                          color: activeVideo.status === 'approved' ? 'var(--status-success)' : 'var(--accent)'
                        }}
                      >
                        {activeVideo.status === 'approved' ? 'FORM APPROVED' : 'NEEDS COACH AUDIT'}
                      </span>
                    </div>
                  </div>

                  {/* Right Annotations & Cues List */}
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <h4 className="type-h4" style={{ margin: 0 }}>
                          Biomechanics Cues ({activeVideo.annotations.length})
                        </h4>
                        {activeVideo.status !== 'approved' && (
                          <button
                            type="button"
                            onClick={handleApproveForm}
                            className="kinetic-btn-primary"
                            style={{ padding: '4px 10px', fontSize: '0.74rem' }}
                          >
                            <CheckCircle2 size={13} /> Approve Form
                          </button>
                        )}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '220px', overflowY: 'auto' }}>
                        {activeVideo.annotations.map((ann, idx) => (
                          <div
                            key={idx}
                            style={{
                              padding: '10px 12px',
                              borderRadius: 'var(--radius-md)',
                              background: 'var(--surface-input)',
                              border: '1px solid var(--border-subtle)'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                              <Clock size={12} color="var(--accent)" />
                              <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--accent)' }}>
                                Timestamp {ann.time}
                              </span>
                            </div>
                            <div className="type-small" style={{ color: 'var(--text-primary)', margin: 0 }}>
                              {ann.note}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Add Annotation Input */}
                    <form onSubmit={handleAddAnnotation} style={{ marginTop: '12px' }}>
                      <div style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
                        <input
                          type="text"
                          value={newAnnotationTime}
                          onChange={(e) => setNewAnnotationTime(e.target.value)}
                          placeholder="0:15"
                          style={{
                            width: '60px',
                            padding: '6px',
                            borderRadius: '6px',
                            background: 'var(--surface-input)',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--accent)',
                            fontWeight: 800,
                            fontSize: '0.8rem',
                            textAlign: 'center'
                          }}
                        />
                        <input
                          type="text"
                          value={newAnnotationText}
                          onChange={(e) => setNewAnnotationText(e.target.value)}
                          placeholder="Add technique cue at this timestamp..."
                          style={{
                            flex: 1,
                            padding: '6px 10px',
                            borderRadius: '6px',
                            background: 'var(--surface-input)',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--text-primary)',
                            fontSize: '0.8rem'
                          }}
                        />
                      </div>
                      <button
                        type="submit"
                        className="kinetic-btn-secondary"
                        style={{ width: '100%', padding: '6px 12px', fontSize: '0.78rem', justifyContent: 'center' }}
                      >
                        <Plus size={13} /> Log Biomechanics Note
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: LIVE 1-ON-1 HD VIDEO CONSULTATION ROOM */}
            {activeTab === 'live_call' && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                    height: '320px',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden'
                  }}
                >
                  {/* Athlete Video Feed */}
                  <div
                    style={{
                      position: 'relative',
                      background: '#0a0a0a',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    <img
                      src={activeClient.avatar}
                      alt={activeClient.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '10px',
                        padding: '4px 10px',
                        background: 'rgba(0, 0, 0, 0.75)',
                        borderRadius: 'var(--radius-pill)',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        color: '#ffffff'
                      }}
                    >
                      {activeClient.name} (Remote Athlete)
                    </div>
                  </div>

                  {/* Coach Marcus Video Feed */}
                  <div
                    style={{
                      position: 'relative',
                      background: '#0a0a0a',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid var(--accent)'
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400&auto=format&fit=crop"
                      alt="Coach Marcus"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '10px',
                        padding: '4px 10px',
                        background: 'rgba(212, 255, 0, 0.9)',
                        color: '#111111',
                        borderRadius: 'var(--radius-pill)',
                        fontSize: '0.74rem',
                        fontWeight: 900
                      }}
                    >
                      Coach Marcus Vance (You)
                    </div>
                  </div>
                </div>

                {/* Call Controls Bar */}
                <div
                  style={{
                    padding: '12px 20px',
                    borderRadius: 'var(--radius-pill)',
                    background: 'var(--surface-input)',
                    border: '1px solid var(--border-glass)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--status-error)' }} />
                    <span className="type-caption" style={{ fontWeight: 800, color: 'var(--text-primary)' }}>
                      HD 1080p ENCRYPTED SESSION • 02:25
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setIsMicOn((prev) => !prev)}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: isMicOn ? 'var(--surface-elevated)' : 'var(--status-error)',
                        border: '1px solid var(--border-glass)',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                      title={isMicOn ? 'Mute Mic' : 'Unmute Mic'}
                    >
                      {isMicOn ? <Mic size={16} /> : <MicOff size={16} />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsCamOn((prev) => !prev)}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: isCamOn ? 'var(--surface-elevated)' : 'var(--status-error)',
                        border: '1px solid var(--border-glass)',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                      title={isCamOn ? 'Turn Off Camera' : 'Turn On Camera'}
                    >
                      {isCamOn ? <Camera size={16} /> : <CameraOff size={16} />}
                    </button>

                    <button
                      type="button"
                      onClick={handleEndCall}
                      style={{
                        padding: '0 16px',
                        borderRadius: 'var(--radius-pill)',
                        background: 'var(--status-error)',
                        color: '#ffffff',
                        fontSize: '0.8rem',
                        fontWeight: 800,
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <PhoneOff size={15} />
                      <span>End Consultation</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

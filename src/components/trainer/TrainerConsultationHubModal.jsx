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

export const TrainerConsultationHubModal = ({ isOpen, onClose, defaultClient, isInline = false }) => {
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

  if (!isOpen && !isInline) return null;

  const handleAddAnnotation = (e) => {
    e.preventDefault();
    if (!newAnnotationText.trim()) return;

    activeVideo?.annotations.push({
      time: newAnnotationTime,
      note: newAnnotationText
    });

    addToast({
      type: 'success',
      title: 'Telemetry Note Added',
      message: `Annotated video at timestamp ${newAnnotationTime}`
    });

    setNewAnnotationText('');
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

  const contentUI = (
    <div
      className={isInline ? 'kinetic-card' : 'kinetic-card animate-scale-up'}
      style={{
        width: '100%',
        maxWidth: isInline ? '100%' : '1080px',
        height: isInline ? '100%' : '90vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--surface-elevated)',
        border: '1px solid var(--border-hover)',
        borderRadius: isInline ? 'var(--radius-lg)' : 'var(--radius-xl)',
        overflow: 'hidden',
        boxShadow: isInline ? 'none' : 'var(--shadow-lg)'
      }}
      onClick={(e) => isInline ? null : e.stopPropagation()}
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
            <Video size={18} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="type-eyebrow">HIGH PERFORMANCE CONSULTATION HUB</span>
              <span className="kinetic-badge" style={{ fontSize: '0.66rem', padding: '1px 6px' }}>
                LIVE MESH
              </span>
            </div>
            <h3 className="type-h3" style={{ fontSize: '1.2rem', margin: 0, whiteSpace: 'nowrap' }}>
              Athlete Telemetry & Video Review Suite
            </h3>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          {!isInCall ? (
            <button
              type="button"
              onClick={handleStartCall}
              className="kinetic-btn-primary"
              style={{ padding: '8px 14px', fontSize: '0.8rem' }}
            >
              <Video size={14} />
              <span>Launch 1-on-1 HD Call</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleEndCall}
              style={{
                padding: '8px 14px',
                borderRadius: 'var(--radius-pill)',
                background: '#ef4444',
                color: '#fff',
                fontWeight: 800,
                fontSize: '0.8rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <PhoneOff size={14} />
              <span>Disconnect Call</span>
            </button>
          )}

          {!isInline && onClose && (
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
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Sub Header Selector: Select Client */}
      <div
        style={{
          padding: '12px 24px',
          background: 'rgba(0,0,0,0.2)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          flexWrap: 'wrap'
        }}
      >
        {/* Client Roster Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
            Active Roster:
          </span>
          {Object.values(CLIENT_TELEMETRY_DATA).map((client) => {
            const isSel = activeClientId === client.id;
            return (
              <button
                key={client.id}
                type="button"
                onClick={() => {
                  setActiveClientId(client.id);
                  if (isInCall) handleEndCall();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-pill)',
                  background: isSel ? 'var(--accent)' : 'var(--surface-input)',
                  color: isSel ? '#111111' : 'var(--text-secondary)',
                  border: `1px solid ${isSel ? 'var(--accent)' : 'var(--border-subtle)'}`,
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                <img
                  src={client.avatar}
                  alt={client.name}
                  style={{ width: '18px', height: '18px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <span>{client.name}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Controls */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {[
            { id: 'telemetry', label: 'Biometric Telemetry' },
            { id: 'form_check', label: `Video Form Check (${activeClient.formVideos.length})` },
            { id: 'live_call', label: isInCall ? 'Live Call (Active)' : 'Video Consultation' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={activeTab === tab.id ? 'kinetic-btn-primary' : 'kinetic-btn-ghost'}
              style={{ padding: '6px 12px', fontSize: '0.78rem' }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        {/* TAB 1: TELEMETRY */}
        {activeTab === 'telemetry' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Header info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img
                src={activeClient.avatar}
                alt={activeClient.name}
                style={{ width: '54px', height: '54px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent)' }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 className="type-h3" style={{ fontSize: '1.2rem', margin: 0 }}>
                    {activeClient.name}
                  </h3>
                  <span className="kinetic-badge" style={{ fontSize: '0.68rem' }}>
                    {activeClient.tier}
                  </span>
                </div>
                <div className="type-caption">
                  Active Routine: <strong style={{ color: 'var(--text-primary)' }}>{activeClient.routine}</strong> • Adherence {activeClient.adherence}%
                </div>
              </div>
            </div>

            {/* Metrics Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              <div className="kinetic-card" style={{ padding: '24px', background: 'var(--surface-input)' }}>
                <span className="type-caption">Weekly Tonnage Volume</span>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--accent)', marginTop: '6px' }}>
                  {activeClient.weeklyVolumeKg} kg
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--status-success)', marginTop: '6px', fontWeight: 700 }}>
                  +12.4% vs last week average
                </div>
              </div>

              <div className="kinetic-card" style={{ padding: '24px', background: 'var(--surface-input)' }}>
                <span className="type-caption">Bench Press 1RM Projection</span>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: '#06b6d4', marginTop: '6px' }}>
                  {activeClient.estimatedBench1RM}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', marginTop: '6px' }}>
                  Calculated from 5-rep RPE 8 set
                </div>
              </div>

              <div className="kinetic-card" style={{ padding: '24px', background: 'var(--surface-input)' }}>
                <span className="type-caption">Live Telemetry Heart Rate</span>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--status-success)', marginTop: '6px' }}>
                  {activeClient.avgHeartRate}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', marginTop: '6px' }}>
                  WHOOP BLE Transceiver Sync
                </div>
              </div>
            </div>

            {/* Detailed Workout History & Set Progression Log */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', alignItems: 'start', marginTop: '12px' }}>
              {/* Recent Set Performance Logs */}
              <div className="kinetic-card" style={{ padding: '28px', background: 'var(--surface-input)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div>
                    <h4 className="type-h3" style={{ fontSize: '1.1rem', margin: 0 }}>Recent Workout Telemetry & Set Logs</h4>
                    <p className="type-caption" style={{ margin: '4px 0 0' }}>Real-time sensor data uploaded from athlete smart watch / WHOOP.</p>
                  </div>
                  <span className="kinetic-badge" style={{ padding: '4px 10px' }}>Live Sync</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { exercise: 'Barbell Bench Press', set: 'Set 1', load: '80 kg × 8 reps', rpe: 'RPE 7.5', tempo: '3-0-1-0' },
                    { exercise: 'Barbell Bench Press', set: 'Set 2', load: '85 kg × 8 reps', rpe: 'RPE 8.0', tempo: '3-0-1-0' },
                    { exercise: 'Barbell Bench Press', set: 'Set 3 (Top Set)', load: '85 kg × 8 reps', rpe: 'RPE 8.5', tempo: '3-0-1-0' },
                    { exercise: 'Incline Dumbbell Press', set: 'Set 1', load: '32 kg × 10 reps', rpe: 'RPE 8.0', tempo: '2-1-1-0' }
                  ].map((log, idx) => (
                    <div key={idx} style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)', background: 'var(--surface-elevated)', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)', display: 'block' }}>{log.exercise} ({log.set})</strong>
                        <span className="type-caption">Tempo: {log.tempo}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontWeight: 900, color: 'var(--accent)', fontSize: '0.95rem', display: 'block' }}>{log.load}</span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', fontWeight: 800 }}>{log.rpe}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Biomechanical Readiness & Fatigue Index */}
              <div className="kinetic-card" style={{ padding: '28px', background: 'var(--surface-input)' }}>
                <h4 className="type-h3" style={{ fontSize: '1.1rem', margin: '0 0 16px 0' }}>Biomechanics & Fatigue Index</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--surface-elevated)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="type-caption">Neuromuscular Fatigue</span>
                    <strong style={{ color: 'var(--status-success)', fontSize: '0.86rem' }}>Low (Optimal)</strong>
                  </div>
                  <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--surface-elevated)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="type-caption">Barbell Velocity Drop</span>
                    <strong style={{ color: 'var(--accent)', fontSize: '0.86rem' }}>-4.2% (Target &lt;10%)</strong>
                  </div>
                  <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--surface-elevated)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="type-caption">Scapular Symmetry</span>
                    <strong style={{ color: '#06b6d4', fontSize: '0.86rem' }}>98% Balance</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: VIDEO FORM CHECK */}
        {activeTab === 'form_check' && activeVideo && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px' }}>
            <div>
              <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-subtle)', background: '#000' }}>
                <img
                  src={activeVideo.thumbnail}
                  alt={activeVideo.title}
                  style={{ width: '100%', height: '360px', objectFit: 'cover', opacity: isPlayingVideo ? 0.9 : 0.7 }}
                />
                <button
                  type="button"
                  onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    color: '#111',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    border: 'none',
                    boxShadow: '0 0 20px rgba(212, 255, 0, 0.4)'
                  }}
                >
                  {isPlayingVideo ? <Pause size={24} /> : <Play size={24} style={{ marginLeft: '3px' }} />}
                </button>
              </div>

              <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                    {activeVideo.title}
                  </h4>
                  <span className="type-caption" style={{ color: 'var(--text-tertiary)' }}>
                    Uploaded {activeVideo.uploadedAt} • Duration {activeVideo.duration}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleApproveForm}
                  className="kinetic-btn-primary"
                  style={{ padding: '6px 14px', fontSize: '0.78rem' }}
                >
                  <CheckCircle2 size={14} />
                  <span>Approve Technique</span>
                </button>
              </div>
            </div>

            {/* Annotations sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h4 className="type-h3" style={{ fontSize: '1rem', margin: 0 }}>
                Biomechanical Annotations
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {activeVideo.annotations.map((ann, idx) => (
                  <div key={idx} style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--surface-input)', border: '1px solid var(--border-subtle)' }}>
                    <span className="kinetic-badge" style={{ fontSize: '0.68rem', marginBottom: '4px', display: 'inline-block' }}>
                      Timestamp {ann.time}
                    </span>
                    <p style={{ fontSize: '0.82rem', margin: 0, color: 'var(--text-secondary)' }}>
                      {ann.note}
                    </p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddAnnotation} style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={newAnnotationTime}
                    onChange={(e) => setNewAnnotationTime(e.target.value)}
                    className="kinetic-input"
                    style={{ width: '80px', padding: '6px 10px', fontSize: '0.78rem' }}
                  />
                  <input
                    type="text"
                    value={newAnnotationText}
                    onChange={(e) => setNewAnnotationText(e.target.value)}
                    placeholder="Add biomechanics note..."
                    className="kinetic-input"
                    style={{ flex: 1, padding: '6px 10px', fontSize: '0.78rem' }}
                  />
                </div>
                <button type="submit" className="kinetic-btn-secondary" style={{ padding: '6px', fontSize: '0.76rem', justifyContent: 'center' }}>
                  <Plus size={13} />
                  <span>Add Timestamp Annotation</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 3: LIVE CALL */}
        {activeTab === 'live_call' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '20px' }}>
            <div style={{ width: '100%', maxWidth: '720px', height: '400px', borderRadius: 'var(--radius-xl)', background: '#000', border: '1px solid var(--border-hover)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={activeClient.avatar}
                alt={activeClient.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: isCamOn ? 0.85 : 0.2 }}
              />
              <div style={{ position: 'absolute', bottom: '16px', left: '16px', background: 'rgba(0,0,0,0.6)', padding: '6px 12px', borderRadius: 'var(--radius-pill)', color: '#fff', fontSize: '0.8rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--status-success)' }} />
                <span>{activeClient.name} (HD 1080p Telemetry Stream)</span>
              </div>
            </div>

            {/* Call Controls */}
            <div style={{ display: 'flex', gap: '14px' }}>
              <button
                type="button"
                onClick={() => setIsMicOn(!isMicOn)}
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: isMicOn ? 'var(--surface-input)' : '#ef4444',
                  color: '#fff',
                  border: '1px solid var(--border-glass)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
              </button>
              <button
                type="button"
                onClick={() => setIsCamOn(!isCamOn)}
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: isCamOn ? 'var(--surface-input)' : '#ef4444',
                  color: '#fff',
                  border: '1px solid var(--border-glass)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                {isCamOn ? <Camera size={20} /> : <CameraOff size={20} />}
              </button>
              <button
                type="button"
                onClick={handleEndCall}
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: '#ef4444',
                  color: '#fff',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <PhoneOff size={20} />
              </button>
            </div>
          </div>
        )}
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
        background: 'rgba(0, 0, 0, 0.92)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        padding: '16px'
      }}
      onClick={onClose}
    >
      {contentUI}
    </div>
  );
};

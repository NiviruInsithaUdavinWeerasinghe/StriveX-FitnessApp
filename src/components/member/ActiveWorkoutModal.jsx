import { useState, useEffect } from 'react';
import { useToast } from '../../context/ToastContext';
import {
  X,
  Play,
  Pause,
  Clock,
  CheckCircle2,
  Trophy,
  Plus,
  FastForward,
  RotateCcw,
  Search,
  BookOpen
} from 'lucide-react';

const EXERCISE_DATABASE = [
  { id: 'lib_1', name: 'Barbell Overhead Press (OHP)', muscle: 'Shoulders & Upper Chest', image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=250&auto=format&fit=crop', defaultWeight: 50, defaultReps: 8 },
  { id: 'lib_2', name: 'Barbell Romanian Deadlift (RDL)', muscle: 'Hamstrings & Glutes', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=250&auto=format&fit=crop', defaultWeight: 100, defaultReps: 8 },
  { id: 'lib_3', name: 'Incline Dumbbell Bicep Curls', muscle: 'Biceps Long Head', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=250&auto=format&fit=crop', defaultWeight: 16, defaultReps: 12 },
  { id: 'lib_4', name: 'Weighted Pull-Ups', muscle: 'Latissimus Dorsi & Biceps', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=250&auto=format&fit=crop', defaultWeight: 10, defaultReps: 8 },
  { id: 'lib_5', name: 'Cable Tricep Rope Pushdowns', muscle: 'Triceps Lateral Head', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=250&auto=format&fit=crop', defaultWeight: 25, defaultReps: 15 },
  { id: 'lib_6', name: 'Leg Press 45°', muscle: 'Quadriceps & Glutes', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=250&auto=format&fit=crop', defaultWeight: 180, defaultReps: 10 }
];

export const ActiveWorkoutModal = ({ isOpen, onClose, onWorkoutCompleted, activeRoutine, isInline = false, isCoachPrescribed = false }) => {
  const { addToast } = useToast();

  // Workout live timer state
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Rest interval countdown timer state
  const [restSeconds, setRestSeconds] = useState(0);
  const [isRestActive, setIsRestActive] = useState(false);
  const [restPreset, setRestPreset] = useState(60);

  // Completed workout celebration summary modal
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  // Exercise library modal
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [librarySearch, setLibrarySearch] = useState('');

  // Active routine exercises and logged sets
  const [exercises, setExercises] = useState([]);

  // High-quality exercise image map matching workout types
  const EXERCISE_IMAGE_MAP = [
    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=250&auto=format&fit=crop', // Bench Press / Chest
    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=250&auto=format&fit=crop', // Incline DB Press
    'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=250&auto=format&fit=crop', // Lateral Raises / Delts
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=250&auto=format&fit=crop', // Dips / Pull-ups
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=250&auto=format&fit=crop'  // Squats / Deadlifts
  ];

  // Reset or load exercises whenever activeRoutine changes
  useEffect(() => {
    if (activeRoutine?.exercises) {
      setExercises(
        activeRoutine.exercises.map((ex, idx) => ({
          id: `ex_${idx + 1}`,
          name: ex.name,
          targetMuscle: ex.muscle || 'Target Muscle Group',
          image: ex.image || EXERCISE_IMAGE_MAP[idx % EXERCISE_IMAGE_MAP.length],
          sets: [
            { setNumber: 1, prevWeight: 75, prevReps: 10, weight: 75, reps: 10, completed: false },
            { setNumber: 2, prevWeight: 80, prevReps: 8, weight: 80, reps: 8, completed: false },
            { setNumber: 3, prevWeight: 85, prevReps: 8, weight: 85, reps: 8, completed: false }
          ]
        }))
      );
    }
  }, [activeRoutine]);

  // Main workout elapsed timer effect
  useEffect(() => {
    let interval = null;
    if ((isOpen || isInline) && isTimerRunning && !isSummaryOpen) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, isInline, isTimerRunning, isSummaryOpen]);

  // Rest timer countdown effect
  useEffect(() => {
    let restInterval = null;
    if (isRestActive && restSeconds > 0) {
      restInterval = setInterval(() => {
        setRestSeconds((prev) => {
          if (prev <= 1) {
            setIsRestActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(restInterval);
  }, [isRestActive, restSeconds]);

  if (!isOpen && !isInline) return null;

  // Format MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Toggle set completed state
  const handleToggleSet = (exIndex, setIndex) => {
    const updated = [...exercises];
    const targetSet = updated[exIndex].sets[setIndex];
    const nextStatus = !targetSet.completed;
    targetSet.completed = nextStatus;
    setExercises(updated);

    if (nextStatus) {
      setRestSeconds(restPreset);
      setIsRestActive(true);
    }
  };

  // Update weight or rep values
  const handleSetChange = (exIndex, setIndex, field, val) => {
    const num = Math.max(0, parseInt(val, 10) || 0);
    const updated = [...exercises];
    updated[exIndex].sets[setIndex][field] = num;
    setExercises(updated);
  };

  // Add extra set to exercise
  const handleAddSet = (exIndex) => {
    const updated = [...exercises];
    const currentSets = updated[exIndex].sets;
    const lastSet = currentSets[currentSets.length - 1];
    currentSets.push({
      setNumber: currentSets.length + 1,
      prevWeight: lastSet ? lastSet.weight : 50,
      prevReps: lastSet ? lastSet.reps : 10,
      weight: lastSet ? lastSet.weight : 50,
      reps: lastSet ? lastSet.reps : 10,
      completed: false
    });
    setExercises(updated);
  };

  // Add custom exercise from library
  const handleAddFromLibrary = (libItem) => {
    setExercises((prev) => [
      ...prev,
      {
        id: `ex_lib_${Date.now()}`,
        name: libItem.name,
        targetMuscle: libItem.muscle,
        image: libItem.image,
        sets: [
          { setNumber: 1, prevWeight: libItem.defaultWeight, prevReps: libItem.defaultReps, weight: libItem.defaultWeight, reps: libItem.defaultReps, completed: false },
          { setNumber: 2, prevWeight: libItem.defaultWeight, prevReps: libItem.defaultReps, weight: libItem.defaultWeight, reps: libItem.defaultReps, completed: false },
          { setNumber: 3, prevWeight: libItem.defaultWeight, prevReps: libItem.defaultReps, weight: libItem.defaultWeight, reps: libItem.defaultReps, completed: false }
        ]
      }
    ]);
    setIsLibraryOpen(false);
    addToast({
      type: 'info',
      title: 'Exercise Added',
      message: `${libItem.name} added to your active routine`
    });
  };

  // Calculate statistics
  let totalSetsCompleted = 0;
  let totalVolumeKg = 0;
  exercises.forEach((ex) => {
    ex.sets.forEach((s) => {
      if (s.completed) {
        totalSetsCompleted += 1;
        totalVolumeKg += s.weight * s.reps;
      }
    });
  });

  const handleFinishWorkout = () => {
    setIsSummaryOpen(true);
    setIsTimerRunning(false);
    setIsRestActive(false);
  };

  const handleConfirmCompletion = () => {
    const addedCalories = Math.max(220, Math.round(totalVolumeKg * 0.04));
    const addedMins = Math.max(15, Math.round(seconds / 60));

    if (onWorkoutCompleted) {
      onWorkoutCompleted({
        addedCalories,
        addedMins,
        totalVolumeKg,
        totalSets: totalSetsCompleted
      });
    }

    addToast({
      type: 'success',
      title: 'Workout Logged Successfully',
      message: `Burned +${addedCalories} kcal • ${totalVolumeKg.toLocaleString()} kg Total Volume Lifted`
    });

    setIsSummaryOpen(false);
    onClose();
  };

  const filteredLibrary = EXERCISE_DATABASE.filter(
    (item) =>
      item.name.toLowerCase().includes(librarySearch.toLowerCase()) ||
      item.muscle.toLowerCase().includes(librarySearch.toLowerCase())
  );

  const contentUI = (
    <div
      className={`${isInline ? 'kinetic-card active-workout-inline' : 'kinetic-card animate-scale-up'} active-workout-modal-container`}
      style={{
        width: '100%',
        maxWidth: isInline ? '100%' : '880px',
        height: isInline ? '560px' : 'auto',
        maxHeight: isInline ? '560px' : '92vh',
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
        {/* Modal Sticky Header */}
        <div
          className="active-workout-header"
          style={{
            padding: '20px 28px',
            background: 'var(--surface-glass)',
            borderBottom: '1px solid var(--border-glass)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  color: 'var(--accent)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em'
                }}
              >
                LIVE WORKOUT LOGGER
              </span>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontWeight: 900,
                color: 'var(--text-primary)',
                margin: 0
              }}
            >
              {activeRoutine?.title || 'Hypertrophy Routine'}
            </h3>
          </div>

          {/* Right Side: Live Timer or Start Button & Rest Presets */}
          <div className="active-workout-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {!hasStarted ? (
              <button
                type="button"
                onClick={() => {
                  setHasStarted(true);
                  setIsTimerRunning(true);
                }}
                className="kinetic-btn-primary"
                style={{ padding: '8px 18px', fontSize: '0.84rem', gap: '8px', boxShadow: '0 0 16px var(--accent-glow)' }}
              >
                <Play size={16} />
                <span>Start Workout Session</span>
              </button>
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '6px 16px',
                  borderRadius: 'var(--radius-pill)',
                  background: 'var(--surface-input)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <Clock size={16} color="var(--accent)" />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    minWidth: '60px'
                  }}
                >
                  {formatTime(seconds)}
                </span>
                <button
                  type="button"
                  onClick={() => setIsTimerRunning((prev) => !prev)}
                  style={{
                    padding: '4px',
                    color: isTimerRunning ? 'var(--status-warning)' : 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  title={isTimerRunning ? 'Pause Timer' : 'Resume Timer'}
                >
                  {isTimerRunning ? <Pause size={16} /> : <Play size={16} />}
                </button>
              </div>
            )}

            <div className="active-workout-rest-presets" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {[45, 60, 90].map((sec) => (
                <button
                  key={sec}
                  type="button"
                  onClick={() => setRestPreset(sec)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: 'var(--radius-pill)',
                    background: restPreset === sec ? 'var(--accent)' : 'var(--surface-input)',
                    color: restPreset === sec ? '#111111' : 'var(--text-secondary)',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    border: `1px solid ${restPreset === sec ? 'var(--accent)' : 'var(--border-subtle)'}`,
                    cursor: 'pointer'
                  }}
                >
                  {sec}s
                </button>
              ))}
            </div>

            {!isInline && onClose && (
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '6px',
                  borderRadius: 'var(--radius-pill)',
                  background: 'var(--surface-glass)',
                  color: 'var(--text-secondary)'
                }}
                title="Minimize Logger"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Floating / Docked Rest Interval Banner */}
        {isRestActive && (
          <div
            className="animate-slide-up active-workout-rest-banner"
            style={{
              padding: '12px 24px',
              background: 'rgba(212, 255, 0, 0.15)',
              borderBottom: '1px solid rgba(212, 255, 0, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              color: 'var(--accent)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <RotateCcw size={16} />
              <span style={{ fontSize: '0.88rem', fontWeight: 800 }}>
                REST INTERVAL COUNTDOWN: {formatTime(restSeconds)}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setRestSeconds((prev) => prev + 30)}
                style={{
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-pill)',
                  background: 'var(--surface-elevated)',
                  border: '1px solid var(--border-glass)',
                  color: 'var(--text-primary)',
                  fontSize: '0.76rem',
                  fontWeight: 700
                }}
              >
                +30s
              </button>
              <button
                type="button"
                onClick={() => setIsRestActive(false)}
                style={{
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-pill)',
                  background: 'var(--accent)',
                  color: '#111111',
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <FastForward size={12} /> Skip Rest
              </button>
            </div>
          </div>
        )}

        {/* Scrollable Exercise Logger List */}
        <div className="active-workout-scroll-body" style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {exercises.map((ex, exIndex) => (
              <div
                key={ex.id}
                className="active-workout-exercise-card"
                style={{
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--surface-input)',
                  border: '1px solid var(--border-subtle)',
                  padding: '20px'
                }}
              >
                <div
                  className="active-workout-exercise-header"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={ex.image}
                      alt={ex.name}
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '10px',
                        objectFit: 'cover'
                      }}
                    />
                    <div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        {ex.name}
                      </h4>
                      <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                        Target: {ex.targetMuscle}
                      </span>
                    </div>
                  </div>

                  <span className="kinetic-badge" style={{ fontSize: '0.72rem' }}>
                    {ex.sets.filter((s) => s.completed).length} / {ex.sets.length} Sets Done
                  </span>
                </div>

                {/* Desktop 7-Column Table View (> 900px) */}
                <div className="active-workout-table-wrapper active-workout-desktop-table">
                  <div className="active-workout-table-content">
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '60px 110px 120px 110px 110px 1fr 70px',
                        gap: '12px',
                        fontSize: '0.74rem',
                        fontWeight: 800,
                        color: 'var(--text-tertiary)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        padding: '0 12px 10px',
                        alignItems: 'center'
                      }}
                    >
                      <div style={{ textAlign: 'center' }}>SET</div>
                      <div>PREVIOUS</div>
                      <div style={{ textAlign: 'center' }}>WEIGHT (KG)</div>
                      <div style={{ textAlign: 'center' }}>TARGET REPS</div>
                      <div style={{ textAlign: 'center' }}>EST. VOLUME</div>
                      <div>INTENSITY / TEMPO</div>
                      <div style={{ textAlign: 'center' }}>ACTION</div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {ex.sets.map((set, setIndex) => {
                        const setVolume = (set.weight || 0) * (set.reps || 0);
                        const rpeTarget = setIndex === 0 ? 'RPE 7 (Warm-up)' : setIndex === ex.sets.length - 1 ? 'RPE 9.5 (Top Set)' : 'RPE 8.5 (Working)';
                        const rpeColor = setIndex === ex.sets.length - 1 ? '#ef4444' : setIndex === 0 ? '#3b82f6' : '#d4ff00';

                        return (
                          <div
                            key={setIndex}
                            style={{
                              display: 'grid',
                              gridTemplateColumns: '60px 110px 120px 110px 110px 1fr 70px',
                              gap: '12px',
                              alignItems: 'center',
                              padding: '10px 12px',
                              borderRadius: 'var(--radius-md)',
                              background: set.completed ? 'rgba(212, 255, 0, 0.08)' : 'var(--surface-glass)',
                              border: `1px solid ${set.completed ? 'rgba(212, 255, 0, 0.3)' : 'var(--border-subtle)'}`,
                              transition: 'all var(--transition-fast)'
                            }}
                          >
                            {/* SET NUMBER */}
                            <div style={{ textAlign: 'center' }}>
                              <span
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: '28px',
                                  height: '28px',
                                  borderRadius: '50%',
                                  background: set.completed ? 'var(--accent)' : 'var(--surface-input)',
                                  color: set.completed ? '#111' : 'var(--text-primary)',
                                  fontWeight: 900,
                                  fontSize: '0.82rem'
                                }}
                              >
                                {set.setNumber}
                              </span>
                            </div>

                            {/* PREVIOUS RECORD */}
                            <div
                              style={{
                                fontSize: '0.8rem',
                                color: 'var(--text-tertiary)',
                                fontFamily: 'var(--font-mono)'
                              }}
                            >
                              {set.prevWeight}kg × {set.prevReps}
                            </div>

                            {/* WEIGHT INPUT */}
                            <div>
                              <input
                                type="number"
                                value={set.weight}
                                onChange={(e) => handleSetChange(exIndex, setIndex, 'weight', e.target.value)}
                                readOnly={isCoachPrescribed}
                                style={{
                                  width: '100%',
                                  textAlign: 'center',
                                  padding: '8px 10px',
                                  borderRadius: 'var(--radius-md)',
                                  background: isCoachPrescribed ? 'rgba(255, 255, 255, 0.04)' : 'var(--surface-elevated)',
                                  border: `1px solid ${isCoachPrescribed ? 'rgba(255, 255, 255, 0.1)' : 'var(--border-hover)'}`,
                                  color: 'var(--accent)',
                                  fontWeight: 900,
                                  fontSize: '0.95rem',
                                  cursor: isCoachPrescribed ? 'default' : 'text'
                                }}
                              />
                            </div>

                            {/* REPS INPUT */}
                            <div>
                              <input
                                type="number"
                                value={set.reps}
                                onChange={(e) => handleSetChange(exIndex, setIndex, 'reps', e.target.value)}
                                readOnly={isCoachPrescribed}
                                style={{
                                  width: '100%',
                                  textAlign: 'center',
                                  padding: '8px 10px',
                                  borderRadius: 'var(--radius-md)',
                                  background: isCoachPrescribed ? 'rgba(255, 255, 255, 0.04)' : 'var(--surface-elevated)',
                                  border: `1px solid ${isCoachPrescribed ? 'rgba(255, 255, 255, 0.1)' : 'var(--border-hover)'}`,
                                  color: 'var(--text-primary)',
                                  fontWeight: 900,
                                  fontSize: '0.95rem',
                                  cursor: isCoachPrescribed ? 'default' : 'text'
                                }}
                              />
                            </div>

                            {/* EST VOLUME LOAD */}
                            <div style={{ textAlign: 'center' }}>
                              <span
                                style={{
                                  fontFamily: 'var(--font-mono)',
                                  fontSize: '0.85rem',
                                  fontWeight: 800,
                                  color: set.completed ? 'var(--accent)' : 'var(--text-secondary)'
                                }}
                              >
                                {setVolume > 0 ? `${setVolume.toLocaleString()} kg` : '—'}
                              </span>
                            </div>

                            {/* INTENSITY & TEMPO BADGE */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                              <span
                                style={{
                                  fontSize: '0.68rem',
                                  padding: '3px 8px',
                                  borderRadius: 'var(--radius-pill)',
                                  background: 'var(--surface-input)',
                                  color: rpeColor,
                                  border: `1px solid ${rpeColor}30`,
                                  fontWeight: 800,
                                  letterSpacing: '0.02em',
                                  whiteSpace: 'nowrap',
                                  display: 'inline-block'
                                }}
                              >
                                {rpeTarget}
                              </span>
                              <span
                                style={{
                                  fontSize: '0.7rem',
                                  color: 'var(--text-tertiary)',
                                  whiteSpace: 'nowrap',
                                  fontWeight: 600
                                }}
                              >
                                Tempo 3-1-X-1
                              </span>
                            </div>

                            {/* CHECKMARK COMPLETION BUTTON */}
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <button
                                type="button"
                                onClick={() => handleToggleSet(exIndex, setIndex)}
                                style={{
                                  width: '36px',
                                  height: '36px',
                                  borderRadius: '10px',
                                  background: set.completed ? 'var(--accent)' : 'var(--surface-elevated)',
                                  border: `1px solid ${set.completed ? 'var(--accent)' : 'var(--border-glass)'}`,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: set.completed ? '#111111' : 'var(--text-tertiary)',
                                  cursor: 'pointer',
                                  boxShadow: set.completed ? '0 0 14px var(--accent-glow)' : 'none',
                                  transition: 'all var(--transition-fast)'
                                }}
                                title={set.completed ? 'Mark incomplete' : 'Complete set'}
                              >
                                <CheckCircle2 size={20} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Mobile Set Cards (≤ 900px) */}
                <div className="active-workout-mobile-sets">
                  {ex.sets.map((set, setIndex) => {
                    const setVolume = (set.weight || 0) * (set.reps || 0);
                    const rpeTarget = setIndex === 0 ? 'RPE 7' : setIndex === ex.sets.length - 1 ? 'RPE 9.5 (Top)' : 'RPE 8.5';
                    const rpeColor = setIndex === ex.sets.length - 1 ? '#ef4444' : setIndex === 0 ? '#3b82f6' : 'var(--accent)';

                    return (
                      <div
                        key={setIndex}
                        className={`active-workout-mobile-set-card ${set.completed ? 'completed' : ''}`}
                      >
                        {/* Top line: Set Number, RPE badge, and Check Button */}
                        <div className="active-workout-mobile-set-header">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span className="active-workout-mobile-set-badge">
                              Set {set.setNumber}
                            </span>
                            <span
                              style={{
                                fontSize: '0.66rem',
                                padding: '2px 8px',
                                borderRadius: 'var(--radius-pill)',
                                background: 'var(--surface-input)',
                                color: rpeColor,
                                border: `1px solid ${rpeColor}30`,
                                fontWeight: 800
                              }}
                            >
                              {rpeTarget}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleToggleSet(exIndex, setIndex)}
                            className={`active-workout-mobile-check-btn ${set.completed ? 'completed' : ''}`}
                            title={set.completed ? 'Mark incomplete' : 'Complete set'}
                          >
                            <CheckCircle2 size={18} />
                          </button>
                        </div>

                        {/* Previous Benchmark Line */}
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', margin: '-2px 0 2px 0' }}>
                          Prev: {set.prevWeight}kg × {set.prevReps}
                        </div>

                        {/* Inputs row: Weight (kg), Reps, Est Volume */}
                        <div className="active-workout-mobile-set-inputs">
                          <div className="active-workout-mobile-input-field">
                            <label>WEIGHT (KG)</label>
                            <input
                              type="number"
                              value={set.weight}
                              onChange={(e) => handleSetChange(exIndex, setIndex, 'weight', e.target.value)}
                              readOnly={isCoachPrescribed}
                              className="active-workout-mobile-num-input"
                            />
                          </div>

                          <div className="active-workout-mobile-input-field">
                            <label>TARGET REPS</label>
                            <input
                              type="number"
                              value={set.reps}
                              onChange={(e) => handleSetChange(exIndex, setIndex, 'reps', e.target.value)}
                              readOnly={isCoachPrescribed}
                              className="active-workout-mobile-num-input"
                            />
                          </div>

                          <div className="active-workout-mobile-input-field">
                            <label>EST. VOLUME</label>
                            <div className="active-workout-mobile-volume-box">
                              {setVolume > 0 ? `${setVolume.toLocaleString()} kg` : '—'}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {!isCoachPrescribed && (
                  <button
                    type="button"
                    onClick={() => handleAddSet(exIndex)}
                    className="kinetic-btn-ghost"
                    style={{
                      marginTop: '12px',
                      fontSize: '0.78rem',
                      padding: '6px 12px',
                      width: '100%',
                      border: '1px dashed var(--border-glass)'
                    }}
                  >
                    <Plus size={14} /> Add Extra Set
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Add Exercise from Library CTA (Disabled for Coach-Prescribed Strict Telemetry) */}
          {!isCoachPrescribed && (
            <button
              type="button"
              onClick={() => setIsLibraryOpen(true)}
              className="kinetic-btn-secondary"
              style={{
                width: '100%',
                padding: '12px',
                marginTop: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <BookOpen size={16} />
              <span>+ Add Exercise from Movement Library</span>
            </button>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div
          className="active-workout-footer"
          style={{
            padding: '16px 28px',
            background: 'var(--surface-glass)',
            borderTop: '1px solid var(--border-glass)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}
        >
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Completed: <strong style={{ color: 'var(--text-primary)' }}>{totalSetsCompleted} sets</strong> • Volume:{' '}
            <strong style={{ color: 'var(--accent)' }}>{totalVolumeKg.toLocaleString()} kg</strong>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="button" onClick={onClose} className="kinetic-btn-ghost">
              Save & Exit
            </button>
            <button
              type="button"
              onClick={handleFinishWorkout}
              className="kinetic-btn-primary"
              style={{ padding: '12px 28px', fontWeight: 800 }}
            >
              Finish Workout Session
            </button>
          </div>
        </div>
      </div>
    );

  const libraryOverlay = isLibraryOpen && (
    <div
      className="animate-fade-in"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(10, 10, 10, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="kinetic-card animate-scale-up"
        style={{
          width: '100%',
          maxWidth: '560px',
          padding: '24px',
          background: 'var(--surface-elevated)',
          border: '1px solid var(--border-hover)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Movement Library
          </h4>
          <button type="button" onClick={() => setIsLibraryOpen(false)} style={{ color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        {/* Search Bar */}
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
            placeholder="Search exercises by name or muscle..."
            value={librarySearch}
            onChange={(e) => setLibrarySearch(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              width: '100%',
              fontSize: '0.86rem'
            }}
          />
        </div>

        {/* Exercises List */}
        <div style={{ maxHeight: '340px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filteredLibrary.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--surface-input)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {item.name}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                  {item.muscle} • Default: {item.defaultWeight}kg × {item.defaultReps}
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleAddFromLibrary(item)}
                className="kinetic-btn-primary"
                style={{ padding: '6px 14px', fontSize: '0.78rem' }}
              >
                + Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const summaryOverlay = isSummaryOpen && (
    <div
      className="animate-fade-in"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(15, 15, 15, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        textAlign: 'center'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="kinetic-card animate-scale-up"
        style={{
          maxWidth: '480px',
          width: '100%',
          padding: '36px 28px',
          background: 'var(--surface-elevated)',
          border: '2px solid var(--accent)',
          boxShadow: '0 0 40px var(--accent-glow)'
        }}
      >
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: '0 0 32px var(--accent)'
          }}
        >
          <Trophy size={38} color="#111111" />
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.8rem',
            fontWeight: 900,
            color: 'var(--text-primary)',
            marginBottom: '8px'
          }}
        >
          Workout Session Crushed!
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
          Your progressive overload telemetry has been logged and synchronized with {activeRoutine?.coach || 'Coach Marcus'}.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '10px',
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--surface-input)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '28px'
          }}
        >
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>TIME</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {formatTime(seconds)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>VOLUME</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent)' }}>
              {totalVolumeKg.toLocaleString()} kg
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>SETS</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--status-success)' }}>
              {totalSetsCompleted}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleConfirmCompletion}
          className="kinetic-btn-primary"
          style={{ width: '100%', padding: '14px', fontSize: '1rem', fontWeight: 800 }}
        >
          Synchronize & Return to Dashboard
        </button>
      </div>
    </div>
  );

  if (isInline) {
    return (
      <>
        {contentUI}
        {libraryOverlay}
        {summaryOverlay}
      </>
    );
  }

  return (
    <>
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
        {contentUI}
      </div>
      {libraryOverlay}
      {summaryOverlay}
    </>
  );
};

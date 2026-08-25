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

export const ActiveWorkoutModal = ({ isOpen, onClose, onWorkoutCompleted, activeRoutine }) => {
  const { addToast } = useToast();

  // Workout live timer state
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

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

  // Reset or load exercises whenever activeRoutine changes
  useEffect(() => {
    if (activeRoutine?.exercises) {
      setExercises(
        activeRoutine.exercises.map((ex, idx) => ({
          id: `ex_${idx + 1}`,
          name: ex.name,
          targetMuscle: ex.muscle || 'Target Muscle Group',
          image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=250&auto=format&fit=crop',
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
    if (isOpen && isTimerRunning && !isSummaryOpen) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, isTimerRunning, isSummaryOpen]);

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

  if (!isOpen) return null;

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
          maxWidth: '880px',
          maxHeight: '92vh',
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
        {/* Modal Sticky Header */}
        <div
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
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
              <span style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)' }}>
                • {activeRoutine?.title || 'Hypertrophy Program'}
              </span>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontWeight: 900,
                color: 'var(--text-primary)'
              }}
            >
              {activeRoutine?.title || 'Hypertrophy Routine'}
            </h3>
          </div>

          {/* Center: Live Timer Control */}
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
                alignItems: 'center'
              }}
              title={isTimerRunning ? 'Pause Timer' : 'Resume Timer'}
            >
              {isTimerRunning ? <Pause size={16} /> : <Play size={16} />}
            </button>
          </div>

          {/* Rest Preset Switcher & Close */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
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
                    border: '1px solid var(--border-glass)'
                  }}
                  title={`Set rest interval to ${sec}s`}
                >
                  {sec}s
                </button>
              ))}
            </div>

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
          </div>
        </div>

        {/* Floating / Docked Rest Interval Banner */}
        {isRestActive && (
          <div
            className="animate-slide-up"
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
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {exercises.map((ex, exIndex) => (
              <div
                key={ex.id}
                style={{
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--surface-input)',
                  border: '1px solid var(--border-subtle)',
                  padding: '20px'
                }}
              >
                <div
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

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '50px 90px 100px 100px 70px',
                    gap: '10px',
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    color: 'var(--text-tertiary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    padding: '0 8px 8px',
                    textAlign: 'center'
                  }}
                >
                  <div>SET</div>
                  <div>PREVIOUS</div>
                  <div>KG (WEIGHT)</div>
                  <div>REPS</div>
                  <div>CHECK</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {ex.sets.map((set, setIndex) => (
                    <div
                      key={setIndex}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '50px 90px 100px 100px 70px',
                        gap: '10px',
                        alignItems: 'center',
                        padding: '8px',
                        borderRadius: 'var(--radius-sm)',
                        background: set.completed ? 'rgba(212, 255, 0, 0.08)' : 'transparent',
                        border: `1px solid ${set.completed ? 'rgba(212, 255, 0, 0.25)' : 'var(--border-subtle)'}`,
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      <div
                        style={{
                          textAlign: 'center',
                          fontSize: '0.85rem',
                          fontWeight: 800,
                          color: 'var(--text-primary)'
                        }}
                      >
                        {set.setNumber}
                      </div>

                      <div
                        style={{
                          textAlign: 'center',
                          fontSize: '0.8rem',
                          color: 'var(--text-tertiary)',
                          fontFamily: 'var(--font-mono)'
                        }}
                      >
                        {set.prevWeight}kg × {set.prevReps}
                      </div>

                      <input
                        type="number"
                        value={set.weight}
                        onChange={(e) => handleSetChange(exIndex, setIndex, 'weight', e.target.value)}
                        style={{
                          width: '100%',
                          textAlign: 'center',
                          padding: '6px',
                          borderRadius: '6px',
                          background: 'var(--surface-elevated)',
                          border: '1px solid var(--border-glass)',
                          color: 'var(--text-primary)',
                          fontWeight: 700,
                          fontSize: '0.9rem'
                        }}
                      />

                      <input
                        type="number"
                        value={set.reps}
                        onChange={(e) => handleSetChange(exIndex, setIndex, 'reps', e.target.value)}
                        style={{
                          width: '100%',
                          textAlign: 'center',
                          padding: '6px',
                          borderRadius: '6px',
                          background: 'var(--surface-elevated)',
                          border: '1px solid var(--border-glass)',
                          color: 'var(--text-primary)',
                          fontWeight: 700,
                          fontSize: '0.9rem'
                        }}
                      />

                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button
                          type="button"
                          onClick={() => handleToggleSet(exIndex, setIndex)}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            background: set.completed ? 'var(--accent)' : 'var(--surface-elevated)',
                            border: `1px solid ${set.completed ? 'var(--accent)' : 'var(--border-glass)'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: set.completed ? '#111111' : 'var(--text-tertiary)',
                            cursor: 'pointer',
                            boxShadow: set.completed ? '0 0 12px var(--accent-glow)' : 'none',
                            transition: 'all var(--transition-fast)'
                          }}
                          title={set.completed ? 'Mark incomplete' : 'Complete set'}
                        >
                          <CheckCircle2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

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
              </div>
            ))}
          </div>

          {/* Add Exercise from Library CTA */}
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
        </div>

        {/* Modal Footer Controls */}
        <div
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

        {/* Exercise Library Modal Picker Overlay */}
        {isLibraryOpen && (
          <div
            className="animate-fade-in"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 999,
              background: 'rgba(10, 10, 10, 0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
            }}
          >
            <div
              className="kinetic-card animate-scale-up"
              style={{
                width: '100%',
                maxWidth: '560px',
                padding: '24px',
                background: 'var(--surface-elevated)',
                border: '1px solid var(--border-hover)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Movement Library
                </h4>
                <button type="button" onClick={() => setIsLibraryOpen(false)} style={{ color: 'var(--text-secondary)' }}>
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
              <div style={{ maxHeight: '280px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
        )}

        {/* Workout Complete Summary Modal Overlay */}
        {isSummaryOpen && (
          <div
            className="animate-fade-in"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1000,
              background: 'rgba(15, 15, 15, 0.96)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
              textAlign: 'center'
            }}
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
        )}
      </div>
    </div>
  );
};

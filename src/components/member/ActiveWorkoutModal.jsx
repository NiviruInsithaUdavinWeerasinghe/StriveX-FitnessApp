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
  RotateCcw
} from 'lucide-react';

export const ActiveWorkoutModal = ({ isOpen, onClose, onWorkoutCompleted }) => {
  const { addToast } = useToast();

  // Workout live timer state
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Rest interval countdown timer state
  const [restSeconds, setRestSeconds] = useState(0);
  const [isRestActive, setIsRestActive] = useState(false);

  // Completed workout celebration summary modal
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  // Active routine exercises and logged sets
  const [exercises, setExercises] = useState([
    {
      id: 'ex_1',
      name: 'Barbell Bench Press',
      targetMuscle: 'Pectorals & Triceps',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=250&auto=format&fit=crop',
      sets: [
        { setNumber: 1, prevWeight: 80, prevReps: 8, weight: 80, reps: 8, completed: false },
        { setNumber: 2, prevWeight: 85, prevReps: 8, weight: 85, reps: 8, completed: false },
        { setNumber: 3, prevWeight: 90, prevReps: 6, weight: 90, reps: 6, completed: false },
        { setNumber: 4, prevWeight: 90, prevReps: 6, weight: 90, reps: 6, completed: false }
      ]
    },
    {
      id: 'ex_2',
      name: 'Incline Dumbbell Flyes',
      targetMuscle: 'Clavicular Head',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=250&auto=format&fit=crop',
      sets: [
        { setNumber: 1, prevWeight: 22, prevReps: 12, weight: 22, reps: 12, completed: false },
        { setNumber: 2, prevWeight: 24, prevReps: 10, weight: 24, reps: 10, completed: false },
        { setNumber: 3, prevWeight: 24, prevReps: 10, weight: 24, reps: 10, completed: false }
      ]
    },
    {
      id: 'ex_3',
      name: 'Cable Lateral Raises',
      targetMuscle: 'Lateral Deltoids',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=250&auto=format&fit=crop',
      sets: [
        { setNumber: 1, prevWeight: 12, prevReps: 15, weight: 12, reps: 15, completed: false },
        { setNumber: 2, prevWeight: 14, prevReps: 15, weight: 14, reps: 15, completed: false },
        { setNumber: 3, prevWeight: 14, prevReps: 12, weight: 14, reps: 12, completed: false }
      ]
    },
    {
      id: 'ex_4',
      name: 'Weighted Chest Dips',
      targetMuscle: 'Lower Pectorals & Triceps',
      image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=250&auto=format&fit=crop',
      sets: [
        { setNumber: 1, prevWeight: 15, prevReps: 10, weight: 15, reps: 10, completed: false },
        { setNumber: 2, prevWeight: 20, prevReps: 8, weight: 20, reps: 8, completed: false },
        { setNumber: 3, prevWeight: 20, prevReps: 8, weight: 20, reps: 8, completed: false }
      ]
    }
  ]);

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
      setRestSeconds(60);
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
          maxWidth: '860px',
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
              <span style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)' }}>• Push Day A</span>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontWeight: 900,
                color: 'var(--text-primary)'
              }}
            >
              Hypertrophy Push Day A
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

          {/* Close Action */}
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
                Your progressive overload telemetry has been logged and synchronized with Coach Marcus.
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

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Check, 
  Clock, 
  Dumbbell, 
  Flame, 
  Trophy, 
  Sparkles,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { TODAY_ROUTINE_EXERCISES } from '../../data/mockData';
import { useToast } from '../../context/ToastContext';
import './ActiveWorkoutModal.css';

export const ActiveWorkoutModal = ({ isOpen, onClose, onFinishWorkout }) => {
  const { showToast } = useToast();
  const [exercises, setExercises] = useState(TODAY_ROUTINE_EXERCISES);
  const [activeSeconds, setActiveSeconds] = useState(140);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  
  // Rest Timer State
  const [restSecondsLeft, setRestSecondsLeft] = useState(0);
  const [isResting, setIsResting] = useState(false);

  // Summary Celebration Modal State
  const [isFinished, setIsFinished] = useState(false);

  // Session duration timer
  useEffect(() => {
    let interval = null;
    if (isOpen && isTimerRunning && !isFinished) {
      interval = setInterval(() => {
        setActiveSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, isTimerRunning, isFinished]);

  // Rest interval countdown
  useEffect(() => {
    let restInterval = null;
    if (isResting && restSecondsLeft > 0) {
      restInterval = setInterval(() => {
        setRestSecondsLeft(prev => {
          if (prev <= 1) {
            setIsResting(false);
            showToast({
              type: 'info',
              title: 'Rest Finished',
              message: 'Get ready for your next set!'
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(restInterval);
  }, [isResting, restSecondsLeft, showToast]);

  if (!isOpen) return null;

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const handleSetToggle = (exId, setIndex) => {
    setExercises(prev => prev.map(ex => {
      if (ex.id !== exId) return ex;
      const updatedSets = ex.sets.map((s, idx) => {
        if (idx === setIndex) {
          const nextCompleted = !s.completed;
          if (nextCompleted) {
            // Trigger rest timer
            setRestSecondsLeft(ex.targetRestSec || 60);
            setIsResting(true);
            showToast({
              type: 'success',
              title: 'Set Completed',
              message: `${ex.name} • Set ${s.setNum} logged (${s.weight}kg x ${s.reps} reps). Rest timer started.`
            });
          }
          return { ...s, completed: nextCompleted };
        }
        return s;
      });
      return { ...ex, sets: updatedSets };
    }));
  };

  const handleWeightChange = (exId, setIndex, newWeight) => {
    setExercises(prev => prev.map(ex => {
      if (ex.id !== exId) return ex;
      const updatedSets = ex.sets.map((s, idx) => 
        idx === setIndex ? { ...s, weight: parseFloat(newWeight) || 0 } : s
      );
      return { ...ex, sets: updatedSets };
    }));
  };

  const handleRepsChange = (exId, setIndex, newReps) => {
    setExercises(prev => prev.map(ex => {
      if (ex.id !== exId) return ex;
      const updatedSets = ex.sets.map((s, idx) => 
        idx === setIndex ? { ...s, reps: parseInt(newReps, 10) || 0 } : s
      );
      return { ...ex, sets: updatedSets };
    }));
  };

  // Calculate volume
  let totalVolume = 0;
  let totalSetsCompleted = 0;
  let totalSets = 0;

  exercises.forEach(ex => {
    ex.sets.forEach(s => {
      totalSets += 1;
      if (s.completed) {
        totalSetsCompleted += 1;
        totalVolume += (s.weight * s.reps);
      }
    });
  });

  const handleCompleteSession = () => {
    setIsFinished(true);
    setIsTimerRunning(false);
  };

  const handleFinalizeAndClose = () => {
    const summaryData = {
      durationMinutes: Math.round(activeSeconds / 60) || 45,
      caloriesBurned: 420,
      totalVolumeKg: totalVolume,
      setsCompleted: totalSetsCompleted
    };
    showToast({
      type: 'success',
      title: 'Workout Logged',
      message: 'Great session! Dashboard biometric rings updated.'
    });
    if (onFinishWorkout) onFinishWorkout(summaryData);
    onClose();
  };

  return (
    <div className="workout-modal-backdrop" onClick={onClose}>
      <div className="workout-modal-container glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Modal Top Header */}
        <div className="workout-modal-header">
          <div className="workout-header-info">
            <div className="workout-active-badge">
              <span className="badge-pulse-dot" />
              <span>LIVE WORKOUT SESSION</span>
            </div>
            <h3 className="workout-modal-title">Hypertrophy Push Day A</h3>
          </div>

          <div className="workout-header-controls">
            {/* Live Duration Timer */}
            <div className="workout-live-timer glass-panel">
              <Clock size={16} className="timer-icon" />
              <span>{formatTime(activeSeconds)}</span>
              <button 
                className="timer-pause-btn"
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                title={isTimerRunning ? 'Pause Session' : 'Resume Session'}
              >
                {isTimerRunning ? <Pause size={14} /> : <Play size={14} />}
              </button>
            </div>

            <button className="auth-close-btn" onClick={onClose} aria-label="Close">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Floating Rest Countdown Banner */}
        {isResting && (
          <div className="rest-timer-banner glass-panel-glow">
            <div className="rest-timer-left">
              <RotateCcw size={16} className="rest-spin-icon" />
              <span>Rest Interval: <strong>{formatTime(restSecondsLeft)}</strong></span>
            </div>
            <div className="rest-timer-actions">
              <button className="btn btn-secondary btn-sm" onClick={() => setRestSecondsLeft(p => p + 30)}>
                +30s
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => setIsResting(false)}>
                Skip Rest
              </button>
            </div>
          </div>
        )}

        {/* Exercises List Body */}
        <div className="workout-modal-body">
          <div className="exercises-logger-list">
            {exercises.map((ex) => (
              <div key={ex.id} className="exercise-logger-card glass-panel">
                <div className="exercise-logger-header">
                  <div>
                    <h4 className="ex-card-title">{ex.name}</h4>
                    <span className="ex-card-muscle">{ex.muscleGroup}</span>
                  </div>
                  <span className="badge badge-primary">{ex.targetReps} reps • {ex.targetRestSec}s rest</span>
                </div>

                {/* Sets Table */}
                <div className="sets-logger-table">
                  <div className="sets-header-row">
                    <span className="col-set">SET</span>
                    <span className="col-weight">WEIGHT (KG)</span>
                    <span className="col-reps">REPS</span>
                    <span className="col-check">DONE</span>
                  </div>

                  {ex.sets.map((s, idx) => (
                    <div 
                      key={idx} 
                      className={`set-row ${s.completed ? 'is-completed' : ''}`}
                    >
                      <span className="col-set set-number">{s.setNum}</span>
                      <div className="col-weight">
                        <input
                          type="number"
                          className="set-input"
                          value={s.weight}
                          onChange={(e) => handleWeightChange(ex.id, idx, e.target.value)}
                        />
                      </div>
                      <div className="col-reps">
                        <input
                          type="number"
                          className="set-input"
                          value={s.reps}
                          onChange={(e) => handleRepsChange(ex.id, idx, e.target.value)}
                        />
                      </div>
                      <div className="col-check">
                        <button
                          type="button"
                          className={`set-check-btn ${s.completed ? 'checked' : ''}`}
                          onClick={() => handleSetToggle(ex.id, idx)}
                        >
                          <Check size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="workout-modal-footer">
          <div className="workout-summary-chips">
            <span>Volume: <strong>{totalVolume} kg</strong></span>
            <span>Sets: <strong>{totalSetsCompleted}/{totalSets}</strong></span>
          </div>

          <button 
            className="btn btn-primary btn-lg finish-session-btn"
            onClick={handleCompleteSession}
          >
            Complete Workout Session <Check size={18} />
          </button>
        </div>

        {/* 2. SUMMARY CELEBRATION MODAL OVERLAY */}
        {isFinished && (
          <div className="finish-modal-backdrop">
            <div className="finish-celebration-card glass-panel">
              <div className="trophy-circle-wrap">
                <Trophy size={42} className="trophy-gold" />
              </div>
              <h3>Workout Completed!</h3>
              <p>Outstanding effort, Alex. You crushed your Hypertrophy Push routine.</p>

              <div className="finish-stats-grid">
                <div className="finish-stat-box">
                  <span className="finish-stat-val">{formatTime(activeSeconds)}</span>
                  <span className="finish-stat-lbl">Active Duration</span>
                </div>
                <div className="finish-stat-box">
                  <span className="finish-stat-val">{totalVolume} kg</span>
                  <span className="finish-stat-lbl">Volume Lifted</span>
                </div>
                <div className="finish-stat-box">
                  <span className="finish-stat-val">~420 kcal</span>
                  <span className="finish-stat-lbl">Calories Burned</span>
                </div>
                <div className="finish-stat-box">
                  <span className="finish-stat-val">6 Days</span>
                  <span className="finish-stat-lbl">Streak Intact</span>
                </div>
              </div>

              <button 
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
                onClick={handleFinalizeAndClose}
              >
                Save & Return to Dashboard <Sparkles size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

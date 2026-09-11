import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { CustomDropdown } from '../ui/CustomDropdown';
import {
  X,
  Plus,
  Trash2,
  Dumbbell,
  Save,
  Search,
  BookOpen,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const MOVEMENT_LIBRARY = [
  { name: 'Barbell Bench Press', muscle: 'Pectorals & Triceps', defaultSets: 4, defaultReps: '8', defaultRest: 90, defaultRpe: 'RPE 8' },
  { name: 'Incline Dumbbell Press', muscle: 'Clavicular Upper Chest', defaultSets: 3, defaultReps: '10-12', defaultRest: 75, defaultRpe: 'RPE 8.5' },
  { name: 'Cable Lateral Raises', muscle: 'Lateral Deltoids', defaultSets: 4, defaultReps: '15', defaultRest: 60, defaultRpe: 'RPE 9' },
  { name: 'Weighted Chest Dips', muscle: 'Lower Chest & Triceps', defaultSets: 3, defaultReps: '10-12', defaultRest: 90, defaultRpe: 'RPE 8' },
  { name: 'Barbell Back Squat', muscle: 'Quadriceps & Glutes', defaultSets: 5, defaultReps: '5', defaultRest: 120, defaultRpe: 'RPE 8.5' },
  { name: 'Romanian Deadlift (RDL)', muscle: 'Hamstrings & Posterior', defaultSets: 4, defaultReps: '8', defaultRest: 90, defaultRpe: 'RPE 8' },
  { name: 'Lat Pulldown (Neutral Grip)', muscle: 'Latissimus Dorsi', defaultSets: 4, defaultReps: '10', defaultRest: 75, defaultRpe: 'RPE 8' },
  { name: 'Chest-Supported T-Bar Row', muscle: 'Mid-Back & Rhomboids', defaultSets: 4, defaultReps: '8-10', defaultRest: 90, defaultRpe: 'RPE 8.5' },
  { name: 'Incline Dumbbell Bicep Curls', muscle: 'Biceps Long Head', defaultSets: 3, defaultReps: '12', defaultRest: 60, defaultRpe: 'RPE 9' },
  { name: 'Cable Tricep Rope Pushdowns', muscle: 'Triceps Lateral Head', defaultSets: 3, defaultReps: '15', defaultRest: 60, defaultRpe: 'RPE 9' },
  { name: 'Overhead Barbell Press', muscle: 'Anterior Deltoids', defaultSets: 4, defaultReps: '8', defaultRest: 90, defaultRpe: 'RPE 8' },
  { name: 'Hanging Leg Raises', muscle: 'Abdominal Core', defaultSets: 4, defaultReps: '15', defaultRest: 45, defaultRpe: 'RPE 8.5' }
];

export const RoutineBuilderModal = ({ isOpen, onClose, targetClient, onSaveRoutine, isInline = false }) => {
  const { addToast } = useToast();
  const { publishRoutine } = useAuth();

  // Program Metadata State
  const [routineTitle, setRoutineTitle] = useState('Hypertrophy Push Day A (Overload Phase)');
  const [selectedSplit, setSelectedSplit] = useState('Push');
  const [assignedClient, setAssignedClient] = useState(targetClient?.name || 'Alex Mercer');
  const [targetDuration, setTargetDuration] = useState('50');
  const [coachNotes, setCoachNotes] = useState('Focus on controlled 3-second eccentrics on all compound lifts.');

  // Configured Exercises Sequence
  const [exercises, setExercises] = useState([
    {
      id: 'cfg_1',
      name: 'Barbell Bench Press',
      muscle: 'Pectorals & Triceps',
      sets: 4,
      reps: '8',
      rest: 90,
      rpe: 'RPE 8',
      cue: 'Tuck elbows at 45 degrees, drive through heels.'
    },
    {
      id: 'cfg_2',
      name: 'Incline Dumbbell Press',
      muscle: 'Clavicular Upper Chest',
      sets: 3,
      reps: '10',
      rest: 75,
      rpe: 'RPE 8.5',
      cue: 'Pause 1 second at chest stretch before contracting.'
    },
    {
      id: 'cfg_3',
      name: 'Cable Lateral Raises',
      muscle: 'Lateral Deltoids',
      sets: 4,
      reps: '15',
      rest: 60,
      rpe: 'RPE 9',
      cue: 'Slight forward lean, raise in scapular plane.'
    }
  ]);

  // Movement Picker Drawer State
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [libraryFilter, setLibraryFilter] = useState('');

  if (!isOpen && !isInline) return null;

  const handleUpdateExercise = (id, field, value) => {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === id ? { ...ex, [field]: value } : ex))
    );
  };

  const handleRemoveExercise = (id) => {
    setExercises((prev) => prev.filter((ex) => ex.id !== id));
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const updated = [...exercises];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    setExercises(updated);
  };

  const handleMoveDown = (index) => {
    if (index === exercises.length - 1) return;
    const updated = [...exercises];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    setExercises(updated);
  };

  const handleAddFromLibrary = (item) => {
    const newEx = {
      id: `cfg_${Date.now()}`,
      name: item.name,
      muscle: item.muscle,
      sets: item.defaultSets,
      reps: item.defaultReps,
      rest: item.defaultRest,
      rpe: item.defaultRpe,
      cue: 'Execute with strict tempo and biomechanical form.'
    };
    setExercises((prev) => [...prev, newEx]);
    setIsPickerOpen(false);
    addToast({
      type: 'info',
      title: 'Exercise Added to Sequence',
      message: `${item.name} added to ${routineTitle}`
    });
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (!routineTitle.trim()) {
      addToast({
        type: 'error',
        title: 'Routine Title Required',
        message: 'Please provide a descriptive program name.'
      });
      return;
    }

    const payload = {
      title: routineTitle.trim(),
      split: selectedSplit,
      client: assignedClient,
      duration: `${targetDuration} mins`,
      notes: coachNotes,
      exercises
    };

    if (onSaveRoutine) {
      onSaveRoutine(payload);
    }

    publishRoutine(payload);

    addToast({
      type: 'success',
      title: 'Routine Published & Synchronized',
      message: `Program assigned to ${assignedClient}. Telemetry updated in athlete hub.`
    });

    if (onClose) onClose();
  };

  const filteredLibrary = MOVEMENT_LIBRARY.filter(
    (item) =>
      item.name.toLowerCase().includes(libraryFilter.toLowerCase()) ||
      item.muscle.toLowerCase().includes(libraryFilter.toLowerCase())
  );

  const contentUI = (
    <div
      className={`${isInline ? 'kinetic-card' : 'kinetic-card animate-scale-up'} trainer-builder-card`}
      style={{
        width: '100%',
        maxWidth: isInline ? '100%' : '920px',
        maxHeight: isInline ? '100%' : '92vh',
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
      {/* Header */}
      <div
        className="trainer-builder-header"
        style={{
          padding: '20px 24px',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
          borderBottom: '1px solid var(--border-glass)',
          borderTopLeftRadius: isInline ? 'var(--radius-lg)' : 'var(--radius-xl)',
          borderTopRightRadius: isInline ? 'var(--radius-lg)' : 'var(--radius-xl)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          flexShrink: 0
        }}
      >
        <div className="trainer-builder-top-row" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', width: '100%' }}>
          <div className="trainer-builder-title-block" style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'rgba(212, 255, 0, 0.15)',
                border: '1px solid var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent)',
                flexShrink: 0
              }}
            >
              <Dumbbell size={20} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span className="type-eyebrow">PROGRAM TELEMETRY ARCHITECT</span>
                <span className="kinetic-badge" style={{ fontSize: '0.66rem', padding: '1px 6px' }}>
                  EXERCISE SEQUENCE
                </span>
              </div>
              <h3 className="type-h3" style={{ fontSize: '1.25rem', margin: 0, wordBreak: 'break-word' }}>
                Hypertrophy & Strength Program Builder
              </h3>
            </div>
          </div>

          {!isInline && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="trainer-builder-close-btn"
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
                cursor: 'pointer',
                flexShrink: 0
              }}
              title="Close modal"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <div className="trainer-builder-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            onClick={handlePublish}
            className="kinetic-btn-primary"
            style={{ padding: '8px 16px', fontSize: '0.84rem' }}
          >
            <Save size={15} />
            <span>Publish Program</span>
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="trainer-builder-body" style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Metadata Controls */}
        <div className="trainer-builder-meta-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div className="kinetic-input-group" style={{ margin: 0 }}>
            <label className="kinetic-label">Program Title *</label>
            <input
              type="text"
              value={routineTitle}
              onChange={(e) => setRoutineTitle(e.target.value)}
              className="kinetic-input"
            />
          </div>

          <div className="kinetic-input-group" style={{ margin: 0 }}>
            <label className="kinetic-label">Target Athlete *</label>
            <CustomDropdown
              options={['Alex Mercer', 'Kasun Fernando', 'Sarah Tan', 'Maya Lin', 'Ryan Patel']}
              value={assignedClient}
              onChange={setAssignedClient}
            />
          </div>

          <div className="kinetic-input-group" style={{ margin: 0 }}>
            <label className="kinetic-label">Movement Split</label>
            <CustomDropdown
              options={['Push', 'Pull', 'Legs', 'Upper Power', 'Lower Power', 'Full Body Conditioning']}
              value={selectedSplit}
              onChange={setSelectedSplit}
            />
          </div>

          <div className="kinetic-input-group" style={{ margin: 0 }}>
            <label className="kinetic-label">Target Session Duration (Mins)</label>
            <input
              type="number"
              value={targetDuration}
              onChange={(e) => setTargetDuration(e.target.value)}
              className="kinetic-input"
            />
          </div>
        </div>

        {/* Exercises List Header */}
        <div className="trainer-builder-sequence-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 className="type-h3" style={{ fontSize: '1.05rem', margin: 0 }}>
              Movement Sequence ({exercises.length} Drills)
            </h4>
            <span className="type-caption">Reorder or adjust volume targets per movement.</span>
          </div>

          <button
            type="button"
            onClick={() => setIsPickerOpen(true)}
            className="kinetic-btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.8rem' }}
          >
            <BookOpen size={14} color="var(--accent)" />
            <span>Add from Movement Library</span>
          </button>
        </div>

        {/* Exercise Sequence List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {exercises.map((ex, idx) => (
            <div
              key={ex.id}
              className="trainer-builder-exercise-card"
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--surface-input)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <div className="trainer-builder-exercise-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                <div className="trainer-builder-exercise-info-col" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', flex: 1, minWidth: 0 }}>
                  <div className="trainer-builder-order-buttons" style={{ display: 'flex', flexDirection: 'column', gap: '2px', flexShrink: 0, marginTop: '2px' }}>
                    <button
                      type="button"
                      onClick={() => handleMoveUp(idx)}
                      disabled={idx === 0}
                      style={{ background: 'none', border: 'none', color: idx === 0 ? 'var(--text-tertiary)' : 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveDown(idx)}
                      disabled={idx === exercises.length - 1}
                      style={{ background: 'none', border: 'none', color: idx === exercises.length - 1 ? 'var(--text-tertiary)' : 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}
                    >
                      <ArrowDown size={14} />
                    </button>
                  </div>
                  <div className="trainer-builder-exercise-title-wrap" style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontWeight: 800, color: 'var(--accent)', fontSize: '0.85rem', marginRight: '6px' }}>
                       #{idx + 1}
                    </span>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)', wordBreak: 'break-word' }}>{ex.name}</strong>
                    <div className="type-caption" style={{ color: 'var(--text-tertiary)', marginTop: '2px' }}>
                      {ex.muscle}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveExercise(ex.id)}
                  className="trainer-builder-delete-btn"
                  style={{ background: 'none', border: 'none', color: 'var(--status-danger)', cursor: 'pointer', opacity: 0.8, padding: '4px', flexShrink: 0 }}
                  title="Remove drill"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="trainer-builder-exercise-inputs" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                <div>
                  <label className="type-caption" style={{ display: 'block', marginBottom: '2px' }}>Sets</label>
                  <input
                    type="number"
                    value={ex.sets}
                    onChange={(e) => handleUpdateExercise(ex.id, 'sets', parseInt(e.target.value) || 1)}
                    className="kinetic-input"
                    style={{ padding: '6px 10px', fontSize: '0.82rem' }}
                  />
                </div>
                <div>
                  <label className="type-caption" style={{ display: 'block', marginBottom: '2px' }}>Target Reps</label>
                  <input
                    type="text"
                    value={ex.reps}
                    onChange={(e) => handleUpdateExercise(ex.id, 'reps', e.target.value)}
                    className="kinetic-input"
                    style={{ padding: '6px 10px', fontSize: '0.82rem' }}
                  />
                </div>
                <div>
                  <label className="type-caption" style={{ display: 'block', marginBottom: '2px' }}>Rest (Secs)</label>
                  <input
                    type="number"
                    value={ex.rest}
                    onChange={(e) => handleUpdateExercise(ex.id, 'rest', parseInt(e.target.value) || 0)}
                    className="kinetic-input"
                    style={{ padding: '6px 10px', fontSize: '0.82rem' }}
                  />
                </div>
                <div>
                  <label className="type-caption" style={{ display: 'block', marginBottom: '2px' }}>Target RPE</label>
                  <input
                    type="text"
                    value={ex.rpe}
                    onChange={(e) => handleUpdateExercise(ex.id, 'rpe', e.target.value)}
                    className="kinetic-input"
                    style={{ padding: '6px 10px', fontSize: '0.82rem' }}
                  />
                </div>
              </div>

              <div>
                <label className="type-caption" style={{ display: 'block', marginBottom: '2px' }}>Execution Cue / Tempo Note</label>
                <input
                  type="text"
                  value={ex.cue}
                  onChange={(e) => handleUpdateExercise(ex.id, 'cue', e.target.value)}
                  className="kinetic-input"
                  style={{ padding: '6px 10px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Coach Global Program Notes */}
        <div className="kinetic-input-group" style={{ margin: 0 }}>
          <label className="kinetic-label">Coach Program Instructions & Recovery Cues</label>
          <textarea
            rows={2}
            value={coachNotes}
            onChange={(e) => setCoachNotes(e.target.value)}
            className="kinetic-input"
            style={{ resize: 'none' }}
          />
        </div>
      </div>

      {/* Movement Library Picker Drawer */}
      {isPickerOpen && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            background: 'var(--surface-elevated)',
            display: 'flex',
            flexDirection: 'column',
            padding: '24px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 className="type-h3" style={{ fontSize: '1.2rem', margin: 0 }}>
              Movement Library Reference (StriveX Pro)
            </h3>
            <button type="button" onClick={() => setIsPickerOpen(false)} style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}>
              ✕
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderRadius: 'var(--radius-pill)', background: 'var(--surface-input)', border: '1px solid var(--border-subtle)', marginBottom: '16px' }}>
            <Search size={16} color="var(--text-tertiary)" />
            <input
              type="text"
              placeholder="Search exercise by muscle group or name..."
              value={libraryFilter}
              onChange={(e) => setLibraryFilter(e.target.value)}
              style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', width: '100%', fontSize: '0.86rem' }}
            />
          </div>

          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filteredLibrary.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--surface-input)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{item.name}</strong>
                  <div className="type-caption">{item.muscle} • Default {item.defaultSets}×{item.defaultReps}</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddFromLibrary(item)}
                  className="kinetic-btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.76rem' }}
                >
                  <Plus size={14} />
                  <span>Select</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  if (isInline) return contentUI;

  return (
    <div
      className="trainer-builder-overlay"
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

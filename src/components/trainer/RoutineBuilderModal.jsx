import { useState } from 'react';
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

export const RoutineBuilderModal = ({ isOpen, onClose, targetClient, onSaveRoutine }) => {
  const { addToast } = useToast();

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
      cue: 'Maintain 30-degree incline, full stretch at bottom.'
    },
    {
      id: 'cfg_3',
      name: 'Cable Lateral Raises',
      muscle: 'Lateral Deltoids',
      sets: 4,
      reps: '15',
      rest: 60,
      rpe: 'RPE 9',
      cue: 'Lead with elbows, slight forward torso lean.'
    }
  ]);

  // Exercise Library Picker State
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [libraryFilter, setLibraryFilter] = useState('');

  if (!isOpen) return null;

  const handleExerciseChange = (id, field, value) => {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === id ? { ...ex, [field]: value } : ex))
    );
  };

  const handleRemoveExercise = (id) => {
    if (exercises.length <= 1) {
      addToast({
        type: 'warning',
        title: 'Minimum Exercise Required',
        message: 'A program routine must contain at least 1 configured exercise.'
      });
      return;
    }
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

    addToast({
      type: 'success',
      title: 'Routine Published & Synchronized',
      message: `Program assigned to ${assignedClient}. Telemetry updated in athlete hub.`
    });

    onClose();
  };

  const filteredLibrary = MOVEMENT_LIBRARY.filter(
    (item) =>
      item.name.toLowerCase().includes(libraryFilter.toLowerCase()) ||
      item.muscle.toLowerCase().includes(libraryFilter.toLowerCase())
  );

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
      <div
        className="kinetic-card animate-scale-up"
        style={{
          width: '100%',
          maxWidth: '920px',
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
        {/* Header */}
        <div
          style={{
            padding: '20px 28px',
            background: 'var(--surface-glass)',
            borderBottom: '1px solid var(--border-glass)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div className="kinetic-badge">
                <Dumbbell size={13} />
                <span>COACH PROGRAM ARCHITECT</span>
              </div>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-tertiary)' }}>
                Target: {assignedClient}
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
              Interactive Routine & Periodization Builder
            </h3>
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
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Builder Form */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
          {/* Section 1: Routine Metadata Grid */}
          <div
            style={{
              padding: '20px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--surface-input)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
              <div className="kinetic-input-group" style={{ margin: 0 }}>
                <label className="kinetic-label">Routine Title *</label>
                <input
                  type="text"
                  value={routineTitle}
                  onChange={(e) => setRoutineTitle(e.target.value)}
                  className="kinetic-input"
                  placeholder="e.g. Upper Body Hypertrophy Focus"
                />
              </div>

              <div>
                <CustomDropdown
                  label="Target Athlete Client"
                  value={assignedClient}
                  onChange={(val) => setAssignedClient(val)}
                  options={[
                    { value: 'Alex Mercer', label: 'Alex Mercer (Pro Athlete)' },
                    { value: 'Kasun Fernando', label: 'Kasun Fernando (Elite)' },
                    { value: 'Sarah Tan', label: 'Sarah Tan (Pro Athlete)' },
                    { value: 'Maya Lin', label: 'Maya Lin (Elite)' },
                    { value: 'Ryan Patel', label: 'Ryan Patel (Starter)' }
                  ]}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <div>
                <CustomDropdown
                  label="Training Split Type"
                  value={selectedSplit}
                  onChange={(val) => setSelectedSplit(val)}
                  options={[
                    { value: 'Push', label: 'Push (Chest, Delts, Triceps)' },
                    { value: 'Pull', label: 'Pull (Lats, Upper Back, Biceps)' },
                    { value: 'Legs', label: 'Legs (Quads, Hamstrings, Calves)' },
                    { value: 'Upper', label: 'Upper Body Power' },
                    { value: 'Lower', label: 'Lower Body Hypertrophy' },
                    { value: 'Conditioning', label: 'Metabolic HIIT & Core' }
                  ]}
                />
              </div>

              <div className="kinetic-input-group" style={{ margin: 0 }}>
                <label className="kinetic-label">Estimated Duration (Mins)</label>
                <input
                  type="number"
                  value={targetDuration}
                  onChange={(e) => setTargetDuration(e.target.value)}
                  className="kinetic-input"
                />
              </div>

              <div className="kinetic-input-group" style={{ margin: 0 }}>
                <label className="kinetic-label">Program Complexity</label>
                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--surface-elevated)',
                    border: '1px solid var(--border-glass)',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    color: 'var(--accent)'
                  }}
                >
                  {exercises.length} Movements Sequence
                </div>
              </div>
            </div>

            <div className="kinetic-input-group" style={{ margin: 0 }}>
              <label className="kinetic-label">Coach Technique Notes & Cues for Athlete</label>
              <textarea
                value={coachNotes}
                onChange={(e) => setCoachNotes(e.target.value)}
                className="kinetic-input"
                rows={2}
                placeholder="Specific breathing cues, tempo instructions, or warm-up notes..."
              />
            </div>
          </div>

          {/* Section 2: Configured Exercise Sequence List */}
          <div style={{ marginBottom: '24px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px'
              }}
            >
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Configured Exercise Sequence ({exercises.length})
              </h4>
              <button
                type="button"
                onClick={() => setIsPickerOpen(true)}
                className="kinetic-btn-primary"
                style={{ padding: '8px 16px', fontSize: '0.82rem', fontWeight: 800 }}
              >
                <Plus size={15} /> + Add Movement from Library
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {exercises.map((ex, index) => (
                <div
                  key={ex.id}
                  style={{
                    padding: '20px',
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--surface-input)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px'
                  }}
                >
                  {/* Top exercise row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          background: 'var(--surface-elevated)',
                          border: '1px solid var(--border-glass)',
                          color: 'var(--accent)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.85rem',
                          fontWeight: 900
                        }}
                      >
                        {index + 1}
                      </span>
                      <div>
                        <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                          {ex.name}
                        </span>
                        <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginLeft: '8px' }}>
                          Target: {ex.muscle}
                        </span>
                      </div>
                    </div>

                    {/* Order & Remove Actions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <button
                        type="button"
                        onClick={() => handleMoveUp(index)}
                        disabled={index === 0}
                        style={{
                          padding: '6px',
                          color: index === 0 ? 'var(--text-tertiary)' : 'var(--text-secondary)',
                          cursor: index === 0 ? 'default' : 'pointer'
                        }}
                        title="Move Up"
                      >
                        <ArrowUp size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveDown(index)}
                        disabled={index === exercises.length - 1}
                        style={{
                          padding: '6px',
                          color: index === exercises.length - 1 ? 'var(--text-tertiary)' : 'var(--text-secondary)',
                          cursor: index === exercises.length - 1 ? 'default' : 'pointer'
                        }}
                        title="Move Down"
                      >
                        <ArrowDown size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveExercise(ex.id)}
                        style={{ padding: '6px', color: 'var(--status-error)' }}
                        title="Remove Movement"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Sets / Reps / Rest / RPE Configuration Grid */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr 1fr',
                      gap: '12px',
                      background: 'var(--surface-elevated)',
                      padding: '12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-glass)'
                    }}
                  >
                    <div>
                      <label style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', fontWeight: 700 }}>
                        SETS
                      </label>
                      <input
                        type="number"
                        value={ex.sets}
                        onChange={(e) => handleExerciseChange(ex.id, 'sets', Number(e.target.value))}
                        style={{
                          width: '100%',
                          padding: '6px',
                          borderRadius: '6px',
                          background: 'var(--surface-input)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-primary)',
                          fontWeight: 700,
                          fontSize: '0.88rem'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', fontWeight: 700 }}>
                        REPS / TARGET
                      </label>
                      <input
                        type="text"
                        value={ex.reps}
                        onChange={(e) => handleExerciseChange(ex.id, 'reps', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '6px',
                          borderRadius: '6px',
                          background: 'var(--surface-input)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-primary)',
                          fontWeight: 700,
                          fontSize: '0.88rem'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', fontWeight: 700 }}>
                        REST (SECS)
                      </label>
                      <input
                        type="number"
                        value={ex.rest}
                        onChange={(e) => handleExerciseChange(ex.id, 'rest', Number(e.target.value))}
                        style={{
                          width: '100%',
                          padding: '6px',
                          borderRadius: '6px',
                          background: 'var(--surface-input)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-primary)',
                          fontWeight: 700,
                          fontSize: '0.88rem'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', fontWeight: 700 }}>
                        INTENSITY / RPE
                      </label>
                      <input
                        type="text"
                        value={ex.rpe}
                        onChange={(e) => handleExerciseChange(ex.id, 'rpe', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '6px',
                          borderRadius: '6px',
                          background: 'var(--surface-input)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--accent)',
                          fontWeight: 800,
                          fontSize: '0.88rem'
                        }}
                      />
                    </div>
                  </div>

                  {/* Form Cue Input */}
                  <div>
                    <input
                      type="text"
                      placeholder="Coach form cue (e.g. Pause 1-sec at chest before pressing)..."
                      value={ex.cue}
                      onChange={(e) => handleExerciseChange(ex.id, 'cue', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: 'var(--radius-sm)',
                        background: 'transparent',
                        border: '1px dashed var(--border-subtle)',
                        color: 'var(--text-secondary)',
                        fontSize: '0.82rem'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
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
          <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
            Program will synchronize live to <strong style={{ color: 'var(--accent)' }}>{assignedClient}</strong>'s dashboard.
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="button" onClick={onClose} className="kinetic-btn-ghost">
              Cancel
            </button>
            <button
              type="button"
              onClick={handlePublish}
              className="kinetic-btn-primary"
              style={{ padding: '12px 28px', fontWeight: 800 }}
            >
              <Save size={16} /> Publish & Sync to Athlete
            </button>
          </div>
        </div>

        {/* Movement Library Picker Modal Overlay */}
        {isPickerOpen && (
          <div
            className="animate-fade-in"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1000,
              background: 'rgba(8, 8, 8, 0.95)',
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
                maxWidth: '600px',
                padding: '28px',
                background: 'var(--surface-elevated)',
                border: '1px solid var(--border-hover)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BookOpen size={18} color="var(--accent)" />
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    Select Movement from Library
                  </h4>
                </div>
                <button type="button" onClick={() => setIsPickerOpen(false)} style={{ color: 'var(--text-secondary)' }}>
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
                  placeholder="Search movement name or targeted muscle group..."
                  value={libraryFilter}
                  onChange={(e) => setLibraryFilter(e.target.value)}
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

              {/* List */}
              <div style={{ maxHeight: '320px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {filteredLibrary.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--surface-input)',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                        {item.muscle} • Default: {item.defaultSets} sets × {item.defaultReps} reps ({item.defaultRpe})
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
      </div>
    </div>
  );
};

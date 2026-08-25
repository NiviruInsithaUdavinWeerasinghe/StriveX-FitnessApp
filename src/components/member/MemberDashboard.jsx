import React, { useState } from 'react';
import { 
  Flame, 
  Heart, 
  Clock, 
  TrendingUp, 
  Dumbbell, 
  Play, 
  Plus, 
  Minus, 
  Droplet, 
  CheckCircle2, 
  MessageSquare, 
  Settings, 
  Calendar, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { INITIAL_USER_PROFILE, TODAY_ROUTINE_EXERCISES } from '../../data/mockData';
import { useToast } from '../../context/ToastContext';
import './MemberDashboard.css';

export const MemberDashboard = ({ 
  onStartWorkout, 
  onOpenChat, 
  onOpenSettings,
  completedWorkoutData 
}) => {
  const { showToast } = useToast();
  const [profile, setProfile] = useState(INITIAL_USER_PROFILE);
  const [waterAmount, setWaterAmount] = useState(profile.stats.waterIntakeMl);
  const [calorieIntake, setCalorieIntake] = useState(1850);

  // Quick hydration adjustment
  const adjustWater = (delta) => {
    const next = Math.max(0, waterAmount + delta);
    setWaterAmount(next);
    showToast({
      type: 'info',
      title: 'Hydration Logged',
      message: `${delta > 0 ? '+' : ''}${delta}ml logged. Current: ${next}ml / ${profile.stats.waterGoalMl}ml`
    });
  };

  const adjustCalories = (delta) => {
    const next = Math.max(0, calorieIntake + delta);
    setCalorieIntake(next);
    showToast({
      type: 'info',
      title: 'Nutrition Logged',
      message: `${delta > 0 ? '+' : ''}${delta} kcal logged. Total today: ${next} kcal`
    });
  };

  // If a workout was completed just now, incorporate stats
  const activeCalories = profile.stats.caloriesBurned + (completedWorkoutData?.caloriesBurned || 0);
  const calPercent = Math.min(100, Math.round((activeCalories / profile.stats.calorieGoal) * 100));
  const activeMins = profile.stats.activeMinutes + (completedWorkoutData?.durationMinutes || 0);
  const minsPercent = Math.min(100, Math.round((activeMins / profile.stats.activeMinutesGoal) * 100));
  const workoutCount = profile.stats.workoutsCompletedThisWeek + (completedWorkoutData ? 1 : 0);
  const workoutPercent = Math.min(100, Math.round((workoutCount / profile.stats.weeklyWorkoutGoal) * 100));

  return (
    <div className="member-dashboard-root">
      {/* Top Banner / Athlete Profile Row */}
      <div className="member-top-banner glass-panel">
        <div className="athlete-info-left">
          <img src={profile.avatar} alt={profile.name} className="athlete-avatar" />
          <div className="athlete-title-box">
            <div className="athlete-name-row">
              <h2>{profile.name}</h2>
              <span className="badge badge-primary">{profile.tier}</span>
            </div>
            <p className="athlete-tagline">
              Assigned Coach: <strong>{profile.assignedTrainer.name}</strong> • {profile.assignedTrainer.specialty}
            </p>
          </div>
        </div>

        <div className="athlete-quick-actions">
          <button className="btn btn-secondary btn-sm" onClick={onOpenChat}>
            <MessageSquare size={16} /> Message Coach
          </button>
          <button className="btn btn-glass btn-sm" onClick={onOpenSettings}>
            <Settings size={16} /> Settings
          </button>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="member-dashboard-grid">
        {/* Left Column: Biometric KPIs & Triple Goal Rings */}
        <div className="dashboard-left-col">
          {/* KPI Stat Cards */}
          <div className="kpi-cards-grid">
            <div className="kpi-card glass-panel">
              <div className="kpi-card-header">
                <span className="kpi-label">Active Calories</span>
                <div className="kpi-icon-wrap flame">
                  <Flame size={18} />
                </div>
              </div>
              <div className="kpi-value-row">
                <span className="kpi-value">{activeCalories}</span>
                <span className="kpi-unit">/ {profile.stats.calorieGoal} kcal</span>
              </div>
              <div className="kpi-progress-bar">
                <div className="kpi-fill flame-fill" style={{ width: `${calPercent}%` }} />
              </div>
            </div>

            <div className="kpi-card glass-panel">
              <div className="kpi-card-header">
                <span className="kpi-label">Heart Rate Avg</span>
                <div className="kpi-icon-wrap heart">
                  <Heart size={18} />
                </div>
              </div>
              <div className="kpi-value-row">
                <span className="kpi-value">{profile.stats.heartRateAvg}</span>
                <span className="kpi-unit">bpm (Max {profile.stats.heartRateMax})</span>
              </div>
              <div className="kpi-meta-text">Zone 4 Hypertrophy Range</div>
            </div>

            <div className="kpi-card glass-panel">
              <div className="kpi-card-header">
                <span className="kpi-label">Training Duration</span>
                <div className="kpi-icon-wrap clock">
                  <Clock size={18} />
                </div>
              </div>
              <div className="kpi-value-row">
                <span className="kpi-value">{activeMins}</span>
                <span className="kpi-unit">/ {profile.stats.activeMinutesGoal} mins</span>
              </div>
              <div className="kpi-progress-bar">
                <div className="kpi-fill clock-fill" style={{ width: `${minsPercent}%` }} />
              </div>
            </div>

            <div className="kpi-card glass-panel">
              <div className="kpi-card-header">
                <span className="kpi-label">Active Streak</span>
                <div className="kpi-icon-wrap streak">
                  <Sparkles size={18} />
                </div>
              </div>
              <div className="kpi-value-row">
                <span className="kpi-value">{profile.streakDays}</span>
                <span className="kpi-unit">Days in a row</span>
              </div>
              <div className="kpi-meta-text">+1 Day to unlock Silver Badge</div>
            </div>
          </div>

          {/* SVG Animated Triple Goal Rings Card */}
          <div className="goal-rings-card glass-panel">
            <div className="rings-card-header">
              <div>
                <h3 className="rings-title">Daily Athletic Rings</h3>
                <p className="rings-subtitle">Caloric Burn, Active Time & Weekly Volume</p>
              </div>
              <span className="badge badge-success">88% Overall</span>
            </div>

            <div className="rings-visual-wrapper">
              <svg className="triple-rings-svg" viewBox="0 0 200 200">
                {/* Outer Ring: Calories */}
                <circle cx="100" cy="100" r="80" className="ring-track" />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  className="ring-progress ring-calories"
                  strokeDasharray="502.65"
                  strokeDashoffset={502.65 - (502.65 * calPercent) / 100}
                />

                {/* Middle Ring: Active Mins */}
                <circle cx="100" cy="100" r="62" className="ring-track" />
                <circle
                  cx="100"
                  cy="100"
                  r="62"
                  className="ring-progress ring-mins"
                  strokeDasharray="389.56"
                  strokeDashoffset={389.56 - (389.56 * minsPercent) / 100}
                />

                {/* Inner Ring: Weekly Frequency */}
                <circle cx="100" cy="100" r="44" className="ring-track" />
                <circle
                  cx="100"
                  cy="100"
                  r="44"
                  className="ring-progress ring-workouts"
                  strokeDasharray="276.46"
                  strokeDashoffset={276.46 - (276.46 * workoutPercent) / 100}
                />
              </svg>

              <div className="rings-legend-list">
                <div className="legend-item">
                  <span className="legend-dot cal" />
                  <span className="legend-name">Calories</span>
                  <span className="legend-val">{calPercent}%</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot mins" />
                  <span className="legend-name">Duration</span>
                  <span className="legend-val">{minsPercent}%</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot work" />
                  <span className="legend-name">Frequency</span>
                  <span className="legend-val">{workoutCount}/5 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Today's Routine & Quick Loggers */}
        <div className="dashboard-right-col">
          {/* Today's Routine Hero Card */}
          <div className="today-routine-card glass-panel">
            <div className="routine-card-header">
              <span className="badge badge-primary">Today's Assigned Routine</span>
              <span className="routine-coach-tag">Coach Marcus Vance</span>
            </div>

            <h3 className="routine-hero-title">Hypertrophy Push Day A</h3>
            <p className="routine-hero-desc">
              Focus on upper chest mechanical tension, front delt isolation, and tricep long-head progressive overload.
            </p>

            <div className="routine-metrics-bar">
              <div className="routine-m-item">
                <Clock size={15} /> 50 Mins
              </div>
              <div className="routine-m-item">
                <Dumbbell size={15} /> 4 Exercises
              </div>
              <div className="routine-m-item">
                <Flame size={15} /> ~420 kcal
              </div>
            </div>

            {/* Exercise Preview List */}
            <div className="routine-exercise-preview">
              {TODAY_ROUTINE_EXERCISES.map((ex, idx) => (
                <div key={ex.id} className="exercise-preview-item">
                  <span className="ex-num">{idx + 1}</span>
                  <div className="ex-details">
                    <span className="ex-name">{ex.name}</span>
                    <span className="ex-target">{ex.targetSets} sets • {ex.targetReps} reps • {ex.targetRestSec}s rest</span>
                  </div>
                </div>
              ))}
            </div>

            <button 
              className="btn btn-primary btn-lg start-workout-btn"
              onClick={onStartWorkout}
            >
              <Play size={18} className="play-icon-fill" /> Start Active Workout Session
            </button>
          </div>

          {/* Quick Hydration & Nutrition Tracker Widgets */}
          <div className="quick-trackers-row">
            {/* Water Tracker */}
            <div className="quick-tracker-card glass-panel">
              <div className="tracker-card-header">
                <Droplet size={18} className="water-icon" />
                <span>Hydration</span>
              </div>
              <div className="tracker-value">
                <strong>{waterAmount}</strong> / {profile.stats.waterGoalMl} ml
              </div>
              <div className="tracker-actions">
                <button className="btn btn-icon btn-sm" onClick={() => adjustWater(-250)}>
                  <Minus size={14} />
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => adjustWater(250)}>
                  +250ml
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => adjustWater(500)}>
                  +500ml
                </button>
              </div>
            </div>

            {/* Calorie Intake Tracker */}
            <div className="quick-tracker-card glass-panel">
              <div className="tracker-card-header">
                <Flame size={18} className="cal-icon" />
                <span>Calories Consumed</span>
              </div>
              <div className="tracker-value">
                <strong>{calorieIntake}</strong> / 2,600 kcal
              </div>
              <div className="tracker-actions">
                <button className="btn btn-icon btn-sm" onClick={() => adjustCalories(-100)}>
                  <Minus size={14} />
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => adjustCalories(150)}>
                  +150 kcal
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => adjustCalories(350)}>
                  +350 kcal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

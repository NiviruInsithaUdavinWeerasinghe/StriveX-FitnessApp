import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { ActiveWorkoutModal } from './ActiveWorkoutModal';
import { MemberSettingsModal } from './MemberSettingsModal';
import { MemberChatModal } from './MemberChatModal';
import {
  Flame,
  Heart,
  Clock,
  TrendingUp,
  Dumbbell,
  Droplets,
  Plus,
  Minus,
  Sun,
  Moon,
  LogOut,
  Sparkles,
  Calendar,
  MessageSquare,
  Settings,
  CheckCircle2,
  Apple,
  LayoutDashboard,
  ShoppingBag,
  Award,
  Zap,
  ShieldCheck,
  ArrowUpRight,
  Filter,
  Package
} from 'lucide-react';

const ROUTINES = [
  {
    id: 'push_a',
    title: 'Hypertrophy Push Day A',
    split: 'Chest, Anterior Delts & Triceps',
    coach: 'Coach Marcus Vance',
    duration: '50 mins',
    description: 'Heavy compound focus targeting pectoral clavicular head, anterior deltoids, and tricep lateral heads.',
    exercises: [
      { name: 'Barbell Bench Press', sets: '4×8', muscle: 'Pectorals' },
      { name: 'Incline DB Press', sets: '3×10', muscle: 'Upper Chest' },
      { name: 'Cable Lateral Raises', sets: '4×15', muscle: 'Deltoids' },
      { name: 'Weighted Chest Dips', sets: '3×12', muscle: 'Lower Chest / Triceps' }
    ]
  },
  {
    id: 'pull_b',
    title: 'Hypertrophy Pull Day B',
    split: 'Lats, Rhomboids, Traps & Biceps',
    coach: 'Coach Marcus Vance',
    duration: '55 mins',
    description: 'Back density and arm isolation focusing on vertical pulling, rowing angles, and peak bicep contraction.',
    exercises: [
      { name: 'Lat Pulldown (Neutral Grip)', sets: '4×10', muscle: 'Latissimus Dorsi' },
      { name: 'Chest-Supported T-Bar Row', sets: '4×8', muscle: 'Mid-Back' },
      { name: 'Incline Dumbbell Curls', sets: '3×12', muscle: 'Biceps Long Head' },
      { name: 'Face Pulls & External Rotation', sets: '3×15', muscle: 'Rear Delts' }
    ]
  },
  {
    id: 'legs_c',
    title: 'Lower Body Strength Day C',
    split: 'Quads, Hamstrings & Calves',
    coach: 'Coach David Lee',
    duration: '60 mins',
    description: 'High mechanical tension lower chain training emphasizing knee flexion, hip hinge, and stabilizer strength.',
    exercises: [
      { name: 'Barbell Back Squat', sets: '5×5', muscle: 'Quadriceps' },
      { name: 'Romanian Deadlift (RDL)', sets: '4×8', muscle: 'Hamstrings' },
      { name: 'Bulgarian Split Squat', sets: '3×10', muscle: 'Glutes / Quads' },
      { name: 'Standing Calf Raises', sets: '4×15', muscle: 'Gastrocnemius' }
    ]
  }
];

const MEAL_LOGS = [
  { time: '07:30 AM', meal: 'Overnight Oats with Iso-Whey & Berries', kcal: 520, p: 42, c: 68, f: 10, type: 'Breakfast' },
  { time: '11:45 AM', meal: 'Grilled Chicken Breast, Quinoa & Avocado', kcal: 640, p: 58, c: 55, f: 18, type: 'Lunch' },
  { time: '03:15 PM', meal: 'Post-Workout Anabolic Whey Shake & Banana', kcal: 310, p: 35, c: 38, f: 4, type: 'Snack' },
  { time: '07:00 PM', meal: 'Wild Grass-Fed Steak & Sweet Potato Puree', kcal: 680, p: 50, c: 45, f: 22, type: 'Dinner' }
];

const PERSONAL_RECORDS = [
  { exercise: 'Barbell Bench Press', weight: '105 kg', reps: '3 reps', date: '2 days ago', rpe: 'RPE 9.5', icon: Dumbbell },
  { exercise: 'Barbell Back Squat', weight: '145 kg', reps: '5 reps', date: 'Last Week', rpe: 'RPE 9', icon: Zap },
  { exercise: 'Conventional Deadlift', weight: '180 kg', reps: '2 reps', date: '2 weeks ago', rpe: 'RPE 10', icon: Award },
  { exercise: 'Weighted Pull-Up', weight: '+25 kg', reps: '6 reps', date: '3 days ago', rpe: 'RPE 8.5', icon: TrendingUp }
];

const STORE_PRODUCTS = [
  { id: 'p1', name: 'StriveX Iso-Whey Protein Isolate (2kg)', price: '$64.99', orig: '$75.00', category: 'Supplements', tag: 'Best Seller', rating: '4.9 ★', desc: '100% Cold-filtered whey isolate with 27g protein per scoop.' },
  { id: 'p2', name: 'Creatine Monohydrate Pure (500g)', price: '$29.99', orig: '$35.00', category: 'Supplements', tag: 'Essential', rating: '5.0 ★', desc: 'Micronized 200-mesh pure creatine monohydrate for ATP burst.' },
  { id: 'p3', name: 'StriveX Pro Barbell Lifting Straps', price: '$19.99', orig: '$24.00', category: 'Gear', tag: 'Gear', rating: '4.8 ★', desc: 'Heavy-duty cotton webbing with neoprene wrist padding.' },
  { id: 'p4', name: 'Pre-Workout Telemetry Matrix (400g)', price: '$44.99', orig: '$52.00', category: 'Supplements', tag: 'Energy', rating: '4.9 ★', desc: 'L-Citrulline Malate 8g + Beta-Alanine 3.2g explosive pump.' },
  { id: 'p5', name: 'StriveX Seamless Compression Top', price: '$39.99', orig: '$48.00', category: 'Apparel', tag: 'New Release', rating: '4.7 ★', desc: 'Four-way stretch sweat-wicking athletic compression weave.' },
  { id: 'p6', name: 'BCAA Electrolyte Intra-Hydration', price: '$34.99', orig: '$40.00', category: 'Supplements', tag: 'Recovery', rating: '4.9 ★', desc: '2:1:1 Instantiated BCAAs with Pink Himalayan Salt minerals.' }
];

export const MemberDashboard = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  // Navigation tab
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'nutrition' | 'analytics' | 'store' | 'chat'
  const [storeFilter, setStoreFilter] = useState('All');

  // Modals state
  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Selected routine
  const [selectedRoutineId, setSelectedRoutineId] = useState('push_a');
  const activeRoutine = ROUTINES.find((r) => r.id === selectedRoutineId) || ROUTINES[0];

  // Biometrics tracking
  const [calories, setCalories] = useState(user?.todayCalories || 1560);
  const targetCalories = user?.targetCalories || 2150;

  const [activeMins, setActiveMins] = useState(user?.activeMinutes || 64);
  const targetMins = user?.targetMinutes || 60;

  const [waterMl, setWaterMl] = useState(2250);
  const targetWaterMl = 3000;

  const handleAddWater = (amount) => setWaterMl((prev) => Math.min(prev + amount, 5000));
  const handleAddCalories = (amount) => setCalories((prev) => prev + amount);

  const handleWorkoutCompleted = ({ addedCalories, addedMins }) => {
    setCalories((prev) => prev + addedCalories);
    setActiveMins((prev) => prev + addedMins);
  };

  const calPercent = Math.min((calories / targetCalories) * 100, 100);
  const minPercent = Math.min((activeMins / targetMins) * 100, 100);

  const navItems = [
    { id: 'overview', label: 'Workout & Check-in', icon: LayoutDashboard },
    { id: 'nutrition', label: 'Nutrition & Daily Meals', icon: Apple },
    { id: 'analytics', label: 'Progress & PR Metrics', icon: TrendingUp },
    { id: 'store', label: 'Supplements & Gear Store', icon: ShoppingBag },
    { id: 'chat', label: 'Chat with Coach', icon: MessageSquare }
  ];

  const filteredProducts = storeFilter === 'All'
    ? STORE_PRODUCTS
    : STORE_PRODUCTS.filter((p) => p.category === storeFilter);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex' }}>
      {/* LEFT NAVIGATION SIDEBAR */}
      <aside
        style={{
          width: '260px',
          minWidth: '260px',
          background: 'var(--surface-elevated)',
          borderRight: '1px solid var(--border-glass)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '24px 16px',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 900
        }}
      >
        <div>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 8px 24px 8px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '24px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#111',
                fontWeight: 900
              }}
            >
              <Dumbbell size={20} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.1rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                STRIVEX
              </div>
              <span className="type-eyebrow" style={{ fontSize: '0.65rem', color: 'var(--accent)' }}>
                ATHLETE HUB
              </span>
            </div>
          </div>

          {/* Nav Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: isActive ? 'rgba(212, 255, 0, 0.12)' : 'transparent',
                    color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                    border: isActive ? '1px solid rgba(212, 255, 0, 0.25)' : '1px solid transparent',
                    fontWeight: isActive ? 800 : 600,
                    fontSize: '0.86rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Icon size={18} color={isActive ? 'var(--accent)' : 'var(--text-tertiary)'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Profile Card Footer */}
        <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 4px' }}>
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop'}
              alt="Alex Mercer"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1.5px solid var(--accent)'
              }}
            />
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.name || 'Alex Mercer'}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>{user?.tier || 'Pro Athlete'}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={toggleTheme}
              className="kinetic-btn-ghost"
              style={{ flex: 1, padding: '8px', justifyContent: 'center' }}
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={16} color="var(--accent)" /> : <Moon size={16} color="var(--accent)" />}
            </button>
            <button
              type="button"
              onClick={() => setIsSettingsOpen(true)}
              className="kinetic-btn-ghost"
              style={{ flex: 1, padding: '8px', justifyContent: 'center' }}
              title="Settings"
            >
              <Settings size={16} />
            </button>
            <button
              type="button"
              onClick={logout}
              className="kinetic-btn-ghost"
              style={{ flex: 1, padding: '8px', justifyContent: 'center' }}
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT SPACE */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, paddingBottom: '60px' }}>
        {/* Top Header */}
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 800,
            background: 'var(--surface-glass)',
            backdropFilter: 'var(--blur-glass)',
            WebkitBackdropFilter: 'var(--blur-glass)',
            borderBottom: '1px solid var(--border-glass)',
            padding: '16px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}
        >
          <div>
            <div className="type-eyebrow">ATHLETE PERFORMANCE HUB</div>
            <h1 className="type-h3" style={{ fontSize: '1.25rem', margin: 0 }}>
              {activeTab === 'overview' && 'Daily Check-in & Workout Tracker'}
              {activeTab === 'nutrition' && 'Macronutrients & Daily Meal Log'}
              {activeTab === 'analytics' && 'Body Composition & Personal Records'}
              {activeTab === 'store' && 'StriveX Official Pro Gear & Store'}
              {activeTab === 'chat' && '1-on-1 Direct Communication with Coach'}
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              onClick={() => setIsWorkoutModalOpen(true)}
              className="kinetic-btn-primary"
              style={{ padding: '8px 16px', fontSize: '0.82rem', fontWeight: 800 }}
            >
              <Dumbbell size={15} />
              <span>Start Today's Workout</span>
            </button>
          </div>
        </header>

        {/* Main Tab Content */}
        <main style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '28px', flex: 1 }}>
          {/* TAB 1: WORKOUT & CHECK-IN OVERVIEW */}
          {activeTab === 'overview' && (
            <>
              {/* Daily Energy & Hydration KPI row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                <div className="kinetic-card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span className="type-caption">Active Calorie Burn</span>
                    <Flame size={18} color="var(--accent)" />
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                    {calories} <span style={{ fontSize: '1rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>/ {targetCalories} kcal</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'var(--surface-input)', borderRadius: '10px', marginTop: '12px', overflow: 'hidden' }}>
                    <div style={{ width: `${calPercent}%`, height: '100%', background: 'var(--accent)', borderRadius: '10px' }} />
                  </div>
                </div>

                <div className="kinetic-card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span className="type-caption">Time in Motion</span>
                    <Clock size={18} color="#06b6d4" />
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                    {activeMins} <span style={{ fontSize: '1rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>/ {targetMins} mins</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'var(--surface-input)', borderRadius: '10px', marginTop: '12px', overflow: 'hidden' }}>
                    <div style={{ width: `${minPercent}%`, height: '100%', background: '#06b6d4', borderRadius: '10px' }} />
                  </div>
                </div>

                <div className="kinetic-card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span className="type-caption">Hydration Target</span>
                    <Droplets size={18} color="#3b82f6" />
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                    {waterMl} <span style={{ fontSize: '1rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>/ {targetWaterMl} ml</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                    <button type="button" onClick={() => handleAddWater(250)} className="kinetic-btn-secondary" style={{ padding: '4px 10px', fontSize: '0.74rem' }}>
                      +250ml
                    </button>
                    <button type="button" onClick={() => handleAddWater(500)} className="kinetic-btn-secondary" style={{ padding: '4px 10px', fontSize: '0.74rem' }}>
                      +500ml
                    </button>
                  </div>
                </div>
              </div>

              {/* Program Details Card */}
              <div className="kinetic-card" style={{ padding: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <span className="type-eyebrow" style={{ color: 'var(--accent)' }}>PROGRAMMED FOR TODAY</span>
                    <h3 className="type-h3" style={{ fontSize: '1.4rem', margin: '2px 0 0 0' }}>{activeRoutine.title}</h3>
                    <p className="type-caption" style={{ margin: '4px 0 0' }}>Assigned by {activeRoutine.coach} • Est. {activeRoutine.duration}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsWorkoutModalOpen(true)}
                    className="kinetic-btn-primary"
                    style={{ padding: '10px 20px', fontSize: '0.88rem' }}
                  >
                    <Dumbbell size={16} />
                    <span>Launch Active Workout Tracker</span>
                  </button>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '20px', lineHeight: '1.5' }}>
                  {activeRoutine.description}
                </p>

                {/* Exercises Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                  {activeRoutine.exercises.map((ex, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '14px',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--surface-input)',
                        border: '1px solid var(--border-subtle)'
                      }}
                    >
                      <span className="type-caption" style={{ color: 'var(--accent)', fontWeight: 800, fontSize: '0.72rem' }}>
                        EXERCISE #{idx + 1}
                      </span>
                      <h5 style={{ fontSize: '0.92rem', fontWeight: 800, margin: '2px 0 4px 0', color: 'var(--text-primary)' }}>
                        {ex.name}
                      </h5>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>
                        <span>Target: <strong style={{ color: 'var(--text-secondary)' }}>{ex.sets}</strong></span>
                        <span>{ex.muscle}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Streak Row */}
              <div className="kinetic-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h4 className="type-h3" style={{ fontSize: '1rem', margin: 0 }}>Weekly Workout Adherence</h4>
                  <span className="kinetic-badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--status-success)' }}>5-Day Streak 🔥</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '12px' }}>
                  {[
                    { day: 'M', done: true, title: 'Push Day A' },
                    { day: 'T', done: true, title: 'Pull Day B' },
                    { day: 'W', done: true, title: 'HIIT Cardio' },
                    { day: 'T', done: true, title: 'Legs Day C' },
                    { day: 'F', done: true, title: 'Upper Power' },
                    { day: 'S', done: false, isToday: true, title: 'Today' },
                    { day: 'S', done: false, title: 'Rest Day' }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '12px 6px',
                        borderRadius: 'var(--radius-md)',
                        background: item.isToday ? 'rgba(212, 255, 0, 0.15)' : 'var(--surface-input)',
                        border: item.isToday ? '1px solid var(--accent)' : '1px solid var(--border-subtle)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: item.isToday ? 'var(--accent)' : 'var(--text-tertiary)' }}>{item.day}</span>
                      {item.done ? (
                        <CheckCircle2 size={16} color="var(--status-success)" />
                      ) : (
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.isToday ? 'var(--accent)' : 'var(--border-subtle)' }} />
                      )}
                      <span style={{ fontSize: '0.64rem', color: 'var(--text-secondary)', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* TAB 2: NUTRITION & DAILY MEALS */}
          {activeTab === 'nutrition' && (
            <>
              {/* Macro Summary Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                <div className="kinetic-card" style={{ padding: '20px' }}>
                  <span className="type-caption" style={{ color: 'var(--accent)', fontWeight: 800 }}>Protein Intake</span>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '4px' }}>
                    185g <span style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)' }}>/ 200g</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'var(--surface-input)', borderRadius: '10px', marginTop: '10px', overflow: 'hidden' }}>
                    <div style={{ width: '92%', height: '100%', background: 'var(--accent)', borderRadius: '10px' }} />
                  </div>
                  <div className="type-caption" style={{ marginTop: '8px' }}>92.5% of target reached</div>
                </div>

                <div className="kinetic-card" style={{ padding: '20px' }}>
                  <span className="type-caption" style={{ color: '#06b6d4', fontWeight: 800 }}>Carbohydrates Target</span>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '4px' }}>
                    240g <span style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)' }}>/ 310g</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'var(--surface-input)', borderRadius: '10px', marginTop: '10px', overflow: 'hidden' }}>
                    <div style={{ width: '77%', height: '100%', background: '#06b6d4', borderRadius: '10px' }} />
                  </div>
                  <div className="type-caption" style={{ marginTop: '8px' }}>77% of energy glycogen filled</div>
                </div>

                <div className="kinetic-card" style={{ padding: '20px' }}>
                  <span className="type-caption" style={{ color: '#f59e0b', fontWeight: 800 }}>Essential Fats Target</span>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '4px' }}>
                    62g <span style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)' }}>/ 75g</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'var(--surface-input)', borderRadius: '10px', marginTop: '10px', overflow: 'hidden' }}>
                    <div style={{ width: '82%', height: '100%', background: '#f59e0b', borderRadius: '10px' }} />
                  </div>
                  <div className="type-caption" style={{ marginTop: '8px' }}>Hormone & joint recovery target</div>
                </div>
              </div>

              {/* Detailed Daily Meal Timeline & Macro Breakdown */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', alignItems: 'start' }}>
                {/* Meal Timeline */}
                <div className="kinetic-card" style={{ padding: '28px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div>
                      <h3 className="type-h3" style={{ margin: 0 }}>Today's Meal Timeline</h3>
                      <p className="type-small" style={{ margin: '4px 0 0' }}>Prescribed by Coach Marcus Vance • Total {calories} kcal logged.</p>
                    </div>

                    <button type="button" onClick={() => handleAddCalories(250)} className="kinetic-btn-primary" style={{ padding: '8px 14px', fontSize: '0.8rem' }}>
                      <Plus size={14} /> Log Meal (+250 kcal)
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {MEAL_LOGS.map((m, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: '16px',
                          borderRadius: 'var(--radius-lg)',
                          background: 'var(--surface-input)',
                          border: '1px solid var(--border-subtle)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '16px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <span className="kinetic-badge" style={{ fontSize: '0.72rem', padding: '4px 10px' }}>
                            {m.type}
                          </span>
                          <div>
                            <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)', display: 'block' }}>{m.meal}</strong>
                            <span className="type-caption">{m.time} • {m.kcal} kcal</span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', fontWeight: 800 }}>
                          <span style={{ color: 'var(--accent)' }}>P: {m.p}g</span>
                          <span style={{ color: '#06b6d4' }}>C: {m.c}g</span>
                          <span style={{ color: '#f59e0b' }}>F: {m.f}g</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Micronutrients & Hydration */}
                <div className="kinetic-card" style={{ padding: '28px' }}>
                  <h3 className="type-h3" style={{ margin: '0 0 16px 0' }}>Micronutrient Checklist</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { name: 'Vitamin D3 (5000 IU)', status: 'Optimal', ok: true },
                      { name: 'Magnesium Glycinate (400mg)', status: 'Taken', ok: true },
                      { name: 'Omega-3 Fish Oil (2000mg)', status: 'Taken', ok: true },
                      { name: 'Zinc Picolinate (30mg)', status: 'Pending Evening', ok: false }
                    ].map((micro, idx) => (
                      <div key={idx} style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--surface-input)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-primary)' }}>{micro.name}</span>
                        <span className="kinetic-badge" style={{ fontSize: '0.66rem', background: micro.ok ? 'rgba(16, 185, 129, 0.15)' : 'var(--surface-elevated)', color: micro.ok ? 'var(--status-success)' : 'var(--text-secondary)' }}>
                          {micro.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 3: PROGRESS & METRICS */}
          {activeTab === 'analytics' && (
            <>
              {/* Top Analytics Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                <div className="kinetic-card" style={{ padding: '28px' }}>
                  <span className="type-caption">Monthly Tonnage Volume</span>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 900, color: 'var(--accent)', marginTop: '6px' }}>
                    180,800 kg
                  </div>
                  <p className="type-caption" style={{ marginTop: '6px', color: 'var(--status-success)', fontWeight: 700 }}>
                    +14.2% load progression over last 30 days
                  </p>
                </div>

                <div className="kinetic-card" style={{ padding: '28px' }}>
                  <span className="type-caption">Body Weight Trend</span>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 900, color: '#06b6d4', marginTop: '6px' }}>
                    78.4 kg
                  </div>
                  <p className="type-caption" style={{ marginTop: '6px', color: 'var(--text-secondary)' }}>
                    Lean muscle accretion trajectory locked
                  </p>
                </div>

                <div className="kinetic-card" style={{ padding: '28px' }}>
                  <span className="type-caption">Estimated Body Fat %</span>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 900, color: '#f59e0b', marginTop: '6px' }}>
                    12.8%
                  </div>
                  <p className="type-caption" style={{ marginTop: '6px', color: 'var(--status-success)', fontWeight: 700 }}>
                    -1.2% reduction in fat mass
                  </p>
                </div>
              </div>

              {/* Volume Load Trajectory Visual Bar Chart & Body Metrics Timeline */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', alignItems: 'start' }}>
                {/* Visual Bar Graph Widget */}
                <div className="kinetic-card" style={{ padding: '32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div>
                      <h3 className="type-h3" style={{ margin: 0, fontSize: '1.2rem' }}>Weekly Tonnage Load Trajectory</h3>
                      <p className="type-small" style={{ margin: '4px 0 0', color: 'var(--text-secondary)' }}>Calculated across compound sets (Bench, Squat, RDL, Press).</p>
                    </div>
                    <span className="kinetic-badge" style={{ padding: '4px 10px' }}>4-Week Telemetry</span>
                  </div>

                  {/* Visual Graph Bars */}
                  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '200px', padding: '0 20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
                    {[
                      { label: 'Week 1', volume: '38.4k kg', height: '55%', color: 'linear-gradient(180deg, #06b6d4 0%, rgba(6, 182, 212, 0.2) 100%)', border: '#06b6d4' },
                      { label: 'Week 2', volume: '41.2k kg', height: '68%', color: 'linear-gradient(180deg, #3b82f6 0%, rgba(59, 130, 246, 0.2) 100%)', border: '#3b82f6' },
                      { label: 'Week 3', volume: '44.8k kg', height: '82%', color: 'linear-gradient(180deg, #f59e0b 0%, rgba(245, 158, 11, 0.2) 100%)', border: '#f59e0b' },
                      { label: 'Week 4 (Current)', volume: '45.2k kg', height: '98%', color: 'linear-gradient(180deg, var(--accent) 0%, rgba(212, 255, 0, 0.25) 100%)', border: 'var(--accent)', glow: true }
                    ].map((bar, idx) => (
                      <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', flex: 1, height: '100%', justifyContent: 'flex-end' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: bar.border }}>{bar.volume}</span>
                        <div
                          style={{
                            width: '48px',
                            height: bar.height,
                            borderRadius: '8px 8px 0 0',
                            background: bar.color,
                            border: `1.5px solid ${bar.border}`,
                            boxShadow: bar.glow ? '0 0 16px var(--accent-glow)' : `0 0 10px ${bar.border}40`,
                            transition: 'all 0.3s ease'
                          }}
                        />
                        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>{bar.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Body Composition Milestone Checkpoint */}
                <div className="kinetic-card" style={{ padding: '32px' }}>
                  <h3 className="type-h3" style={{ margin: '0 0 16px 0', fontSize: '1.1rem' }}>Body Scan History</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {[
                      { date: 'Sep 01 (InBody Scan)', weight: '78.4 kg', fat: '12.8%', muscle: '38.2 kg' },
                      { date: 'Aug 15 (InBody Scan)', weight: '79.1 kg', fat: '13.4%', muscle: '37.8 kg' },
                      { date: 'Aug 01 (Baseline Scan)', weight: '80.0 kg', fat: '14.0%', muscle: '37.4 kg' }
                    ].map((scan, idx) => (
                      <div key={idx} style={{ padding: '14px', borderRadius: 'var(--radius-md)', background: 'var(--surface-input)', border: '1px solid var(--border-subtle)' }}>
                        <div style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--accent)', marginBottom: '4px' }}>{scan.date}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                          <span>{scan.weight}</span>
                          <span style={{ color: '#06b6d4' }}>{scan.muscle} Muscle</span>
                          <span style={{ color: '#f59e0b' }}>{scan.fat} Fat</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Personal Record (PR) Hall of Fame */}
              <div className="kinetic-card" style={{ padding: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <h3 className="type-h3" style={{ margin: 0, fontSize: '1.2rem' }}>Personal Record (PR) Hall of Fame</h3>
                    <p className="type-small" style={{ margin: '4px 0 0', color: 'var(--text-secondary)' }}>Verified 1RM estimations and top strength milestones.</p>
                  </div>
                  <span className="type-eyebrow" style={{ color: 'var(--accent)' }}>STRIVEX VERIFIED</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                  {PERSONAL_RECORDS.map((pr, idx) => {
                    const Icon = pr.icon;
                    return (
                      <div
                        key={idx}
                        style={{
                          padding: '22px',
                          borderRadius: 'var(--radius-lg)',
                          background: 'var(--surface-input)',
                          border: '1px solid var(--border-subtle)',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          gap: '16px'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span className="type-caption" style={{ color: 'var(--accent)', fontWeight: 800 }}>{pr.rpe}</span>
                          <Icon size={20} color="var(--accent)" />
                        </div>
                        <div>
                          <h5 style={{ fontSize: '1rem', fontWeight: 800, margin: '0 0 6px 0', color: 'var(--text-primary)' }}>{pr.exercise}</h5>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                            {pr.weight}
                          </div>
                          <span className="type-caption" style={{ fontSize: '0.78rem' }}>{pr.reps} • Logged {pr.date}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* TAB 4: STORE */}
          {activeTab === 'store' && (
            <div className="kinetic-card" style={{ padding: '36px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h3 className="type-h3" style={{ margin: 0, fontSize: '1.3rem' }}>StriveX Official Pro Store</h3>
                  <p className="type-small" style={{ margin: '6px 0 0', color: 'var(--text-secondary)' }}>15% Member Tier Discount automatically applied at checkout.</p>
                </div>

                {/* Filter Pills */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['All', 'Supplements', 'Gear', 'Apparel'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setStoreFilter(cat)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: 'var(--radius-pill)',
                        background: storeFilter === cat ? 'var(--accent)' : 'var(--surface-input)',
                        color: storeFilter === cat ? '#111' : 'var(--text-secondary)',
                        fontSize: '0.82rem',
                        fontWeight: 800,
                        border: `1px solid ${storeFilter === cat ? 'var(--accent)' : 'var(--border-subtle)'}`,
                        cursor: 'pointer'
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      padding: '24px',
                      borderRadius: 'var(--radius-lg)',
                      background: 'var(--surface-input)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '18px'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <span className="kinetic-badge" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>{p.tag}</span>
                        <span style={{ fontSize: '0.78rem', color: '#f59e0b', fontWeight: 800 }}>{p.rating}</span>
                      </div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--text-primary)', lineHeight: '1.3' }}>{p.name}</h4>
                      <p className="type-caption" style={{ lineHeight: '1.5', fontSize: '0.82rem' }}>{p.desc}</p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                      <div>
                        <span style={{ fontWeight: 900, fontSize: '1.35rem', color: 'var(--accent)' }}>{p.price}</span>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', textDecoration: 'line-through', marginLeft: '8px' }}>{p.orig}</span>
                      </div>

                      <button type="button" className="kinetic-btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
                        <ShoppingBag size={14} /> Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CHAT */}
          {activeTab === 'chat' && (
            <MemberChatModal isOpen={true} isInline={true} />
          )}
        </main>
      </div>

      {/* Active Workout Tracker Modal */}
      <ActiveWorkoutModal
        isOpen={isWorkoutModalOpen}
        onClose={() => setIsWorkoutModalOpen(false)}
        routine={activeRoutine}
        onWorkoutCompleted={handleWorkoutCompleted}
      />

      {/* Settings Modal */}
      <MemberSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};

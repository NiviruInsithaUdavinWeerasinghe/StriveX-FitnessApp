import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { useBroadcast } from '../../context/BroadcastContext';
import { ActiveWorkoutModal } from './ActiveWorkoutModal';
import { MemberSettingsModal } from './MemberSettingsModal';
import { MemberChatModal } from './MemberChatModal';
import { LiveBroadcastBanner } from '../ui/LiveBroadcastBanner';
import { NotificationDrawerModal } from '../ui/NotificationDrawerModal';
import { CustomDropdown } from '../ui/CustomDropdown';
import './MemberMobile.css';
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
  Package,
  Eye,
  X,
  Star,
  CheckCircle,
  Truck,
  UserCheck,
  Menu
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
  { id: 'p1', name: 'StriveX Iso-Whey Protein Isolate (2kg)', price: '$64.99', orig: '$75.00', category: 'Supplements', tag: 'Best Seller', inStock: true, rating: '4.9 ★', desc: '100% Cold-filtered whey isolate with 27g protein per scoop.', image: '/products/whey.jpg' },
  { id: 'p2', name: 'Creatine Monohydrate Pure (500g)', price: '$29.99', orig: '$35.00', category: 'Supplements', tag: 'Essential', inStock: true, rating: '5.0 ★', desc: 'Micronized 200-mesh pure creatine monohydrate for ATP burst.', image: '/products/creatine.jpg' },
  { id: 'p3', name: 'StriveX Pro Barbell Lifting Straps', price: '$19.99', orig: '$24.00', category: 'Gear', tag: 'Gear', inStock: true, rating: '4.8 ★', desc: 'Heavy-duty cotton webbing with neoprene wrist padding.', image: '/products/straps.jpg' },
  { id: 'p4', name: 'Pre-Workout Telemetry Matrix (400g)', price: '$44.99', orig: '$52.00', category: 'Supplements', tag: 'Energy', inStock: false, rating: '4.9 ★', desc: 'L-Citrulline Malate 8g + Beta-Alanine 3.2g explosive pump.', image: '/products/preworkout.jpg' },
  { id: 'p5', name: 'StriveX Seamless Compression Top', price: '$39.99', orig: '$48.00', category: 'Apparel', tag: 'New Release', inStock: true, rating: '4.7 ★', desc: 'Four-way stretch sweat-wicking athletic compression weave.', image: '/products/compression.jpg' },
  { id: 'p6', name: 'BCAA Electrolyte Intra-Hydration', price: '$34.99', orig: '$40.00', category: 'Supplements', tag: 'Recovery', inStock: true, rating: '4.9 ★', desc: '2:1:1 Instantiated BCAAs with Pink Himalayan Salt minerals.', image: '/products/bcaa.jpg' }
];

export const MemberDashboard = () => {
  const { user, logout, publishedRoutines } = useAuth();
  const { theme, toggleTheme } = useTheme();

  // Mode toggle state for testing
  const [isCoachedMode, setIsCoachedMode] = useState(!!user?.assignedTrainer);

  // Navigation tab
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'nutrition' | 'analytics' | 'store' | 'chat'
  const [storeFilter, setStoreFilter] = useState('All');

  // Modals state
  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLogMealOpen, setIsLogMealOpen] = useState(false);
  const [selectedProductModal, setSelectedProductModal] = useState(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Filter dynamic routines published specifically for this athlete by name or assigned client
  const userPublishedRoutines = (publishedRoutines || []).filter(
    (rtn) => !rtn.clientName || rtn.clientName.toLowerCase() === (user?.name || '').toLowerCase()
  );

  const availableRoutines = [...userPublishedRoutines, ...ROUTINES];

  // Meal logs state
  const [mealLogs, setMealLogs] = useState(MEAL_LOGS);
  const [newMealTitle, setNewMealTitle] = useState('');
  const [newMealCategory, setNewMealCategory] = useState('Snack');
  const [newMealKcal, setNewMealKcal] = useState('250');
  const [newMealP, setNewMealP] = useState('25');
  const [newMealC, setNewMealC] = useState('30');
  const [newMealF, setNewMealF] = useState('8');

  // Notification Drawer state
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const { unreadCount } = useBroadcast();

  // Selected routine
  const [selectedRoutineId, setSelectedRoutineId] = useState(availableRoutines[0]?.id || 'push_a');
  const activeRoutine = availableRoutines.find((r) => r.id === selectedRoutineId) || availableRoutines[0];

  // Biometrics tracking
  const [calories, setCalories] = useState(user?.todayCalories || 1560);
  const targetCalories = user?.targetCalories || 2150;

  const [activeMins, setActiveMins] = useState(user?.activeMinutes || 64);
  const targetMins = user?.targetMinutes || 60;

  const [waterMl, setWaterMl] = useState(2250);
  const targetWaterMl = 3000;

  const handleAddWater = (amount) => setWaterMl((prev) => Math.min(prev + amount, 5000));
  
  const handleSaveCustomMeal = (e) => {
    e.preventDefault();
    const kcalNum = parseInt(newMealKcal) || 0;
    const pNum = parseInt(newMealP) || 0;
    const cNum = parseInt(newMealC) || 0;
    const fNum = parseInt(newMealF) || 0;

    const newLog = {
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      meal: newMealTitle.trim() || `${newMealCategory} Entry`,
      kcal: kcalNum,
      p: pNum,
      c: cNum,
      f: fNum,
      type: newMealCategory
    };

    setMealLogs((prev) => [newLog, ...prev]);
    setCalories((prev) => prev + kcalNum);
    setIsLogMealOpen(false);

    // Reset inputs
    setNewMealTitle('');
    setNewMealKcal('250');
    setNewMealP('25');
    setNewMealC('30');
    setNewMealF('8');
  };

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
    <div className="member-layout-root" style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex' }}>
      {/* LEFT NAVIGATION SIDEBAR */}
      <aside
        className="member-desktop-sidebar"
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
      <div className="member-main-container" style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, paddingBottom: '60px' }}>
        {/* MOBILE TOP BAR (<= 900px) */}
        <div className="member-mobile-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={() => setIsMobileNavOpen(true)}
              style={{
                padding: '8px',
                borderRadius: '8px',
                background: 'var(--surface-input)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--border-subtle)'
              }}
              title="Open Navigation Menu"
            >
              <Menu size={20} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111', fontWeight: 900 }}>
                <Dumbbell size={16} />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1rem', color: 'var(--text-primary)' }}>STRIVEX</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setIsNotificationDrawerOpen(true)}
              style={{
                padding: '8px',
                borderRadius: '8px',
                background: 'var(--surface-input)',
                border: '1px solid var(--border-subtle)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Notifications"
            >
              <Zap size={16} color="var(--accent)" />
              {unreadCount > 0 && (
                <span style={{ position: 'absolute', top: '-2px', right: '-2px', background: '#ff3b30', color: '#fff', borderRadius: '50%', width: '15px', height: '15px', fontSize: '0.6rem', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsWorkoutModalOpen(true)}
              className="kinetic-btn-primary"
              style={{ padding: '6px 12px', fontSize: '0.74rem' }}
            >
              <Dumbbell size={13} />
              <span>Start</span>
            </button>
          </div>
        </div>

        {/* LIVE BROADCAST BANNER AT TOP */}
        <LiveBroadcastBanner userRole="member" />

        {/* Top Header */}
        <header
          className="member-desktop-header"
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

          <div className="member-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Notification Bell Button (Desktop only; mobile has bell in top bar) */}
            <button
              type="button"
              onClick={() => setIsNotificationDrawerOpen(true)}
              className="kinetic-btn-secondary member-header-btn-desktop-only"
              style={{ padding: '8px', position: 'relative' }}
              title="Notification Center & Announcements"
            >
              <Zap size={18} color="var(--accent)" />
              {unreadCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    background: '#ff3b30',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    fontSize: '0.65rem',
                    fontWeight: 900,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid var(--bg-primary)'
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Quick Testing Toggle */}
            <button
              type="button"
              onClick={() => setIsCoachedMode((prev) => !prev)}
              className="kinetic-btn-secondary member-header-mode-toggle"
              style={{ padding: '6px 12px', fontSize: '0.76rem', gap: '6px' }}
              title="Toggle coach assignment to test both tracking modes"
            >
              <UserCheck size={14} color="var(--accent)" />
              <span>{isCoachedMode ? 'Mode: Coached (Alex)' : 'Mode: Self-Guided'}</span>
            </button>

            {/* Start Workout Button (Desktop only; mobile has start button in top bar) */}
            <button
              type="button"
              onClick={() => setIsWorkoutModalOpen(true)}
              className="kinetic-btn-primary member-header-btn-desktop-only"
              style={{ padding: '8px 16px', fontSize: '0.82rem', fontWeight: 800 }}
            >
              <Dumbbell size={15} />
              <span>Start Today's Workout</span>
            </button>
          </div>
        </header>

        {/* Main Tab Content */}
        <main className="member-main-content" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '28px', flex: 1 }}>
          {/* TAB 1: WORKOUT & CHECK-IN OVERVIEW */}
          {activeTab === 'overview' && (
            <>
              {/* Daily Energy & Hydration KPI row */}
              <div className="member-kpi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                <div className="kinetic-card member-kpi-card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span className="type-caption">Active Calorie Burn</span>
                    <Flame size={18} color="var(--accent)" />
                  </div>
                  <div className="member-kpi-val" style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                    {calories} <span style={{ fontSize: '1rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>/ {targetCalories} kcal</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'var(--surface-input)', borderRadius: '10px', marginTop: '12px', overflow: 'hidden' }}>
                    <div style={{ width: `${calPercent}%`, height: '100%', background: 'var(--accent)', borderRadius: '10px' }} />
                  </div>
                </div>

                <div className="kinetic-card member-kpi-card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span className="type-caption">Time in Motion</span>
                    <Clock size={18} color="#06b6d4" />
                  </div>
                  <div className="member-kpi-val" style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                    {activeMins} <span style={{ fontSize: '1rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>/ {targetMins} mins</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'var(--surface-input)', borderRadius: '10px', marginTop: '12px', overflow: 'hidden' }}>
                    <div style={{ width: `${minPercent}%`, height: '100%', background: '#06b6d4', borderRadius: '10px' }} />
                  </div>
                </div>

                <div className="kinetic-card member-kpi-card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span className="type-caption">Hydration Target</span>
                    <Droplets size={18} color="#3b82f6" />
                  </div>
                  <div className="member-kpi-val" style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-primary)' }}>
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

              {/* Program Details Card / Direct Inline Execution */}
              {isCoachedMode ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="member-program-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                    <div className="member-program-badges" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      <span className="type-eyebrow" style={{ color: 'var(--accent)' }}>PROGRAMMED FOR TODAY</span>
                      <span className="kinetic-badge" style={{ fontSize: '0.66rem', background: 'rgba(212, 255, 0, 0.15)', color: 'var(--accent)' }}>
                        ASSIGNED BY {user.assignedTrainer.toUpperCase()}
                      </span>
                      <span className="kinetic-badge-subtle" style={{ fontSize: '0.72rem', background: 'var(--surface-input)' }}>
                        {activeRoutine.split}
                      </span>
                      <span className="kinetic-badge-subtle" style={{ fontSize: '0.72rem', background: 'var(--surface-input)', color: '#06b6d4' }}>
                        Est. {activeRoutine.duration}
                      </span>
                    </div>

                    {availableRoutines.length > 1 && (
                      <div className="member-split-dropdown-container" style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '220px' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600, whiteSpace: 'nowrap' }}>Switch Split:</span>
                        <CustomDropdown
                          options={availableRoutines.map((r) => ({ label: r.title, value: r.id }))}
                          value={selectedRoutineId}
                          onChange={(val) => setSelectedRoutineId(val)}
                          placeholder="Select Routine..."
                        />
                      </div>
                    )}
                  </div>

                  <ActiveWorkoutModal
                    isOpen={true}
                    isInline={true}
                    isCoachPrescribed={true}
                    activeRoutine={activeRoutine}
                    onWorkoutCompleted={handleWorkoutCompleted}
                  />
                </div>
              ) : (
                <div className="kinetic-card" style={{ padding: '28px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <span className="type-eyebrow" style={{ color: 'var(--accent)' }}>SELF-GUIDED WORKOUT PROGRAM</span>
                      <h3 className="type-h3" style={{ fontSize: '1.4rem', margin: '2px 0 0 0' }}>{activeRoutine.title}</h3>
                      <p className="type-caption" style={{ margin: '4px 0 0' }}>StriveX Program Library • {activeRoutine.split} • Est. {activeRoutine.duration}</p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {availableRoutines.length > 1 && (
                        <div style={{ minWidth: '200px' }}>
                          <CustomDropdown
                            options={availableRoutines.map((r) => ({ label: r.title, value: r.id }))}
                            value={selectedRoutineId}
                            onChange={(val) => setSelectedRoutineId(val)}
                            placeholder="Select Routine..."
                          />
                        </div>
                      )}

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
                        {ex.sets} Sets • {ex.muscle}
                      </span>
                      <h5 style={{ fontSize: '1rem', fontWeight: 800, margin: '6px 0 0 0', color: 'var(--text-primary)' }}>{ex.name}</h5>
                    </div>
                  ))}
                </div>
              </div>
            )}

              {/* Weekly Streak Row */}
              <div className="kinetic-card member-adherence-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h4 className="type-h3" style={{ fontSize: '1rem', margin: 0 }}>Weekly Workout Adherence</h4>
                  <span className="kinetic-badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--status-success)' }}>5-Day Streak 🔥</span>
                </div>

                <div className="member-adherence-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '12px' }}>
                  {[
                    { day: 'M', dayFull: 'Mon', done: true, title: 'Push A', fullTitle: 'Push Day A' },
                    { day: 'T', dayFull: 'Tue', done: true, title: 'Pull B', fullTitle: 'Pull Day B' },
                    { day: 'W', dayFull: 'Wed', done: true, title: 'HIIT', fullTitle: 'HIIT Cardio' },
                    { day: 'T', dayFull: 'Thu', done: true, title: 'Legs C', fullTitle: 'Legs Day C' },
                    { day: 'F', dayFull: 'Fri', done: true, title: 'Upper', fullTitle: 'Upper Power' },
                    { day: 'S', dayFull: 'Sat', done: false, isToday: true, title: 'Today', fullTitle: 'Today' },
                    { day: 'S', dayFull: 'Sun', done: false, title: 'Rest', fullTitle: 'Rest Day' }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`member-adherence-day-cell ${item.isToday ? 'today' : ''} ${item.done ? 'completed' : ''}`}
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
                      <span className="member-adherence-day-label" style={{ fontSize: '0.72rem', fontWeight: 800, color: item.isToday ? 'var(--accent)' : 'var(--text-tertiary)' }}>
                        <span className="member-adherence-day-short">{item.day}</span>
                        <span className="member-adherence-day-full">{item.dayFull}</span>
                      </span>
                      {item.done ? (
                        <CheckCircle2 size={16} color="var(--status-success)" />
                      ) : (
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.isToday ? 'var(--accent)' : 'var(--border-subtle)' }} />
                      )}
                      <span className="member-adherence-day-title" style={{ fontSize: '0.64rem', color: 'var(--text-secondary)', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
                        <span className="member-adherence-title-short">{item.title}</span>
                        <span className="member-adherence-title-full">{item.fullTitle}</span>
                      </span>
                    </div>
                  ))}
                </div>

                {/* Mobile Adherence Progress Summary (≤ 900px) */}
                <div className="member-adherence-mobile-summary">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: 'var(--status-success)', fontWeight: 900 }}>5/6 Completed</span>
                    <span style={{ color: 'var(--text-tertiary)' }}>•</span>
                    <span style={{ color: 'var(--text-secondary)' }}>Today: Hypertrophy Push</span>
                  </div>
                  <span style={{ fontWeight: 800, color: 'var(--accent)' }}>83% Target</span>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: NUTRITION & DAILY MEALS */}
          {activeTab === 'nutrition' && (
            <>
              {/* Macro Summary Row */}
              <div className="member-macro-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
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
              <div className="member-nutrition-layout" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', alignItems: 'start' }}>
                {/* Meal Timeline */}
                <div className="kinetic-card member-meal-card" style={{ padding: '28px' }}>
                  <div className="member-meal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div>
                      <h3 className="type-h3" style={{ margin: 0 }}>Today's Meal Timeline</h3>
                      <p className="type-small" style={{ margin: '4px 0 0' }}>Prescribed by Coach Marcus Vance • Total {calories} kcal logged.</p>
                    </div>

                    <button type="button" onClick={() => setIsLogMealOpen(true)} className="kinetic-btn-primary" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
                      <Plus size={15} /> Log Custom Meal / Calories
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {mealLogs.map((m, idx) => (
                      <div
                        key={idx}
                        className="member-meal-item"
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
                        <div className="member-meal-info" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <div className="member-meal-top-row">
                            <span className="kinetic-badge member-meal-badge" style={{ fontSize: '0.72rem', padding: '4px 10px' }}>
                              {m.type}
                            </span>
                            <span className="type-caption member-meal-meta-mobile">{m.time} • {m.kcal} kcal</span>
                          </div>
                          <div className="member-meal-details">
                            <strong className="member-meal-name" style={{ fontSize: '0.95rem', color: 'var(--text-primary)', display: 'block' }}>{m.meal}</strong>
                            <span className="type-caption member-meal-meta-desktop">{m.time} • {m.kcal} kcal</span>
                          </div>
                        </div>

                        <div className="member-meal-item-macros" style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', fontWeight: 800 }}>
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
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
                  <span className="type-caption">Current Body Weight</span>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 900, color: '#06b6d4', marginTop: '6px' }}>
                    78.4 kg
                  </div>
                  <p className="type-caption" style={{ marginTop: '6px', color: 'var(--text-secondary)' }}>
                    Lean muscle accretion trajectory locked (12.8% Est Fat)
                  </p>
                </div>
              </div>

              {/* Volume Load Trajectory Visual Bar Chart & Body Weight Section */}
              <div className="member-progress-layout" style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '24px', alignItems: 'stretch' }}>
                {/* Visual Bar Graph Widget */}
                <div className="kinetic-card member-volume-chart-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                      <div>
                        <h3 className="type-h3" style={{ margin: 0, fontSize: '1.2rem' }}>Weekly Tonnage Load Trajectory</h3>
                        <p className="type-small" style={{ margin: '4px 0 0', color: 'var(--text-secondary)' }}>Calculated across compound sets (Bench, Squat, RDL, Press).</p>
                      </div>
                      <span className="kinetic-badge" style={{ padding: '4px 10px' }}>4-Week Telemetry</span>
                    </div>

                    {/* Visual Graph Bars */}
                    <div className="member-volume-bars-container" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '260px', padding: '0 20px 12px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
                      {[
                        { label: 'Week 1', volume: '38.4k kg', height: '55%', color: 'linear-gradient(180deg, #06b6d4 0%, rgba(6, 182, 212, 0.2) 100%)', border: '#06b6d4' },
                        { label: 'Week 2', volume: '41.2k kg', height: '68%', color: 'linear-gradient(180deg, #3b82f6 0%, rgba(59, 130, 246, 0.2) 100%)', border: '#3b82f6' },
                        { label: 'Week 3', volume: '44.8k kg', height: '82%', color: 'linear-gradient(180deg, #f59e0b 0%, rgba(245, 158, 11, 0.2) 100%)', border: '#f59e0b' },
                        { label: 'Week 4 (Current)', volume: '45.2k kg', height: '98%', color: 'linear-gradient(180deg, var(--accent) 0%, rgba(212, 255, 0, 0.25) 100%)', border: 'var(--accent)', glow: true }
                      ].map((bar, idx) => (
                        <div key={idx} className="member-volume-bar-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', flex: 1, height: '100%', justifyContent: 'flex-end' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: bar.border }}>{bar.volume}</span>
                          <div
                            style={{
                              width: '56px',
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

                    {/* Summary Telemetry Metrics Footer */}
                    <div className="member-volume-footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '20px' }}>
                      <div style={{ padding: '10px 14px', borderRadius: 'var(--radius-md)', background: 'var(--surface-input)', border: '1px solid var(--border-subtle)' }}>
                        <span className="type-caption" style={{ color: 'var(--text-tertiary)', fontSize: '0.7rem' }}>Avg Weekly Workload</span>
                        <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>42.4k kg</div>
                      </div>
                      <div style={{ padding: '10px 14px', borderRadius: 'var(--radius-md)', background: 'var(--surface-input)', border: '1px solid var(--border-subtle)' }}>
                        <span className="type-caption" style={{ color: 'var(--text-tertiary)', fontSize: '0.7rem' }}>4-Wk Delta</span>
                        <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--status-success)', marginTop: '2px' }}>+17.7%</div>
                      </div>
                      <div style={{ padding: '10px 14px', borderRadius: 'var(--radius-md)', background: 'var(--surface-input)', border: '1px solid var(--border-subtle)' }}>
                        <span className="type-caption" style={{ color: 'var(--text-tertiary)', fontSize: '0.7rem' }}>Top Lift Density</span>
                        <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent)', marginTop: '2px' }}>Squat / RDL</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Configured Body Weight & Composition Section */}
                <div className="kinetic-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <h3 className="type-h3" style={{ margin: 0, fontSize: '1.1rem' }}>Body Weight Tracker</h3>
                      <span className="kinetic-badge" style={{ fontSize: '0.66rem' }}>Target: 76.0 kg</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {/* Quick Weight Logger Bar */}
                      <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--surface-input)', border: '1px solid var(--border-subtle)' }}>
                        <label className="type-caption" style={{ display: 'block', marginBottom: '6px' }}>Log Fasted Morning Weight</label>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <input
                            type="number"
                            step="0.1"
                            placeholder="e.g. 78.2"
                            className="kinetic-input"
                            style={{ padding: '6px 10px', fontSize: '0.82rem', width: '100px' }}
                          />
                          <button type="button" className="kinetic-btn-primary" style={{ padding: '6px 12px', fontSize: '0.76rem', flex: 1 }}>
                            Log Weight
                          </button>
                        </div>
                      </div>

                      {/* Weight History Log Timeline */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span className="type-caption" style={{ color: 'var(--text-tertiary)' }}>Weight History Trend</span>
                        {[
                          { date: 'Today (Fasted)', weight: '78.4 kg', change: '-0.3 kg', status: 'optimal' },
                          { date: 'Sep 01', weight: '78.7 kg', change: '-0.4 kg', status: 'optimal' },
                          { date: 'Aug 15', weight: '79.1 kg', change: '-0.9 kg', status: 'optimal' }
                        ].map((log, idx) => (
                          <div key={idx} style={{ padding: '10px 12px', borderRadius: 'var(--radius-md)', background: 'var(--surface-input)', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--text-primary)', display: 'block' }}>{log.weight}</span>
                              <span className="type-caption" style={{ fontSize: '0.68rem' }}>{log.date}</span>
                            </div>
                            <span className="kinetic-badge" style={{ fontSize: '0.66rem', background: log.status === 'optimal' ? 'rgba(16, 185, 129, 0.15)' : 'var(--surface-elevated)', color: log.status === 'optimal' ? 'var(--status-success)' : 'var(--text-secondary)' }}>
                              {log.change}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Record (PR) Hall of Fame */}
              <div className="kinetic-card member-pr-card" style={{ padding: '32px' }}>
                <div className="member-pr-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <div className="member-pr-eyebrow-mobile">
                      <span className="type-eyebrow" style={{ color: 'var(--accent)' }}>STRIVEX VERIFIED</span>
                    </div>
                    <h3 className="type-h3" style={{ margin: 0, fontSize: '1.2rem' }}>Personal Record (PR) Hall of Fame</h3>
                    <p className="type-small" style={{ margin: '4px 0 0', color: 'var(--text-secondary)' }}>Verified 1RM estimations and top strength milestones.</p>
                  </div>
                  <span className="type-eyebrow member-pr-eyebrow-desktop" style={{ color: 'var(--accent)' }}>STRIVEX VERIFIED</span>
                </div>

                <div className="member-pr-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                  {PERSONAL_RECORDS.map((pr, idx) => {
                    const Icon = pr.icon;
                    return (
                      <div
                        key={idx}
                        className="member-pr-item"
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
            <div className="kinetic-card member-store-container" style={{ padding: '36px' }}>
              <div className="member-store-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h3 className="type-h3" style={{ margin: 0, fontSize: '1.3rem' }}>StriveX Official Pro Store</h3>
                  <p className="type-small" style={{ margin: '6px 0 0', color: 'var(--text-secondary)' }}>15% Member Tier Discount automatically applied at checkout.</p>
                </div>

                {/* Filter Pills */}
                <div className="member-store-filter-pills" style={{ display: 'flex', gap: '8px' }}>
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
              <div className="member-product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
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
                      {/* Product Image Thumbnail */}
                      <div
                        style={{
                          width: '100%',
                          height: '160px',
                          borderRadius: 'var(--radius-md)',
                          overflow: 'hidden',
                          marginBottom: '14px',
                          background: 'var(--surface-elevated)',
                          border: '1px solid var(--border-subtle)',
                          position: 'relative'
                        }}
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease'
                          }}
                        />
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span className="kinetic-badge" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>{p.tag}</span>
                          <span
                            style={{
                              fontSize: '0.66rem',
                              fontWeight: 800,
                              padding: '2px 8px',
                              borderRadius: 'var(--radius-pill)',
                              background: p.inStock ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                              color: p.inStock ? 'var(--status-success)' : '#ef4444',
                              border: `1px solid ${p.inStock ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
                            }}
                          >
                            {p.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>
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

                      <button
                        type="button"
                        onClick={() => setSelectedProductModal(p)}
                        className="kinetic-btn-secondary"
                        style={{ padding: '8px 16px', fontSize: '0.8rem', gap: '6px' }}
                      >
                        <Eye size={14} /> View Details
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

      {/* Customize & Log Meal / Calorie Modal */}
      {isLogMealOpen && (
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
          onClick={() => setIsLogMealOpen(false)}
        >
          <div
            className="kinetic-card animate-scale-up member-modal-content"
            style={{
              width: '100%',
              maxWidth: '520px',
              padding: '28px',
              background: 'var(--surface-elevated)',
              border: '1px solid var(--border-hover)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Apple size={20} color="var(--accent)" />
                <h4 className="type-h3" style={{ fontSize: '1.2rem', margin: 0 }}>
                  Customize & Log Meal Calories
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsLogMealOpen(false)}
                style={{ color: 'var(--text-secondary)', cursor: 'pointer', background: 'none', border: 'none', fontSize: '1.2rem' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCustomMeal} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="kinetic-input-group" style={{ margin: 0 }}>
                <label className="kinetic-label">Meal Description / Title *</label>
                <input
                  type="text"
                  value={newMealTitle}
                  onChange={(e) => setNewMealTitle(e.target.value)}
                  placeholder="e.g. Salmon Bowl with Brown Rice & Avocado"
                  className="kinetic-input"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="kinetic-input-group" style={{ margin: 0 }}>
                  <label className="kinetic-label">Meal Category</label>
                  <select
                    value={newMealCategory}
                    onChange={(e) => setNewMealCategory(e.target.value)}
                    className="kinetic-input"
                    style={{ background: 'var(--surface-input)' }}
                  >
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Snack">Snack</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Pre-Workout">Pre-Workout</option>
                    <option value="Post-Workout">Post-Workout</option>
                  </select>
                </div>

                <div className="kinetic-input-group" style={{ margin: 0 }}>
                  <label className="kinetic-label">Calories (kcal) *</label>
                  <input
                    type="number"
                    value={newMealKcal}
                    onChange={(e) => setNewMealKcal(e.target.value)}
                    className="kinetic-input"
                    required
                  />
                </div>
              </div>

              {/* Macro Customization */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                <div className="kinetic-input-group" style={{ margin: 0 }}>
                  <label className="kinetic-label">Protein (g)</label>
                  <input
                    type="number"
                    value={newMealP}
                    onChange={(e) => setNewMealP(e.target.value)}
                    className="kinetic-input"
                  />
                </div>
                <div className="kinetic-input-group" style={{ margin: 0 }}>
                  <label className="kinetic-label">Carbs (g)</label>
                  <input
                    type="number"
                    value={newMealC}
                    onChange={(e) => setNewMealC(e.target.value)}
                    className="kinetic-input"
                  />
                </div>
                <div className="kinetic-input-group" style={{ margin: 0 }}>
                  <label className="kinetic-label">Fats (g)</label>
                  <input
                    type="number"
                    value={newMealF}
                    onChange={(e) => setNewMealF(e.target.value)}
                    className="kinetic-input"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsLogMealOpen(false)}
                  className="kinetic-btn-ghost"
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
                <button type="submit" className="kinetic-btn-primary" style={{ flex: 2 }}>
                  <Apple size={16} />
                  <span>Log Meal & Calories</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Details Modal */}
      {selectedProductModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9996,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            padding: '20px'
          }}
          onClick={() => setSelectedProductModal(null)}
        >
          <div
            className="kinetic-card member-modal-content"
            style={{
              width: '100%',
              maxWidth: '520px',
              padding: '32px',
              background: 'var(--surface-elevated)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              animation: 'modalSlide 0.25s ease-out'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span className="kinetic-badge" style={{ fontSize: '0.7rem', padding: '3px 10px' }}>
                    {selectedProductModal.tag}
                  </span>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      padding: '3px 10px',
                      borderRadius: 'var(--radius-pill)',
                      background: selectedProductModal.inStock ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      color: selectedProductModal.inStock ? 'var(--status-success)' : '#ef4444',
                      border: `1px solid ${selectedProductModal.inStock ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
                    }}
                  >
                    {selectedProductModal.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                <h3 className="type-h3" style={{ margin: 0, fontSize: '1.35rem' }}>{selectedProductModal.name}</h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProductModal(null)}
                style={{
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  background: 'var(--surface-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Product Image Showcase Banner */}
            <div
              style={{
                width: '100%',
                height: '200px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                background: 'var(--surface-input)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <img
                src={selectedProductModal.image}
                alt={selectedProductModal.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>

            {/* Price & Rating */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderRadius: 'var(--radius-md)', background: 'var(--surface-input)', border: '1px solid var(--border-subtle)' }}>
              <div>
                <span className="type-caption" style={{ display: 'block', color: 'var(--text-tertiary)' }}>Member Tier Price</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '2px' }}>
                  <span style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>{selectedProductModal.price}</span>
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-tertiary)', textDecoration: 'line-through' }}>{selectedProductModal.orig}</span>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span className="type-caption" style={{ display: 'block', color: 'var(--text-tertiary)' }}>Verified Rating</span>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: '#f59e0b', marginTop: '2px', display: 'block' }}>{selectedProductModal.rating}</span>
              </div>
            </div>

            {/* Product Overview */}
            <div>
              <h5 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-tertiary)', margin: '0 0 8px 0' }}>Product Telemetry & Specs</h5>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                {selectedProductModal.desc} Formulated specifically for StriveX high-performance athletes requiring maximum cellular absorption and rapid recovery telemetry.
              </p>
            </div>

            {/* Specifications Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ padding: '10px 14px', borderRadius: 'var(--radius-md)', background: 'var(--surface-input)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={18} color="var(--accent)" />
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', display: 'block' }}>Quality Guarantee</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>Lab Tested Pure</span>
                </div>
              </div>

              <div style={{ padding: '10px 14px', borderRadius: 'var(--radius-md)', background: 'var(--surface-input)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Truck size={18} color="#06b6d4" />
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', display: 'block' }}>Facility Delivery</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>Same-Day Locker</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ marginTop: '8px' }}>
              <button
                type="button"
                onClick={() => setSelectedProductModal(null)}
                className="kinetic-btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NOTIFICATION DRAWER MODAL */}
      <NotificationDrawerModal
        isOpen={isNotificationDrawerOpen}
        onClose={() => setIsNotificationDrawerOpen(false)}
        userRole="member"
      />

      {/* MOBILE DRAWER NAVIGATION OVERLAY */}
      {isMobileNavOpen && (
        <div className="member-mobile-drawer" onClick={() => setIsMobileNavOpen(false)}>
          <div className="member-mobile-drawer-sheet" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Drawer Brand Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111', fontWeight: 900 }}>
                    <Dumbbell size={18} />
                  </div>
                  <div>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.05rem', color: 'var(--text-primary)', letterSpacing: '0.04em' }}>STRIVEX</span>
                    <span style={{ display: 'block', fontSize: '0.62rem', color: 'var(--text-tertiary)', letterSpacing: '0.08em' }}>ATHLETE SUITE</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileNavOpen(false)}
                  style={{
                    background: 'var(--surface-input)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Navigation Links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { id: 'overview', label: 'Workout Tracker', icon: Dumbbell },
                  { id: 'nutrition', label: 'Nutrition & Meals', icon: Apple },
                  { id: 'analytics', label: 'Progress & PRs', icon: TrendingUp },
                  { id: 'store', label: 'StriveX Store', icon: ShoppingBag },
                  { id: 'chat', label: 'Coach Messages', icon: MessageSquare }
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileNavOpen(false);
                      }}
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
                        fontSize: '0.88rem',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      <Icon size={18} color={isActive ? 'var(--accent)' : 'var(--text-tertiary)'} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Profile & Footer in Drawer */}
            <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop'}
                  alt={user?.name || 'Athlete'}
                  style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--accent)' }}
                />
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {user?.name || 'Alex Mercer'}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>{user?.tier || 'Pro Athlete'}</div>
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
                  onClick={() => {
                    setIsMobileNavOpen(false);
                    setIsSettingsOpen(true);
                  }}
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
          </div>
        </div>
      )}

      {/* STICKY MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="member-mobile-bottom-nav">
        {[
          { id: 'overview', label: 'Workout', icon: Dumbbell },
          { id: 'nutrition', label: 'Nutrition', icon: Apple },
          { id: 'analytics', label: 'Progress', icon: TrendingUp },
          { id: 'store', label: 'Store', icon: ShoppingBag },
          { id: 'chat', label: 'Coach', icon: MessageSquare }
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`member-mobile-bottom-tab ${isActive ? 'active' : ''}`}
            >
              <Icon size={19} color={isActive ? 'var(--accent)' : 'var(--text-tertiary)'} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

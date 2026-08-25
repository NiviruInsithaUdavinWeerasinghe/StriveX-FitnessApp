/**
 * StriveX Platform Master Mock Data Store
 */

export const INITIAL_USER_PROFILE = {
  id: 'usr_001',
  name: 'Alex Rivera',
  email: 'alex.rivera@athletemail.com',
  phone: '+94771234567',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'member',
  tier: 'Pro Athlete',
  joinDate: 'Jan 2026',
  streakDays: 6,
  assignedTrainer: {
    name: 'Coach Marcus Vance',
    specialty: 'Hypertrophy & Biomechanics',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&auto=format&fit=crop&q=80'
  },
  stats: {
    caloriesBurned: 680,
    calorieGoal: 850,
    activeMinutes: 52,
    activeMinutesGoal: 60,
    heartRateAvg: 142,
    heartRateMax: 178,
    waterIntakeMl: 2250,
    waterGoalMl: 3000,
    workoutsCompletedThisWeek: 4,
    weeklyWorkoutGoal: 5
  }
};

export const PRICING_TIERS = [
  {
    id: 'tier-starter',
    name: 'Starter Tier',
    tagline: 'Ideal for fitness enthusiasts building consistency.',
    monthlyPrice: 29,
    annualPrice: 24,
    badge: null,
    features: [
      'Full facility & weight room access',
      'Standard locker & shower amenities',
      'Access to StriveX mobile web app',
      'Monthly biometric body scan',
      'Standard community support'
    ]
  },
  {
    id: 'tier-pro',
    name: 'Pro Athlete',
    tagline: 'Engineered for dedicated athletes seeking progressive overload.',
    monthlyPrice: 49,
    annualPrice: 39,
    badge: 'Most Popular',
    highlighted: true,
    features: [
      'Everything in Starter Tier',
      'Dedicated 1-on-1 Trainer Assignment',
      'Custom weekly progressive workout builder',
      'Real-time direct chat with Coach Marcus',
      'Unlimited group HIIT & Recovery sessions',
      'Advanced biometric & volume progression analytics'
    ]
  },
  {
    id: 'tier-elite',
    name: 'Elite VIP',
    tagline: 'Total performance optimization with recovery suite & nutrition.',
    monthlyPrice: 89,
    annualPrice: 71,
    badge: 'VIP Experience',
    features: [
      'Everything in Pro Athlete Tier',
      'Custom macro & nutritional meal planning',
      'Unlimited cryotherapy & sauna recovery lounge',
      'Priority 1-on-1 personal training reservations',
      '24/7 VIP coach hotline & biomechanics review',
      'Exclusive StriveX Performance gear pack'
    ]
  }
];

export const LIVE_CLASSES = [
  {
    id: 'cls-1',
    day: 'Monday',
    title: 'High-Voltage HIIT MetCon',
    category: 'HIIT',
    time: '06:30 AM - 07:15 AM',
    duration: '45 mins',
    intensity: 'High',
    instructor: 'Elena Rostova',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    capacity: 20,
    reserved: 16,
    description: 'Explosive functional intervals targeting cardiovascular capacity and lactate threshold.'
  },
  {
    id: 'cls-2',
    day: 'Monday',
    title: 'Hypertrophy Power Bench & Upper',
    category: 'Strength',
    time: '05:30 PM - 06:30 PM',
    duration: '60 mins',
    intensity: 'Extreme',
    instructor: 'Coach Marcus Vance',
    instructorAvatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&auto=format&fit=crop&q=80',
    capacity: 15,
    reserved: 12,
    description: 'Heavy barbell compound lifts focused on chest density and progressive mechanical tension.'
  },
  {
    id: 'cls-3',
    day: 'Tuesday',
    title: 'Vinyasa Flow & Kinetic Mobility',
    category: 'Mobility',
    time: '07:00 AM - 07:50 AM',
    duration: '50 mins',
    intensity: 'Moderate',
    instructor: 'Chloe Bennett',
    instructorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    capacity: 25,
    reserved: 18,
    description: 'Joint decompressions, dynamic hip openers, and deep spinal mobility for recovery.'
  },
  {
    id: 'cls-4',
    day: 'Wednesday',
    title: 'Glute & Quad Overload Lab',
    category: 'Hypertrophy',
    time: '06:00 PM - 07:00 PM',
    duration: '60 mins',
    intensity: 'High',
    instructor: 'Elena Rostova',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    capacity: 18,
    reserved: 15,
    description: 'Barbell squats, Bulgarian split squats, and leg press drop sets.'
  },
  {
    id: 'cls-5',
    day: 'Thursday',
    title: 'Sprint Conditioning & Agility',
    category: 'Cardio',
    time: '07:30 AM - 08:15 AM',
    duration: '45 mins',
    intensity: 'High',
    instructor: 'David Kim',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    capacity: 20,
    reserved: 14,
    description: 'Curved treadmill sprints, plyometric box jumps, and reactive agility drills.'
  },
  {
    id: 'cls-6',
    day: 'Friday',
    title: 'Total Body Kinetic Blast',
    category: 'HIIT',
    time: '05:30 PM - 06:15 PM',
    duration: '45 mins',
    intensity: 'High',
    instructor: 'Coach Marcus Vance',
    instructorAvatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&auto=format&fit=crop&q=80',
    capacity: 22,
    reserved: 21,
    description: 'Full-body functional circuit combining kettlebells, ski-ergs, and battle ropes.'
  }
];

export const TODAY_ROUTINE_EXERCISES = [
  {
    id: 'ex-1',
    name: 'Barbell Incline Bench Press',
    muscleGroup: 'Upper Chest & Front Delts',
    targetSets: 4,
    targetReps: '8-10',
    targetRestSec: 90,
    sets: [
      { setNum: 1, weight: 70, reps: 10, completed: true },
      { setNum: 2, weight: 75, reps: 9, completed: true },
      { setNum: 3, weight: 80, reps: 8, completed: false },
      { setNum: 4, weight: 80, reps: 8, completed: false }
    ]
  },
  {
    id: 'ex-2',
    name: 'Standing Cable Lateral Raises',
    muscleGroup: 'Lateral Deltoids',
    targetSets: 4,
    targetReps: '12-15',
    targetRestSec: 60,
    sets: [
      { setNum: 1, weight: 12.5, reps: 15, completed: false },
      { setNum: 2, weight: 12.5, reps: 14, completed: false },
      { setNum: 3, weight: 15, reps: 12, completed: false },
      { setNum: 4, weight: 15, reps: 12, completed: false }
    ]
  },
  {
    id: 'ex-3',
    name: 'Weighted Tricep Dips',
    muscleGroup: 'Triceps & Lower Pecs',
    targetSets: 3,
    targetReps: '10-12',
    targetRestSec: 75,
    sets: [
      { setNum: 1, weight: 15, reps: 12, completed: false },
      { setNum: 2, weight: 20, reps: 10, completed: false },
      { setNum: 3, weight: 20, reps: 10, completed: false }
    ]
  },
  {
    id: 'ex-4',
    name: 'Overhead Cable Tricep Extension',
    muscleGroup: 'Triceps Long Head',
    targetSets: 3,
    targetReps: '12-15',
    targetRestSec: 60,
    sets: [
      { setNum: 1, weight: 25, reps: 15, completed: false },
      { setNum: 2, weight: 27.5, reps: 13, completed: false },
      { setNum: 3, weight: 30, reps: 12, completed: false }
    ]
  }
];

export const TRAINER_CLIENTS = [
  {
    id: 1,
    name: 'Alex Rivera',
    email: 'alex.rivera@athletemail.com',
    phone: '+94771234567',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    tier: 'Pro Athlete',
    goal: 'Hypertrophy & Strength',
    status: 'Active',
    complianceRate: 94,
    lastActive: '2 hours ago',
    activeRoutine: 'Hypertrophy Push Day A',
    weightKg: 78.4,
    weightHistory: [79.8, 79.2, 78.9, 78.5, 78.4]
  },
  {
    id: 2,
    name: 'Elena Rostova',
    email: 'elena.r@gympulse.org',
    phone: '+94719876543',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    tier: 'Elite VIP',
    goal: 'Fat Loss & Agility',
    status: 'Active',
    complianceRate: 91,
    lastActive: '5 hours ago',
    activeRoutine: 'MetCon Conditioning B',
    weightKg: 62.1,
    weightHistory: [64.5, 63.8, 63.0, 62.5, 62.1]
  },
  {
    id: 3,
    name: 'David Kim',
    email: 'd.kim92@outlook.com',
    phone: '+94755512345',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    tier: 'Pro Athlete',
    goal: 'Powerlifting Total',
    status: 'Needs Attention',
    complianceRate: 64,
    lastActive: '4 days ago',
    activeRoutine: 'Squat/Deadlift Heavy C',
    weightKg: 86.2,
    weightHistory: [85.5, 85.9, 86.1, 86.0, 86.2]
  },
  {
    id: 4,
    name: 'Sarah Jenkins',
    email: 'sarah.j@fitmail.com',
    phone: '+94783334455',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    tier: 'Starter Tier',
    goal: 'Postural Rehabilitation',
    status: 'Active',
    complianceRate: 88,
    lastActive: 'Yesterday',
    activeRoutine: 'Thoracic & Core Flow',
    weightKg: 58.0,
    weightHistory: [59.0, 58.6, 58.3, 58.1, 58.0]
  }
];

export const ADMIN_TRANSACTIONS = [
  {
    id: 'INV-9104',
    date: '2026-08-25',
    member: 'Alex Rivera',
    tier: 'Pro Athlete',
    amount: 49.00,
    method: 'Visa •••• 4242',
    status: 'Completed'
  },
  {
    id: 'INV-9103',
    date: '2026-08-25',
    member: 'Elena Rostova',
    tier: 'Elite VIP',
    amount: 89.00,
    method: 'Mastercard •••• 8821',
    status: 'Completed'
  },
  {
    id: 'INV-9102',
    date: '2026-08-24',
    member: 'David Kim',
    tier: 'Pro Athlete',
    amount: 49.00,
    method: 'Apple Pay',
    status: 'Completed'
  },
  {
    id: 'INV-9101',
    date: '2026-08-23',
    member: 'Sarah Jenkins',
    tier: 'Starter Tier',
    amount: 29.00,
    method: 'Visa •••• 1190',
    status: 'Completed'
  },
  {
    id: 'INV-9100',
    date: '2026-08-22',
    member: 'Michael Thorne',
    tier: 'Elite VIP',
    amount: 89.00,
    method: 'Amex •••• 3004',
    status: 'Refunded'
  }
];

export const STAFF_MEMBERS = [
  {
    id: 'stf-1',
    name: 'Coach Marcus Vance',
    role: 'Head Strength Coach',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&auto=format&fit=crop&q=80',
    email: 'marcus@strivex.fit',
    clientsCount: 28,
    status: 'Active',
    permissions: {
      editPlans: true,
      viewBilling: false,
      manageUsers: true
    }
  },
  {
    id: 'stf-2',
    name: 'Elena Rostova',
    role: 'Senior HIIT Specialist',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    email: 'elena@strivex.fit',
    clientsCount: 22,
    status: 'Active',
    permissions: {
      editPlans: true,
      viewBilling: false,
      manageUsers: false
    }
  },
  {
    id: 'stf-3',
    name: 'Chloe Bennett',
    role: 'Mobility & Physical Rehab Coach',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    email: 'chloe@strivex.fit',
    clientsCount: 19,
    status: 'Active',
    permissions: {
      editPlans: true,
      viewBilling: false,
      manageUsers: false
    }
  },
  {
    id: 'stf-4',
    name: 'Niviru Weerasinghe',
    role: 'Operations Director & Admin',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    email: 'niviruedu2006@gmail.com',
    clientsCount: 0,
    status: 'Active',
    permissions: {
      editPlans: true,
      viewBilling: true,
      manageUsers: true
    }
  }
];

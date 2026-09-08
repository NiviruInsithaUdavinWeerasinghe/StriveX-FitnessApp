import { createContext, useContext, useState } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext();

const DEMO_USERS = {
  member: {
    id: 'usr_mem_01',
    name: 'Alex Mercer',
    email: 'alex.mercer@strivex.fit',
    phone: '0778945612',
    role: 'member',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop',
    tier: 'Pro Athlete',
    streakDays: 5,
    todayCalories: 680,
    targetCalories: 800,
    activeMinutes: 54,
    targetMinutes: 60,
    assignedTrainer: 'Coach Marcus Vance',
    joinedDate: 'Jan 2026'
  },
  selfGuidedMember: {
    id: 'usr_mem_02',
    name: 'Jordan Lee (Self-Guided)',
    email: 'jordan.lee@strivex.fit',
    phone: '0719876543',
    role: 'member',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop',
    tier: 'Starter Member',
    streakDays: 2,
    todayCalories: 420,
    targetCalories: 750,
    activeMinutes: 30,
    targetMinutes: 60,
    assignedTrainer: null, // No coach assigned
    joinedDate: 'Feb 2026'
  },
  trainer: {
    id: 'usr_trn_01',
    name: 'Coach Marcus Vance',
    email: 'marcus.vance@strivex.fit',
    phone: '0712345678',
    role: 'trainer',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=250&auto=format&fit=crop',
    specialization: 'Hypertrophy & Strength Conditioning',
    activeClients: 28,
    rating: 4.9,
    sessionsToday: 4
  },
  admin: {
    id: 'usr_adm_01',
    name: 'Elena Drake',
    email: 'elena.drake@strivex.fit',
    phone: '0770011223',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=250&auto=format&fit=crop',
    title: 'Operations Director',
    facility: 'StriveX HQ Colombo'
  }
};

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState('guest');
  const [user, setUser] = useState(null);
  const [publishedRoutines, setPublishedRoutines] = useState([]);
  const { addToast } = useToast();

  const switchRole = (newRole) => {
    if (newRole === 'guest') {
      setRole('guest');
      setUser(null);
      addToast({
        type: 'info',
        title: 'Guest Mode Active',
        message: 'Viewing public gateway and landing page'
      });
      return;
    }

    if (DEMO_USERS[newRole]) {
      setRole(newRole);
      setUser(DEMO_USERS[newRole]);
      addToast({
        type: 'success',
        title: `Switched to ${newRole.toUpperCase()} View`,
        message: `Logged in as ${DEMO_USERS[newRole].name}`
      });
    }
  };

  const publishRoutine = (routineData) => {
    const newRoutine = {
      id: `rtn_dyn_${Date.now()}`,
      title: routineData.title,
      split: routineData.split || 'Custom Program',
      coach: 'Coach Marcus Vance',
      duration: routineData.duration || '50 mins',
      clientName: routineData.client,
      description: routineData.notes || 'Custom program published directly by your coach.',
      exercises: (routineData.exercises || []).map((ex) => ({
        name: ex.name,
        sets: `${ex.sets}×${ex.reps}`,
        muscle: ex.muscle || ex.target
      }))
    };

    setPublishedRoutines((prev) => [newRoutine, ...prev]);
  };

  const login = (roleType, customData = {}) => {
    const baseUser = DEMO_USERS[roleType] || DEMO_USERS.member;
    const activeUser = { ...baseUser, ...customData, role: roleType };
    setRole(roleType);
    setUser(activeUser);
    addToast({
      type: 'success',
      title: 'Welcome Back',
      message: `Signed in as ${activeUser.name} (${roleType})`
    });
  };

  const logout = () => {
    setRole('guest');
    setUser(null);
    addToast({
      type: 'info',
      title: 'Signed Out',
      message: 'You have been returned to the public landing page'
    });
  };

  const updateProfile = (updates) => {
    setUser((prev) => ({ ...prev, ...updates }));
    addToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your changes have been saved successfully'
    });
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        user,
        isAuthenticated: role !== 'guest',
        publishedRoutines,
        publishRoutine,
        switchRole,
        login,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

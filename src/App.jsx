import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider, useToast } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastContainer } from './components/ui/ToastContainer';

// Public Landing Page Components
import { PublicNavbar } from './components/public/PublicNavbar';
import { HeroSection } from './components/public/HeroSection';
import { FeatureMatrix } from './components/public/FeatureMatrix';
import { ClassScheduleSection } from './components/public/ClassScheduleSection';
import { TrainerRosterSection } from './components/public/TrainerRosterSection';
import { PricingMatrix } from './components/public/PricingMatrix';
import { TestimonialsSection } from './components/public/TestimonialsSection';
import { Footer } from './components/public/Footer';

// Member Components
import { MemberDashboard } from './components/member/MemberDashboard';

// Modals
import { RegistrationModal } from './components/auth/RegistrationModal';
import { LoginModal } from './components/auth/LoginModal';
import { DemoVideoModal } from './components/public/DemoVideoModal';
import { ClassBookingModal } from './components/public/ClassBookingModal';

function StriveXApp() {
  const { role } = useAuth();
  const { addToast } = useToast();

  // Active navigation section
  const [activeSection, setActiveSection] = useState('home');

  // Modal states
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isVideoDemoOpen, setIsVideoDemoOpen] = useState(false);
  const [bookingClass, setBookingClass] = useState(null);
  const [reservedClassIds, setReservedClassIds] = useState([]);
  const [selectedPlanDetails, setSelectedPlanDetails] = useState({ plan: 'Pro Athlete', isAnnual: true });

  // Handle class reservation
  const handleConfirmBooking = (classId) => {
    setReservedClassIds((prev) => [...prev, classId]);
  };

  // Handle pricing plan selection
  const handleSelectPlan = (planName, isAnnual) => {
    setSelectedPlanDetails({ plan: planName, isAnnual });
    setIsRegisterOpen(true);
  };

  // Handle trainer consultation
  const handleConsultTrainer = (_trainer) => {
    setSelectedPlanDetails({ plan: 'Pro Athlete', isAnnual: true });
    setIsRegisterOpen(true);
  };

  // Handle feature exploration
  const handleExploreFeature = (_featureId) => {
    setIsVideoDemoOpen(true);
  };

  // Workout launcher placeholder (for Interface 2.2 next task)
  const handleStartWorkout = () => {
    addToast({
      type: 'info',
      title: 'Ready for Interface 2.2',
      message: 'Active Workout Logger Session modal will be built in the next step'
    });
  };

  // Settings placeholder (for Interface 2.3 next task)
  const handleOpenSettings = () => {
    addToast({
      type: 'info',
      title: 'Ready for Interface 2.3',
      message: 'Member Profile & Settings view will be built in the upcoming step'
    });
  };

  // Chat placeholder (for Interface 2.4 next task)
  const handleOpenChat = () => {
    addToast({
      type: 'info',
      title: 'Ready for Interface 2.4',
      message: 'Member-Trainer Direct Chat view will be built in the upcoming step'
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* 1. PUBLIC GUEST LANDING PAGE */}
      {role === 'guest' && (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <PublicNavbar
            onOpenLogin={() => setIsLoginOpen(true)}
            onOpenRegister={() => setIsRegisterOpen(true)}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />

          <main style={{ flex: 1 }}>
            <HeroSection
              onStartFreeTrial={() => setIsRegisterOpen(true)}
              onOpenVideoDemo={() => setIsVideoDemoOpen(true)}
            />

            <FeatureMatrix onExploreFeature={handleExploreFeature} />

            <ClassScheduleSection
              onReserveClass={(cls) => setBookingClass(cls)}
              reservedClassIds={reservedClassIds}
            />

            <TrainerRosterSection onConsultTrainer={handleConsultTrainer} />

            <PricingMatrix onSelectPlan={handleSelectPlan} />

            <TestimonialsSection />
          </main>

          <Footer
            onNavClick={(id) => {
              setActiveSection(id);
              const el = document.getElementById(id);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenRegister={() => setIsRegisterOpen(true)}
            onOpenLogin={() => setIsLoginOpen(true)}
          />
        </div>
      )}

      {/* 2. MEMBER EXPERIENCE: INTERFACE 2.1 (ATHLETE HUB) */}
      {role === 'member' && (
        <MemberDashboard
          onStartWorkout={handleStartWorkout}
          onOpenSettings={handleOpenSettings}
          onOpenChat={handleOpenChat}
        />
      )}

      {/* Other Roles placeholders */}
      {role !== 'guest' && role !== 'member' && (
        <div
          style={{
            minHeight: '70vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 24px',
            textAlign: 'center'
          }}
        >
          <div className="kinetic-badge" style={{ marginBottom: '16px' }}>
            <span>ROLE: {role.toUpperCase()}</span>
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>
            {role === 'trainer' ? 'Trainer Portal' : 'Admin Command Center'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '540px', marginBottom: '24px' }}>
            Awaiting order execution per master plan.
          </p>
        </div>
      )}

      {/* Interactive Modals */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        initialPlan={selectedPlanDetails.plan}
        isAnnual={selectedPlanDetails.isAnnual}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={() => setIsRegisterOpen(true)}
      />

      <DemoVideoModal
        isOpen={isVideoDemoOpen}
        onClose={() => setIsVideoDemoOpen(false)}
        onStartTrial={() => setIsRegisterOpen(true)}
      />

      <ClassBookingModal
        isOpen={!!bookingClass}
        onClose={() => setBookingClass(null)}
        classData={bookingClass}
        onConfirmBooking={handleConfirmBooking}
      />

      {/* Global Toast System */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <StriveXApp />
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

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

// Member & Trainer Components
import { MemberDashboard } from './components/member/MemberDashboard';
import { TrainerDashboard } from './components/trainer/TrainerDashboard';

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

  // Routine builder trigger placeholder (for Interface 3.2 next task)
  const handleOpenRoutineBuilder = (client) => {
    addToast({
      type: 'info',
      title: 'Ready for Interface 3.2',
      message: `Interactive Program Builder for ${client.name} will be built in the next step`
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

      {/* 2. MEMBER EXPERIENCE (ATHLETE HUB) */}
      {role === 'member' && <MemberDashboard />}

      {/* 3. TRAINER EXPERIENCE: INTERFACE 3.1 (TRAINER COMMAND SUITE) */}
      {role === 'trainer' && (
        <TrainerDashboard
          onOpenRoutineBuilder={handleOpenRoutineBuilder}
        />
      )}

      {/* 4. ADMIN EXPERIENCE (Awaiting Module 4) */}
      {role === 'admin' && (
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
            <span>ROLE: ADMIN OPERATIONS</span>
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>
            Admin Command Center
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '540px', marginBottom: '24px' }}>
            Scheduled for Module 4 execution in master plan.
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

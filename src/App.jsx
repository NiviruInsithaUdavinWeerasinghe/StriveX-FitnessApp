import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
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

// Member, Trainer & Admin Components
import { MemberDashboard } from './components/member/MemberDashboard';
import { TrainerDashboard } from './components/trainer/TrainerDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';

// Modals
import { RegistrationModal } from './components/auth/RegistrationModal';
import { LoginModal } from './components/auth/LoginModal';
import { DemoVideoModal } from './components/public/DemoVideoModal';
import { ClassBookingModal } from './components/public/ClassBookingModal';
import { MyBookingsModal } from './components/public/MyBookingsModal';
import { LegalModal } from './components/public/LegalModal';

function StriveXApp() {
  const { role } = useAuth();

  // Active navigation section
  const [activeSection, setActiveSection] = useState('home');

  // Modal states
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isVideoDemoOpen, setIsVideoDemoOpen] = useState(false);
  const [isBookingsOpen, setIsBookingsOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [legalDocType, setLegalDocType] = useState('privacy');
  const [bookingClass, setBookingClass] = useState(null);
  const [reservedClassIds, setReservedClassIds] = useState([]);
  const [selectedPlanDetails, setSelectedPlanDetails] = useState({ plan: 'Pro Athlete', isAnnual: true });

  // Handle class reservation
  const handleConfirmBooking = (classId) => {
    setReservedClassIds((prev) => [...prev, classId]);
  };

  const handleCancelBooking = (classId) => {
    setReservedClassIds((prev) => prev.filter((id) => id !== classId));
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

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* 1. PUBLIC GUEST LANDING PAGE */}
      {role === 'guest' && (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <PublicNavbar
            onOpenLogin={() => setIsLoginOpen(true)}
            onOpenRegister={() => setIsRegisterOpen(true)}
            onOpenBookings={() => setIsBookingsOpen(true)}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            reservedCount={reservedClassIds.length}
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
            onOpenLegal={(type) => {
              setLegalDocType(type);
              setIsLegalOpen(true);
            }}
          />
        </div>
      )}

      {/* 2. MEMBER EXPERIENCE (ATHLETE HUB) */}
      {role === 'member' && <MemberDashboard />}

      {/* 3. TRAINER EXPERIENCE: INTERFACE 3.1 & 3.2 (TRAINER COMMAND SUITE) */}
      {role === 'trainer' && <TrainerDashboard />}

      {/* 4. ADMIN EXPERIENCE: INTERFACE 4.1 (ENTERPRISE COMMAND CENTER) */}
      {role === 'admin' && <AdminDashboard />}

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

      <MyBookingsModal
        isOpen={isBookingsOpen}
        onClose={() => setIsBookingsOpen(false)}
        reservedClassIds={reservedClassIds}
        onCancelBooking={handleCancelBooking}
      />

      <LegalModal
        isOpen={isLegalOpen}
        onClose={() => setIsLegalOpen(false)}
        docType={legalDocType}
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

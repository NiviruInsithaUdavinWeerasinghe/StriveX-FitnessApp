import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider, useToast } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastContainer } from './components/ui/ToastContainer';
import { DeveloperToolbar } from './components/ui/DeveloperToolbar';

// Public Landing Page Components
import { PublicNavbar } from './components/public/PublicNavbar';
import { HeroSection } from './components/public/HeroSection';
import { FeatureMatrix } from './components/public/FeatureMatrix';
import { ClassScheduleSection } from './components/public/ClassScheduleSection';
import { TrainerRosterSection } from './components/public/TrainerRosterSection';
import { PricingMatrix } from './components/public/PricingMatrix';
import { TestimonialsSection } from './components/public/TestimonialsSection';
import { Footer } from './components/public/Footer';

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

  // Viewport mode ('responsive' | 'desktop' | 'mobile')
  const [viewportMode, setViewportMode] = useState('responsive');

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
  const handleConsultTrainer = (trainer) => {
    addToast({
      type: 'info',
      title: 'Consultation Requested',
      message: `Direct consultation request submitted to ${trainer.name}`
    });
  };

  // Handle feature exploration
  const handleExploreFeature = (featureId) => {
    addToast({
      type: 'info',
      title: 'Feature Capability',
      message: `Exploring ${featureId.replace('-', ' ').toUpperCase()} module`
    });
  };

  // Viewport framing container styles
  const getViewportStyle = () => {
    if (viewportMode === 'desktop') {
      return {
        maxWidth: '1440px',
        margin: '24px auto',
        borderRadius: '16px',
        border: '12px solid #222222',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
        overflow: 'hidden',
        background: 'var(--bg-primary)'
      };
    }
    if (viewportMode === 'mobile') {
      return {
        maxWidth: '390px',
        margin: '24px auto',
        borderRadius: '40px',
        border: '12px solid #1e1e1e',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
        overflow: 'hidden',
        background: 'var(--bg-primary)',
        minHeight: '844px'
      };
    }
    return {
      width: '100%',
      minHeight: '100vh',
      background: 'var(--bg-primary)'
    };
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      {/* Figma Companion Developer Toolbar */}
      <DeveloperToolbar viewportMode={viewportMode} setViewportMode={setViewportMode} />

      {/* Main Viewport Container */}
      <div style={getViewportStyle()}>
        {/* PUBLIC LANDING PAGE (Step 1 Review) */}
        {role === 'guest' ? (
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
        ) : (
          /* Placeholder notification when user clicks another role in developer toolbar */
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
              <span>ROLE VIEW: {role.toUpperCase()}</span>
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>
              {role === 'member' ? 'Member Athlete Hub' : role === 'trainer' ? 'Trainer Portal' : 'Admin Command Center'}
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '540px', marginBottom: '24px' }}>
              Currently in Step 1 (Public Landing Page review). Switch back to "Guest" on the top toolbar to explore the complete Landing Page.
            </p>
            <button
              type="button"
              onClick={() => {
                // switch back to guest
                window.location.reload();
              }}
              className="kinetic-btn-primary"
            >
              Back to Landing Page
            </button>
          </div>
        )}
      </div>

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

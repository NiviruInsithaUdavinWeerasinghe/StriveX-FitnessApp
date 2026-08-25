import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './components/public/LandingPage';
import { RegisterModal } from './components/auth/RegisterModal';
import { LoginModal } from './components/auth/LoginModal';
import { DeveloperBar } from './components/ui/DeveloperBar';
import { CommandPalette } from './components/ui/CommandPalette';
import { MemberDashboard } from './components/member/MemberDashboard';
import { ActiveWorkoutModal } from './components/member/ActiveWorkoutModal';
import { MemberSettings } from './components/member/MemberSettings';
import { useToast } from './context/ToastContext';
import './App.css';

export function App() {
  const { showToast } = useToast();
  const [theme, setTheme] = useState('dark');
  const [currentRole, setCurrentRole] = useState('guest'); // 'guest' | 'member' | 'trainer' | 'admin'
  const [viewportMode, setViewportMode] = useState('full'); // 'full' | 'desktop' | 'mobile'
  
  // Modals
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [registerInitialTier, setRegisterInitialTier] = useState('tier-pro');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isActiveWorkoutOpen, setIsActiveWorkoutOpen] = useState(false);
  
  // Member Navigation Views
  const [memberView, setMemberView] = useState('dashboard'); // 'dashboard' | 'settings' | 'chat'
  const [completedWorkoutSummary, setCompletedWorkoutSummary] = useState(null);

  // Apply Theme to root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Global Keyboard Shortcuts (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    showToast({
      type: 'info',
      title: `${next === 'dark' ? 'Dark' : 'Light'} Mode Activated`,
      message: `Theme updated to ${next} canvas.`
    });
  };

  const handleRoleChange = (role) => {
    setCurrentRole(role);
    setMemberView('dashboard');
    const roleNames = {
      guest: 'Public Gateway',
      member: 'Member Athlete Hub',
      trainer: 'Trainer Portal',
      admin: 'Admin Operations'
    };
    showToast({
      type: 'info',
      title: 'Portal Switched',
      message: `Navigated to ${roleNames[role] || role}`
    });
  };

  const handleOpenRegister = (tierId = 'tier-pro') => {
    setRegisterInitialTier(tierId);
    setIsRegisterOpen(true);
  };

  const handleSectionScroll = (sectionId) => {
    if (currentRole !== 'guest') {
      setCurrentRole('guest');
    }
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleRegistrationSuccess = (athleteData) => {
    setCurrentRole('member');
    setMemberView('dashboard');
  };

  return (
    <div className={`simulator-container ${viewportMode !== 'full' ? 'is-simulated' : ''}`}>
      <div className={`simulator-frame mode-${viewportMode}`}>
        {/* Navigation Bar */}
        <Navbar
          currentRole={currentRole}
          onRoleChange={handleRoleChange}
          theme={theme}
          onThemeToggle={toggleTheme}
          onOpenLogin={() => setIsLoginOpen(true)}
          onOpenRegister={handleOpenRegister}
          onOpenSearch={() => setIsCommandPaletteOpen(true)}
          onSectionClick={handleSectionScroll}
        />

        {/* Main Workspace View */}
        <main className="strivex-main-content">
          {currentRole === 'guest' && (
            <LandingPage
              onOpenRegister={handleOpenRegister}
              onOpenLogin={() => setIsLoginOpen(true)}
              onRoleChange={handleRoleChange}
            />
          )}

          {currentRole === 'member' && (
            memberView === 'settings' ? (
              <MemberSettings onBackToDashboard={() => setMemberView('dashboard')} />
            ) : (
              <MemberDashboard
                onStartWorkout={() => setIsActiveWorkoutOpen(true)}
                onOpenChat={() => {
                  showToast({ type: 'info', title: 'Coach Chat', message: 'Connecting to Coach Marcus Vance...' });
                }}
                onOpenSettings={() => setMemberView('settings')}
                completedWorkoutData={completedWorkoutSummary}
              />
            )
          )}

          {currentRole === 'trainer' && (
            <div className="placeholder-portal-card glass-panel">
              <h3>Trainer Portal Workspace</h3>
              <p>Step 3 in roadmap. Use role switcher below or top dropdown to return to Public or Athlete Hub.</p>
              <button className="btn btn-primary" onClick={() => handleRoleChange('guest')}>
                Return to Public Landing
              </button>
            </div>
          )}

          {currentRole === 'admin' && (
            <div className="placeholder-portal-card glass-panel">
              <h3>Admin Command Operations</h3>
              <p>Step 4 in roadmap. Use role switcher below or top dropdown to return to Public or Athlete Hub.</p>
              <button className="btn btn-primary" onClick={() => handleRoleChange('guest')}>
                Return to Public Landing
              </button>
            </div>
          )}
        </main>

        {/* Footer */}
        <Footer
          onSectionClick={handleSectionScroll}
          onOpenRegister={handleOpenRegister}
          onRoleChange={handleRoleChange}
        />

        {/* Developer Bar / Viewport Simulator */}
        <DeveloperBar
          currentRole={currentRole}
          onRoleChange={handleRoleChange}
          viewportMode={viewportMode}
          onViewportChange={setViewportMode}
          theme={theme}
          onThemeToggle={toggleTheme}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />

        {/* Modals & Overlays */}
        <RegisterModal
          isOpen={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
          initialTier={registerInitialTier}
          onSuccessRegister={handleRegistrationSuccess}
        />

        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onRoleSelect={handleRoleChange}
          onOpenRegister={handleOpenRegister}
        />

        <ActiveWorkoutModal
          isOpen={isActiveWorkoutOpen}
          onClose={() => setIsActiveWorkoutOpen(false)}
          onFinishWorkout={(summary) => {
            setCompletedWorkoutSummary(summary);
          }}
        />

        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onNavigate={(targetView) => {
            if (targetView === 'settings') setMemberView('settings');
            if (targetView === 'active-workout') setIsActiveWorkoutOpen(true);
          }}
          onRoleChange={handleRoleChange}
        />
      </div>
    </div>
  );
}

export default App;

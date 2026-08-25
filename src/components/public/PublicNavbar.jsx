import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Menu, X, Sun, Moon, LogIn, ArrowRight } from 'lucide-react';

export const PublicNavbar = ({ onOpenLogin, onOpenRegister, activeSection, setActiveSection }) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'classes', label: 'Classes' },
    { id: 'trainers', label: 'Trainers' },
    { id: 'pricing', label: 'Pricing' }
  ];

  const handleNavClick = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 900,
        width: '100%',
        transition: 'all var(--transition-normal)',
        background: isScrolled ? 'var(--surface-glass)' : 'rgba(19, 19, 19, 0.85)',
        backdropFilter: 'var(--blur-glass)',
        WebkitBackdropFilter: 'var(--blur-glass)',
        borderBottom: `1px solid ${isScrolled ? 'var(--border-glass)' : 'rgba(255, 255, 255, 0.05)'}`,
        boxShadow: isScrolled ? 'var(--shadow-sm)' : 'none'
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }}
      >
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: 'inherit',
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer'
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(212, 255, 0, 0.2), rgba(212, 255, 0, 0.05))',
              border: '1px solid rgba(212, 255, 0, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(212, 255, 0, 0.2)'
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 12H6L9 4L15 20L18 12H22"
                stroke="var(--accent)"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.45rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)'
            }}
          >
            Strive<span style={{ color: 'var(--accent)' }}>X</span>
          </span>
        </button>

        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '28px'
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                style={{
                  position: 'relative',
                  fontSize: '0.92rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  padding: '8px 4px',
                  transition: 'color var(--transition-fast)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {link.label}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'var(--accent)',
                      borderRadius: '2px',
                      boxShadow: '0 0 8px var(--accent)'
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
          className="desktop-nav"
        >
          <button
            type="button"
            onClick={toggleTheme}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-pill)',
              background: 'var(--surface-glass)',
              border: '1px solid var(--border-glass)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              transition: 'all var(--transition-fast)'
            }}
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={17} color="var(--accent)" /> : <Moon size={17} color="var(--accent)" />}
          </button>

          <button
            type="button"
            onClick={onOpenLogin}
            style={{
              padding: '9px 18px',
              borderRadius: 'var(--radius-pill)',
              background: 'var(--surface-glass)',
              border: '1px solid var(--border-glass)',
              color: 'var(--text-primary)',
              fontSize: '0.88rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all var(--transition-fast)'
            }}
          >
            <LogIn size={15} color="var(--accent)" />
            Login
          </button>

          <button
            type="button"
            onClick={() => onOpenRegister()}
            className="kinetic-btn-primary"
            style={{
              padding: '10px 22px',
              fontSize: '0.88rem'
            }}
          >
            Get Started
            <ArrowRight size={15} />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          style={{
            display: 'none',
            padding: '8px',
            color: 'var(--text-primary)'
          }}
          className="mobile-hamburger"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div
          className="animate-slide-up"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--surface-elevated)',
            backdropFilter: 'var(--blur-glass)',
            WebkitBackdropFilter: 'var(--blur-glass)',
            borderBottom: '1px solid var(--border-hover)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNavClick(link.id)}
              style={{
                textAlign: 'left',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem',
                fontWeight: 600,
                color: activeSection === link.id ? 'var(--accent)' : 'var(--text-primary)',
                background: activeSection === link.id ? 'var(--accent-subtle)' : 'transparent'
              }}
            >
              {link.label}
            </button>
          ))}

          <div
            style={{
              height: '1px',
              background: 'var(--border-subtle)',
              margin: '8px 0'
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="kinetic-btn-secondary"
              style={{ width: '100%' }}
            >
              <LogIn size={16} />
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="kinetic-btn-primary"
              style={{ width: '100%' }}
            >
              Get Started
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-hamburger {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};

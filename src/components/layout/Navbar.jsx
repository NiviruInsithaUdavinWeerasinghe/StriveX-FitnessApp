import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Search, 
  User, 
  ArrowRight,
  ShieldCheck,
  Dumbbell,
  Users
} from 'lucide-react';
import { CustomDropdown } from '../ui/CustomDropdown';
import './Navbar.css';

export const Navbar = ({
  currentRole,
  onRoleChange,
  theme,
  onThemeToggle,
  onOpenLogin,
  onOpenRegister,
  onOpenSearch,
  activeSection,
  onSectionClick
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'features', label: 'Features' },
    { id: 'schedule', label: 'Classes' },
    { id: 'trainers', label: 'Trainers' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'about', label: 'Ecosystem' }
  ];

  const roleOptions = [
    { value: 'guest', label: 'Public View' },
    { value: 'member', label: 'Athlete Hub' },
    { value: 'trainer', label: 'Trainer Suite' },
    { value: 'admin', label: 'Admin Center' },
  ];

  const handleNavClick = (sectionId) => {
    setIsMobileMenuOpen(false);
    if (onSectionClick) onSectionClick(sectionId);
  };

  return (
    <header className={`strivex-navbar-root ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="navbar-container glass-nav">
        {/* Brand Identity */}
        <div className="navbar-brand" onClick={() => onRoleChange('guest')}>
          <div className="brand-logo-badge">
            <Zap size={22} className="brand-pulse-icon" />
          </div>
          <div className="brand-text-group">
            <span className="brand-name">STRIVEX</span>
            <span className="brand-sub">FITNESS ECOSYSTEM</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        {currentRole === 'guest' ? (
          <nav className="navbar-links-desktop">
            {navLinks.map((link) => (
              <button
                key={link.id}
                className={`nav-link-btn ${activeSection === link.id ? 'active' : ''}`}
                onClick={() => handleNavClick(link.id)}
              >
                {link.label}
              </button>
            ))}
          </nav>
        ) : (
          <div className="navbar-active-role-indicator">
            <span className="role-pill-indicator">
              {currentRole === 'member' && <Dumbbell size={14} />}
              {currentRole === 'trainer' && <Users size={14} />}
              {currentRole === 'admin' && <ShieldCheck size={14} />}
              {currentRole.toUpperCase()} WORKSPACE
            </span>
          </div>
        )}

        {/* Action Controls */}
        <div className="navbar-actions-desktop">
          {/* Quick Search Button */}
          <button 
            className="btn-icon" 
            onClick={onOpenSearch} 
            title="Search Platform (Ctrl+K)"
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          {/* Theme Switcher */}
          <button 
            className="btn-icon" 
            onClick={onThemeToggle} 
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Role Dropdown */}
          <div className="nav-role-dropdown-wrap">
            <CustomDropdown
              options={roleOptions}
              value={currentRole}
              onChange={onRoleChange}
              placeholder="Select Role"
            />
          </div>

          {/* Auth Action Buttons */}
          {currentRole === 'guest' ? (
            <div className="auth-buttons-group">
              <button className="btn btn-secondary btn-sm" onClick={onOpenLogin}>
                Sign In
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => onOpenRegister()}>
                Join StriveX <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            <button className="btn btn-secondary btn-sm" onClick={() => onRoleChange('guest')}>
              <User size={14} /> Exit to Public
            </button>
          )}
        </div>

        {/* Mobile Hamburger Trigger */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Glass Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-drawer glass-panel">
          <div className="mobile-menu-links">
            {navLinks.map((link) => (
              <button
                key={link.id}
                className="mobile-nav-link"
                onClick={() => handleNavClick(link.id)}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="mobile-menu-divider" />

          <div className="mobile-menu-role-section">
            <label className="form-label">Active Portal</label>
            <CustomDropdown
              options={roleOptions}
              value={currentRole}
              onChange={(val) => {
                onRoleChange(val);
                setIsMobileMenuOpen(false);
              }}
            />
          </div>

          <div className="mobile-menu-actions">
            <button 
              className="btn btn-secondary" 
              style={{ width: '100%' }}
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenLogin();
              }}
            >
              Sign In
            </button>
            <button 
              className="btn btn-primary" 
              style={{ width: '100%' }}
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenRegister();
              }}
            >
              Join StriveX
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

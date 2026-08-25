import React from 'react';
import { Zap, ArrowUpRight, Shield, Activity, Dumbbell, Code2 } from 'lucide-react';
import './Footer.css';

export const Footer = ({ onSectionClick, onOpenRegister, onRoleChange }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="strivex-footer-root">
      <div className="footer-container">
        {/* Top Section: Brand & Newsletter */}
        <div className="footer-grid-top">
          <div className="footer-brand-column">
            <div className="footer-brand-header">
              <div className="brand-logo-badge">
                <Zap size={20} className="brand-pulse-icon" />
              </div>
              <span className="brand-name">STRIVEX</span>
            </div>
            <p className="footer-brand-manifesto">
              Engineered for human performance. A unified fitness management ecosystem connecting dedicated athletes, elite personal trainers, and high-standard facility operations.
            </p>
            <div className="footer-status-badge">
              <span className="status-dot-pulse" />
              <span>All Systems Operational • 99.9% Uptime</span>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="footer-column">
            <h4 className="footer-column-title">Navigation</h4>
            <ul className="footer-links-list">
              <li><button onClick={() => onSectionClick('features')}>Platform Features</button></li>
              <li><button onClick={() => onSectionClick('schedule')}>Class Schedule</button></li>
              <li><button onClick={() => onSectionClick('trainers')}>Elite Trainers</button></li>
              <li><button onClick={() => onSectionClick('pricing')}>Membership Tiers</button></li>
              <li><button onClick={() => onSectionClick('about')}>Ecosystem Architecture</button></li>
            </ul>
          </div>

          {/* Workspace Portals */}
          <div className="footer-column">
            <h4 className="footer-column-title">Workspaces</h4>
            <ul className="footer-links-list">
              <li><button onClick={() => onRoleChange('member')}>Member Athlete Hub</button></li>
              <li><button onClick={() => onRoleChange('trainer')}>Trainer Suite & Builder</button></li>
              <li><button onClick={() => onRoleChange('admin')}>Admin Command Center</button></li>
              <li><button onClick={() => onOpenRegister()}>Join as Athlete</button></li>
            </ul>
          </div>

          {/* Build Stack Section */}
          <div className="footer-column">
            <h4 className="footer-column-title">Build Stack</h4>
            <ul className="footer-stack-list">
              <li>
                <Code2 size={15} className="stack-icon" />
                <span>React 19 & Vite HMR</span>
              </li>
              <li>
                <Activity size={15} className="stack-icon" />
                <span>Kinetic Glass Design System</span>
              </li>
              <li>
                <Dumbbell size={15} className="stack-icon" />
                <span>Vanilla CSS (1440px / 390px)</span>
              </li>
              <li>
                <Shield size={15} className="stack-icon" />
                <span>Strict WCAG 2.1 Contrast & UCD</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-divider" />

        {/* Bottom Section */}
        <div className="footer-bottom-row">
          <div className="footer-copyright">
            © {currentYear} StriveX Fitness Ecosystem. All rights reserved.
          </div>
          <div className="footer-legal-links">
            <span>Designed for NIBM User Experience Designing Module</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

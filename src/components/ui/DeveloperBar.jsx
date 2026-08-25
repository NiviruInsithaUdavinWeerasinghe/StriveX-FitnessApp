import React, { useState } from 'react';
import { 
  Monitor, 
  Smartphone, 
  Maximize2, 
  Sun, 
  Moon, 
  Users, 
  Search, 
  SlidersHorizontal,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import './DeveloperBar.css';

export const DeveloperBar = ({
  currentRole,
  onRoleChange,
  viewportMode,
  onViewportChange,
  theme,
  onThemeToggle,
  onOpenCommandPalette
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const roles = [
    { id: 'guest', label: 'Guest Landing', badge: 'Public' },
    { id: 'member', label: 'Member Athlete', badge: 'Athlete' },
    { id: 'trainer', label: 'Trainer Portal', badge: 'Coach' },
    { id: 'admin', label: 'Admin Command', badge: 'Ops' },
  ];

  const viewports = [
    { id: 'full', label: 'Full Width', icon: Maximize2 },
    { id: 'desktop', label: 'Desktop 1440px', icon: Monitor },
    { id: 'mobile', label: 'Mobile 390px', icon: Smartphone },
  ];

  return (
    <aside className={`developer-bar-wrapper ${isCollapsed ? 'collapsed' : ''}`} aria-label="Development and Viewport Controls">
      <div className="developer-bar-header" onClick={() => setIsCollapsed(!isCollapsed)}>
        <div className="dev-header-title">
          <SlidersHorizontal size={15} className="dev-accent-icon" />
          <span>Figma & Role Previewer</span>
          <span className="dev-active-tag">{currentRole.toUpperCase()}</span>
        </div>
        <button className="dev-collapse-btn" aria-label="Toggle Previewer Toolbar">
          {isCollapsed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {!isCollapsed && (
        <div className="developer-bar-body">
          {/* Role Switcher Section */}
          <div className="dev-control-group">
            <span className="dev-group-label">
              <Users size={13} /> Active Role Flow:
            </span>
            <div className="dev-role-pills">
              {roles.map((r) => (
                <button
                  key={r.id}
                  className={`dev-role-btn ${currentRole === r.id ? 'active' : ''}`}
                  onClick={() => onRoleChange(r.id)}
                >
                  <span>{r.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Viewport Frame Switcher */}
          <div className="dev-control-group">
            <span className="dev-group-label">Viewport Simulator:</span>
            <div className="dev-viewport-pills">
              {viewports.map((v) => {
                const IconComponent = v.icon;
                return (
                  <button
                    key={v.id}
                    className={`dev-viewport-btn ${viewportMode === v.id ? 'active' : ''}`}
                    onClick={() => onViewportChange(v.id)}
                    title={v.label}
                  >
                    <IconComponent size={14} />
                    <span>{v.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Actions: Theme & Search */}
          <div className="dev-actions-group">
            <button 
              className="dev-action-btn"
              onClick={onThemeToggle}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>

            <button 
              className="dev-action-btn highlight"
              onClick={onOpenCommandPalette}
              title="Open Global Search (Ctrl+K)"
            >
              <Search size={14} />
              <span>Search (Ctrl+K)</span>
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

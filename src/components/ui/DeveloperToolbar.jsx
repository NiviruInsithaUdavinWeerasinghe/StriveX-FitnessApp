import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Monitor, Smartphone, Maximize2, Sun, Moon, Shield, User, Dumbbell, Compass } from 'lucide-react';

export const DeveloperToolbar = ({ viewportMode, setViewportMode }) => {
  const { role, switchRole } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <aside
      aria-label="Developer & Figma Companion Toolbar"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 9990,
        width: '100%',
        background: 'rgba(15, 15, 15, 0.95)',
        borderBottom: '1px solid rgba(212, 255, 0, 0.25)',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        fontSize: '0.82rem',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}
    >
      {/* Brand & Companion Label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '2px 8px',
            borderRadius: 'var(--radius-pill)',
            background: 'var(--accent)',
            color: '#111111',
            fontWeight: 800,
            fontSize: '0.72rem',
            letterSpacing: '0.05em'
          }}
        >
          FIGMA COMPANION
        </span>
        <span style={{ color: '#a1a1aa', fontWeight: 600 }}>StriveX Live Simulator</span>
      </div>

      {/* Center: Role Switcher */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: 'rgba(30, 30, 30, 0.8)',
          padding: '3px',
          borderRadius: 'var(--radius-pill)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <span style={{ fontSize: '0.75rem', color: '#71717a', padding: '0 8px', fontWeight: 600 }}>
          ROLE:
        </span>
        {[
          { id: 'guest', label: 'Guest (Landing)', icon: <Compass size={13} /> },
          { id: 'member', label: 'Member Hub', icon: <User size={13} /> },
          { id: 'trainer', label: 'Trainer Suite', icon: <Dumbbell size={13} /> },
          { id: 'admin', label: 'Admin Ops', icon: <Shield size={13} /> }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => switchRole(item.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '4px 10px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.76rem',
              fontWeight: 700,
              background: role === item.id ? 'var(--accent)' : 'transparent',
              color: role === item.id ? '#111111' : '#a1a1aa',
              transition: 'all var(--transition-fast)'
            }}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>

      {/* Right: Viewport Simulator & Theme Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            background: 'rgba(30, 30, 30, 0.8)',
            padding: '3px',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <button
            onClick={() => setViewportMode('responsive')}
            title="Full Responsive View"
            style={{
              padding: '5px 8px',
              borderRadius: 'var(--radius-pill)',
              color: viewportMode === 'responsive' ? 'var(--accent)' : '#a1a1aa',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.75rem',
              fontWeight: 600
            }}
          >
            <Maximize2 size={13} /> Responsive
          </button>
          <button
            onClick={() => setViewportMode('desktop')}
            title="1440px Desktop Viewport Frame"
            style={{
              padding: '5px 8px',
              borderRadius: 'var(--radius-pill)',
              color: viewportMode === 'desktop' ? 'var(--accent)' : '#a1a1aa',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.75rem',
              fontWeight: 600
            }}
          >
            <Monitor size={13} /> 1440px
          </button>
          <button
            onClick={() => setViewportMode('mobile')}
            title="390px Mobile Viewport Frame"
            style={{
              padding: '5px 8px',
              borderRadius: 'var(--radius-pill)',
              color: viewportMode === 'mobile' ? 'var(--accent)' : '#a1a1aa',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.75rem',
              fontWeight: 600
            }}
          >
            <Smartphone size={13} /> 390px
          </button>
        </div>

        {/* Theme Switcher Button */}
        <button
          onClick={toggleTheme}
          style={{
            padding: '6px 12px',
            borderRadius: 'var(--radius-pill)',
            background: 'rgba(30, 30, 30, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#f5f5f7',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.75rem',
            fontWeight: 700
          }}
          title="Toggle Light / Dark Mode"
        >
          {theme === 'dark' ? <Sun size={13} color="var(--accent)" /> : <Moon size={13} color="var(--accent)" />}
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
      </div>
    </aside>
  );
};

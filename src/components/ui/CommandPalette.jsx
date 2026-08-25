import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  ArrowRight, 
  Dumbbell, 
  Users, 
  Receipt, 
  LayoutDashboard, 
  Settings, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import './CommandPalette.css';

export const CommandPalette = ({ isOpen, onClose, onNavigate, onRoleChange }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const searchableItems = [
    // Navigation & Views
    { id: 'nav-landing', category: 'Navigation', title: 'Public Landing Page', subtitle: 'Features, Schedules, and Pricing', icon: LayoutDashboard, action: () => { onRoleChange('guest'); onClose(); } },
    { id: 'nav-member', category: 'Navigation', title: 'Member Athlete Hub', subtitle: 'KPIs, Goal Rings, and Today Routine', icon: Dumbbell, action: () => { onRoleChange('member'); onClose(); } },
    { id: 'nav-workout', category: 'Member Flow', title: 'Start Active Workout Session', subtitle: 'Interactive Set & Rep Logger', icon: Dumbbell, action: () => { onRoleChange('member'); onNavigate('active-workout'); onClose(); } },
    { id: 'nav-settings', category: 'Member Flow', title: 'Member Profile & Settings', subtitle: 'Manage subscription and preferences', icon: Settings, action: () => { onRoleChange('member'); onNavigate('settings'); onClose(); } },
    { id: 'nav-chat', category: 'Member Flow', title: 'Message Assigned Coach', subtitle: 'Coach Marcus Vance', icon: MessageSquare, action: () => { onRoleChange('member'); onNavigate('chat'); onClose(); } },
    
    // Trainer Portal
    { id: 'nav-trainer', category: 'Trainer Portal', title: 'Trainer Dashboard', subtitle: 'Active clients and 1-on-1 schedule', icon: Users, action: () => { onRoleChange('trainer'); onClose(); } },
    { id: 'nav-builder', category: 'Trainer Portal', title: 'Workout Routine Builder', subtitle: 'Create and assign custom workouts', icon: Dumbbell, action: () => { onRoleChange('trainer'); onNavigate('builder'); onClose(); } },
    { id: 'nav-trainer-chat', category: 'Trainer Portal', title: 'Trainer Messaging Center', subtitle: 'Multi-client active conversations', icon: MessageSquare, action: () => { onRoleChange('trainer'); onNavigate('messages'); onClose(); } },

    // Admin Operations
    { id: 'nav-admin', category: 'Admin Operations', title: 'Admin Command Center', subtitle: 'Monthly Revenue, Active Athletes, Audit Log', icon: ShieldCheck, action: () => { onRoleChange('admin'); onClose(); } },
    { id: 'nav-finance', category: 'Admin Operations', title: 'Financial Reports & Ledger', subtitle: 'Transaction history and subscriptions', icon: Receipt, action: () => { onRoleChange('admin'); onNavigate('financials'); onClose(); } },
    { id: 'nav-staff', category: 'Admin Operations', title: 'Staff Directory & Permissions', subtitle: 'Manage trainers and roles', icon: Users, action: () => { onRoleChange('admin'); onNavigate('staff'); onClose(); } },

    // Dynamic Records
    { id: 'athlete-1', category: 'Athletes', title: 'Alex Rivera', subtitle: 'Pro Member • Hypertrophy Track • 94% Compliance', icon: Users, action: () => { onRoleChange('trainer'); onNavigate('client-detail', { id: 1 }); onClose(); } },
    { id: 'athlete-2', category: 'Athletes', title: 'Elena Rostova', subtitle: 'Starter Member • Fat Loss Track • 88% Compliance', icon: Users, action: () => { onRoleChange('trainer'); onNavigate('client-detail', { id: 2 }); onClose(); } },
    { id: 'routine-1', category: 'Routines', title: 'Hypertrophy Push Day A', subtitle: '6 Exercises • Chest, Shoulders & Triceps', icon: Dumbbell, action: () => { onRoleChange('member'); onNavigate('active-workout'); onClose(); } },
    { id: 'trans-1', category: 'Transactions', title: 'INV-8921 • $49.00 USD', subtitle: 'Pro Monthly Renewal • Paid (Stripe)', icon: Receipt, action: () => { onRoleChange('admin'); onNavigate('financials'); onClose(); } },
  ];

  const filteredItems = searchableItems.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation inside Command Palette
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          onClose(); // Handled outside to toggle
        }
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="cmd-backdrop" onClick={onClose}>
      <div className="cmd-modal glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-input-wrapper">
          <Search size={20} className="cmd-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="cmd-search-input"
            placeholder="Search commands, athletes, workouts, or reports..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="cmd-close-btn" onClick={onClose}>
            <kbd className="cmd-kbd">ESC</kbd>
          </button>
        </div>

        <div className="cmd-results-list">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => {
              const IconComp = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  className={`cmd-item ${isSelected ? 'is-selected' : ''}`}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className="cmd-item-left">
                    <div className="cmd-icon-box">
                      <IconComp size={16} />
                    </div>
                    <div className="cmd-text-box">
                      <div className="cmd-item-title">{item.title}</div>
                      <div className="cmd-item-subtitle">{item.subtitle}</div>
                    </div>
                  </div>
                  <div className="cmd-item-right">
                    <span className="cmd-category-tag">{item.category}</span>
                    {isSelected && <ArrowRight size={14} className="cmd-arrow-icon" />}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="cmd-empty-state">
              <Search size={32} className="cmd-empty-icon" />
              <p>No results found for "{query}"</p>
              <span>Try searching for 'workout', 'trainer', 'revenue', or 'Alex'</span>
            </div>
          )}
        </div>

        <div className="cmd-footer">
          <div className="cmd-shortcuts-hint">
            <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
            <span><kbd>↵</kbd> Select</span>
            <span><kbd>ESC</kbd> Close</span>
          </div>
          <div className="cmd-brand-tag">StriveX Quick Search</div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Search } from 'lucide-react';
import './CustomDropdown.css';

export const CustomDropdown = ({
  label,
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  error = '',
  searchable = false,
  className = '',
  helperText = '',
  icon: Icon
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSelect = (optionValue) => {
    if (onChange) onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  const filteredOptions = searchable
    ? options.filter((opt) => opt.label.toLowerCase().includes(searchTerm.toLowerCase()))
    : options;

  return (
    <div className={`custom-dropdown-container ${className}`} ref={dropdownRef}>
      {label && <label className="form-label">{label}</label>}
      <div
        className={`custom-dropdown-trigger ${isOpen ? 'is-open' : ''} ${error ? 'is-error' : ''} ${
          disabled ? 'is-disabled' : ''
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!disabled) setIsOpen(!isOpen);
          } else if (e.key === 'Escape') {
            setIsOpen(false);
          }
        }}
      >
        <div className="custom-dropdown-value-wrapper">
          {Icon && <Icon size={18} className="custom-dropdown-icon" />}
          <span className={`custom-dropdown-selected-text ${!selectedOption ? 'placeholder' : ''}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown
          size={18}
          className={`custom-dropdown-arrow ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>

      {isOpen && (
        <div className="custom-dropdown-menu glass-panel">
          {searchable && (
            <div className="custom-dropdown-search-wrapper">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                className="custom-dropdown-search-input"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          <div className="custom-dropdown-options-list">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <div
                    key={opt.value}
                    className={`custom-dropdown-option ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => handleSelect(opt.value)}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <div className="option-content">
                      {opt.icon && <span className="option-custom-icon">{opt.icon}</span>}
                      <span className="option-label">{opt.label}</span>
                      {opt.badge && <span className="badge badge-primary opt-badge">{opt.badge}</span>}
                    </div>
                    {isSelected && <Check size={16} className="option-check-icon" />}
                  </div>
                );
              })
            ) : (
              <div className="custom-dropdown-no-results">No options found</div>
            )}
          </div>
        </div>
      )}

      {error ? (
        <div className="form-warning">{error}</div>
      ) : helperText ? (
        <div className="form-helper">{helperText}</div>
      ) : null}
    </div>
  );
};

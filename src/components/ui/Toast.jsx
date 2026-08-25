import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import './Toast.css';

const ToastItem = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, toast.duration);

    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="toast-icon success" size={20} />;
      case 'error':
        return <AlertCircle className="toast-icon error" size={20} />;
      case 'warning':
        return <AlertTriangle className="toast-icon warning" size={20} />;
      case 'info':
      default:
        return <Info className="toast-icon info" size={20} />;
    }
  };

  return (
    <div className={`toast-card toast-${toast.type} glass-panel`}>
      <div className="toast-content-wrapper">
        <div className="toast-icon-container">{getIcon()}</div>
        <div className="toast-text-container">
          {toast.title && <div className="toast-title">{toast.title}</div>}
          <div className="toast-message">{toast.message}</div>
        </div>
      </div>
      <button 
        className="toast-close-btn" 
        onClick={() => onDismiss(toast.id)}
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
      <div 
        className="toast-progress-bar" 
        style={{ animationDuration: `${toast.duration}ms` }} 
      />
    </div>
  );
};

export const ToastContainer = ({ toasts, onDismiss }) => {
  if (!toasts.length) return null;

  return (
    <div className="strivex-toast-container" role="region" aria-live="polite">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

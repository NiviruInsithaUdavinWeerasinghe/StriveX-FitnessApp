import React, { createContext, useContext, useState, useCallback } from 'react';
import { ToastContainer } from '../components/ui/Toast';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  /**
   * showToast: Add a single or combined toast message.
   * @param {Object|String} options - Toast options or message string
   * @param {'success'|'error'|'warning'|'info'} [options.type='info']
   * @param {string} options.title - Optional bold title
   * @param {string} options.message - Notification message
   * @param {number} [options.duration=4000] - Duration in ms
   */
  const showToast = useCallback((options) => {
    const toastConfig = typeof options === 'string' ? { message: options, type: 'info' } : options;
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    
    const newToast = {
      id,
      type: toastConfig.type || 'info',
      title: toastConfig.title || '',
      message: toastConfig.message,
      duration: toastConfig.duration || 4000,
    };

    setToasts((prev) => {
      // If a toast with the exact same message already exists, do not duplicate
      if (prev.some((t) => t.message === newToast.message)) {
        return prev;
      }
      // Combine if there are already 2 active toasts to prevent clutter
      if (prev.length >= 2) {
        return [
          ...prev.slice(1),
          newToast
        ];
      }
      return [...prev, newToast];
    });
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

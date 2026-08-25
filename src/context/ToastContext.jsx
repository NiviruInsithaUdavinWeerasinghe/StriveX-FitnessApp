import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(({ type = 'info', title, message, duration = 4500 }) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);

    setToasts((prevToasts) => {
      const existingIndex = prevToasts.findIndex(
        (t) => t.message === message && t.type === type
      );

      if (existingIndex !== -1) {
        const updated = [...prevToasts];
        const count = (updated[existingIndex].count || 1) + 1;
        updated[existingIndex] = {
          ...updated[existingIndex],
          count,
          timestamp: Date.now()
        };
        return updated;
      }

      const newToast = { id, type, title, message, duration, count: 1, timestamp: Date.now() };
      return [...prevToasts.slice(-2), newToast];
    });

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearAllToasts }}>
      {children}
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

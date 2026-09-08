import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const BroadcastContext = createContext();

const INITIAL_BROADCASTS = [
  {
    id: 'bcast_1',
    title: 'Facility Maintenance Notice',
    message: 'Colombo 07 Olympic Platform scheduled for maintenance on Sunday 8:00 AM - 10:00 AM.',
    audience: 'all',
    timestamp: 'Today, 09:15 AM',
    author: 'Elena Rostova (Head of Ops)',
    active: true,
    read: false
  },
  {
    id: 'bcast_2',
    title: 'New High-Performance Lifting Racks Installed',
    message: 'Zone A Power Racks upgraded with calibrated competition plates and safety bars.',
    audience: 'all',
    timestamp: 'Yesterday, 04:30 PM',
    author: 'Elena Rostova (Head of Ops)',
    active: false,
    read: true
  }
];

export const BroadcastProvider = ({ children }) => {
  const [broadcasts, setBroadcasts] = useState(() => {
    try {
      const saved = localStorage.getItem('strivex_broadcasts');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Replace legacy plunge tank notification if present in browser cache
        return parsed.map((b) =>
          b.title === 'Cryo-Thermal Plunge Tank Recalibration'
            ? INITIAL_BROADCASTS[1]
            : b
        );
      }
      return INITIAL_BROADCASTS;
    } catch (_e) {
      return INITIAL_BROADCASTS;
    }
  });

  const [dismissedIds, setDismissedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('strivex_dismissed_broadcasts');
      return saved ? JSON.parse(saved) : [];
    } catch (_e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('strivex_broadcasts', JSON.stringify(broadcasts));
    } catch (_e) {
      // Ignore write errors
    }
  }, [broadcasts]);

  useEffect(() => {
    try {
      localStorage.setItem('strivex_dismissed_broadcasts', JSON.stringify(dismissedIds));
    } catch (_e) {
      // Ignore write errors
    }
  }, [dismissedIds]);

  const sendBroadcast = useCallback(({ title = 'System Facility Notice', message, audience = 'all' }) => {
    const now = new Date();
    const formattedTime = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const newBroadcast = {
      id: `bcast_${Date.now()}`,
      title,
      message,
      audience,
      timestamp: formattedTime,
      author: 'Elena Rostova (Head of Ops)',
      active: true,
      read: false
    };

    setBroadcasts((prev) => [newBroadcast, ...prev]);
  }, []);

  const dismissBroadcast = useCallback((id) => {
    setDismissedIds((prev) => [...prev, id]);
  }, []);

  const markAllAsRead = useCallback(() => {
    setBroadcasts((prev) => prev.map((b) => ({ ...b, read: true })));
  }, []);

  // Find the most recent active broadcast that has not been dismissed
  const activeAnnouncement = broadcasts.find((b) => b.active && !dismissedIds.includes(b.id));

  const unreadCount = broadcasts.filter((b) => !b.read).length;

  return (
    <BroadcastContext.Provider
      value={{
        broadcasts,
        activeAnnouncement,
        unreadCount,
        sendBroadcast,
        dismissBroadcast,
        markAllAsRead
      }}
    >
      {children}
    </BroadcastContext.Provider>
  );
};

export const useBroadcast = () => {
  const context = useContext(BroadcastContext);
  if (!context) {
    throw new Error('useBroadcast must be used within a BroadcastProvider');
  }
  return context;
};

import { useState } from 'react';
import { Clock, Calendar, Dumbbell, Flame, Check } from 'lucide-react';

export const ClassScheduleSection = ({ onReserveClass, reservedClassIds = [] }) => {
  const [selectedDay, setSelectedDay] = useState('Mon');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const days = [
    { id: 'Mon', label: 'Monday' },
    { id: 'Tue', label: 'Tuesday' },
    { id: 'Wed', label: 'Wednesday' },
    { id: 'Thu', label: 'Thursday' },
    { id: 'Fri', label: 'Friday' },
    { id: 'Sat', label: 'Saturday' },
    { id: 'Sun', label: 'Sunday' }
  ];

  const categories = ['All', 'Strength', 'HIIT', 'Hypertrophy', 'Mobility', 'Boxing'];

  const scheduleData = [
    {
      id: 'cls_01',
      day: 'Mon',
      category: 'Strength',
      title: 'Barbell Mastery & Deadlift Peak',
      time: '07:00 AM - 08:00 AM',
      duration: '60 mins',
      coach: 'Coach Marcus Vance',
      coachAvatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=150&auto=format&fit=crop',
      intensity: 'High',
      spotsAvailable: 4,
      totalSpots: 16
    },
    {
      id: 'cls_02',
      day: 'Mon',
      category: 'HIIT',
      title: 'High-Voltage MetCon Intervals',
      time: '05:30 PM - 06:15 PM',
      duration: '45 mins',
      coach: 'Coach Sarah Jenkins',
      coachAvatar: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=150&auto=format&fit=crop',
      intensity: 'Extreme',
      spotsAvailable: 2,
      totalSpots: 20
    },
    {
      id: 'cls_03',
      day: 'Tue',
      category: 'Hypertrophy',
      title: 'Upper Body Pump & Density',
      time: '08:00 AM - 09:00 AM',
      duration: '60 mins',
      coach: 'Coach David Lee',
      coachAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
      intensity: 'High',
      spotsAvailable: 8,
      totalSpots: 18
    },
    {
      id: 'cls_04',
      day: 'Tue',
      category: 'Boxing',
      title: 'Technical Striking & Conditioning',
      time: '06:00 PM - 07:00 PM',
      duration: '60 mins',
      coach: 'Coach Marcus Vance',
      coachAvatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=150&auto=format&fit=crop',
      intensity: 'Extreme',
      spotsAvailable: 5,
      totalSpots: 14
    },
    {
      id: 'cls_05',
      day: 'Wed',
      category: 'Mobility',
      title: 'Athletic Recovery & Deep Stretch',
      time: '09:00 AM - 09:45 AM',
      duration: '45 mins',
      coach: 'Coach Sarah Jenkins',
      coachAvatar: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=150&auto=format&fit=crop',
      intensity: 'Low',
      spotsAvailable: 11,
      totalSpots: 20
    },
    {
      id: 'cls_06',
      day: 'Wed',
      category: 'Strength',
      title: 'Olympic Squat & Clean Complex',
      time: '06:30 PM - 07:45 PM',
      duration: '75 mins',
      coach: 'Coach Marcus Vance',
      coachAvatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=150&auto=format&fit=crop',
      intensity: 'Extreme',
      spotsAvailable: 3,
      totalSpots: 12
    },
    {
      id: 'cls_07',
      day: 'Thu',
      category: 'HIIT',
      title: 'Engine Building & Row Conditioning',
      time: '07:30 AM - 08:15 AM',
      duration: '45 mins',
      coach: 'Coach David Lee',
      coachAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
      intensity: 'High',
      spotsAvailable: 6,
      totalSpots: 18
    },
    {
      id: 'cls_08',
      day: 'Fri',
      category: 'Hypertrophy',
      title: 'Full Body Friday Gauntlet',
      time: '05:00 PM - 06:00 PM',
      duration: '60 mins',
      coach: 'Coach Marcus Vance',
      coachAvatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=150&auto=format&fit=crop',
      intensity: 'High',
      spotsAvailable: 7,
      totalSpots: 20
    },
    {
      id: 'cls_09',
      day: 'Sat',
      category: 'Strength',
      title: 'Weekend Powerlifting Syndicate',
      time: '10:00 AM - 11:30 AM',
      duration: '90 mins',
      coach: 'Coach Marcus Vance',
      coachAvatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=150&auto=format&fit=crop',
      intensity: 'Extreme',
      spotsAvailable: 2,
      totalSpots: 16
    },
    {
      id: 'cls_10',
      day: 'Sun',
      category: 'Mobility',
      title: 'Sunday Breathwork & Joint Reset',
      time: '10:30 AM - 11:30 AM',
      duration: '60 mins',
      coach: 'Coach Sarah Jenkins',
      coachAvatar: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=150&auto=format&fit=crop',
      intensity: 'Low',
      spotsAvailable: 9,
      totalSpots: 20
    }
  ];

  const filteredClasses = scheduleData.filter((item) => {
    const matchDay = item.day === selectedDay;
    const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
    return matchDay && matchCat;
  });

  return (
    <section
      id="classes"
      style={{
        padding: '80px 24px',
        maxWidth: '1360px',
        margin: '0 auto',
        width: '100%'
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
        <div className="kinetic-badge" style={{ marginBottom: '14px' }}>
          <Calendar size={14} />
          <span>Live Timetable</span>
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            marginBottom: '16px',
            color: 'var(--text-primary)'
          }}
        >
          High-Performance Class Schedule
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Explore expert-led coaching sessions. Select a day to view upcoming times and reserve your station in real time.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '24px'
        }}
      >
        {days.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => setSelectedDay(d.id)}
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.9rem',
              fontWeight: 700,
              background: selectedDay === d.id ? 'var(--accent)' : 'var(--surface-card)',
              color: selectedDay === d.id ? 'var(--accent-contrast)' : 'var(--text-secondary)',
              border: `1px solid ${selectedDay === d.id ? 'var(--accent)' : 'var(--border-glass)'}`,
              boxShadow: selectedDay === d.id ? '0 0 20px var(--accent-glow)' : 'none',
              transition: 'all var(--transition-fast)'
            }}
          >
            {d.label}
          </button>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '36px'
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.82rem',
              fontWeight: 600,
              background: selectedCategory === cat ? 'var(--accent-subtle)' : 'transparent',
              color: selectedCategory === cat ? 'var(--accent)' : 'var(--text-tertiary)',
              border: `1px solid ${selectedCategory === cat ? 'var(--border-hover)' : 'transparent'}`,
              transition: 'all var(--transition-fast)'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredClasses.length === 0 ? (
        <div
          className="kinetic-card"
          style={{
            padding: '48px',
            textAlign: 'center',
            color: 'var(--text-secondary)'
          }}
        >
          <Dumbbell size={36} color="var(--text-tertiary)" style={{ marginBottom: '12px' }} />
          <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>No classes found for this category on {selectedDay}</div>
          <div style={{ fontSize: '0.88rem', color: 'var(--text-tertiary)', marginTop: '6px' }}>
            Try switching to 'All' or pick another training day.
          </div>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '20px'
          }}
        >
          {filteredClasses.map((item) => {
            const isReserved = reservedClassIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="kinetic-card"
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '18px'
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '14px'
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: 'var(--accent)',
                        background: 'var(--accent-subtle)',
                        padding: '3px 10px',
                        borderRadius: 'var(--radius-pill)'
                      }}
                    >
                      {item.category}
                    </span>

                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        color:
                          item.intensity === 'Extreme'
                            ? 'var(--status-error)'
                            : item.intensity === 'High'
                            ? 'var(--status-warning)'
                            : 'var(--status-success)'
                      }}
                    >
                      <Flame size={13} />
                      {item.intensity} Intensity
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginBottom: '12px'
                    }}
                  >
                    {item.title}
                  </h3>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)',
                      marginBottom: '18px'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={14} color="var(--accent)" />
                      {item.time}
                    </span>
                    <span>•</span>
                    <span>{item.duration}</span>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px',
                      background: 'var(--surface-input)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={item.coachAvatar}
                        alt={item.coach}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          objectFit: 'cover'
                        }}
                      />
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {item.coach}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>Instructor</div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: item.spotsAvailable <= 3 ? 'var(--status-error)' : 'var(--status-success)'
                        }}
                      >
                        {isReserved ? `${item.spotsAvailable - 1} left` : `${item.spotsAvailable} spots left`}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>of {item.totalSpots} max</div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onReserveClass(item)}
                  disabled={isReserved}
                  className={isReserved ? 'kinetic-btn-secondary' : 'kinetic-btn-primary'}
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    opacity: isReserved ? 0.8 : 1
                  }}
                >
                  {isReserved ? (
                    <>
                      <Check size={16} color="var(--status-success)" />
                      Station Reserved
                    </>
                  ) : (
                    'Reserve Station Spot'
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

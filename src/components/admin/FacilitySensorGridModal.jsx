import { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import {
  X,
  Cpu,
  Wifi,
  Wind,
  Layers,
  Wrench,
  RotateCcw,
  DoorClosed
} from 'lucide-react';

const FACILITY_ZONES = [
  {
    id: 'zone_a',
    name: 'Olympic Lifting Turf (Zone A)',
    occupancy: 22,
    maxCap: 25,
    status: 'high_load',
    temp: '21.5°C',
    airQuality: '99 AQI (Optimal)',
    gateways: '6 Barbell RF Transceivers Active',
    equipment: 'Eleiko Competition Bars & Bumpers'
  },
  {
    id: 'zone_b',
    name: 'Hypertrophy & Machine Bay (Zone B)',
    occupancy: 54,
    maxCap: 80,
    status: 'optimal',
    temp: '22.0°C',
    airQuality: '98 AQI (Optimal)',
    gateways: '24 Smart Stack Sensor Hubs',
    equipment: 'Prime & Hammer Strength Iso-Lateral'
  },
  {
    id: 'zone_c',
    name: 'HIIT & Aerobic Arena (Zone C)',
    occupancy: 34,
    maxCap: 40,
    status: 'optimal',
    temp: '20.8°C',
    airQuality: '97 AQI (Optimal)',
    gateways: '18 Concept2 PM5 BLE Nodes',
    equipment: 'Concept2 RowErgs & SkiErgs'
  },
  {
    id: 'zone_d',
    name: 'Hydro & Recovery Thermal Suite (Zone D)',
    occupancy: 12,
    maxCap: 20,
    status: 'optimal',
    temp: '3.0°C / 85.0°C',
    airQuality: '100 AQI (Clean)',
    gateways: '8 Thermal Probe Gateways Active',
    equipment: 'Cold Plunges & Finnish Cedar Sauna'
  }
];

const SENSOR_EQUIPMENT = [
  {
    id: 'eq_1',
    name: 'Eleiko IPF Olympic Platform #04',
    zone: 'Zone A - Turf',
    wearLevel: 98,
    status: 'optimal',
    lastCalibration: '2 hours ago',
    sensorHealth: '100% Signal'
  },
  {
    id: 'eq_2',
    name: 'Concept2 RowErg Station #12',
    zone: 'Zone C - Aerobic',
    wearLevel: 94,
    status: 'optimal',
    lastCalibration: 'Yesterday',
    sensorHealth: '98% Signal'
  },
  {
    id: 'eq_3',
    name: 'Prime Fitness Iso-Chest Press #02',
    zone: 'Zone B - Machine Bay',
    wearLevel: 82,
    status: 'maintenance_soon',
    lastCalibration: '5 days ago',
    sensorHealth: '91% Signal'
  },
  {
    id: 'eq_4',
    name: 'Cryo-Thermal Plunge Tank #01',
    zone: 'Zone D - Hydro',
    wearLevel: 99,
    status: 'optimal',
    lastCalibration: '3 hours ago',
    sensorHealth: '100% Signal'
  }
];

export const FacilitySensorGridModal = ({ isOpen, onClose, isInline = false }) => {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('zones'); // 'zones' | 'telemetry' | 'access'
  const [isCalibrating, setIsCalibrating] = useState(false);

  if (!isOpen && !isInline) return null;

  const handleCalibrateAll = () => {
    setIsCalibrating(true);
    addToast({
      type: 'info',
      title: 'Sensor Mesh Ping Initiated',
      message: 'Broadcasting telemetry sync signal across 56 BLE hubs...'
    });

    setTimeout(() => {
      setIsCalibrating(false);
      addToast({
        type: 'success',
        title: 'Calibration Complete',
        message: 'All 56 IoT sensor nodes verified and synchronized (0.4ms lat).'
      });
    }, 1400);
  };

  const handleScheduleMaintenance = (eqName) => {
    addToast({
      type: 'info',
      title: 'Work Order Generated',
      message: `Scheduled diagnostic dispatch for ${eqName}. Assigned to Head Tech.`
    });
  };

  const contentUI = (
    <div
      className={isInline ? 'kinetic-card' : 'kinetic-card animate-scale-up'}
      style={{
        width: '100%',
        maxWidth: isInline ? '100%' : '1080px',
        height: isInline ? '100%' : '88vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--surface-elevated)',
        border: '1px solid var(--border-hover)',
        borderRadius: isInline ? 'var(--radius-lg)' : 'var(--radius-xl)',
        overflow: 'hidden',
        boxShadow: isInline ? 'none' : 'var(--shadow-lg)'
      }}
      onClick={(e) => isInline ? null : e.stopPropagation()}
    >
      {/* Modal Header */}
      <div
        style={{
          padding: '16px 24px',
          background: 'var(--surface-glass)',
          borderBottom: '1px solid var(--border-glass)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          flexShrink: 0
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'rgba(212, 255, 0, 0.15)',
              border: '1px solid var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent)'
            }}
          >
            <Cpu size={18} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="type-eyebrow">FACILITY SENSOR GRID & IOT MESH</span>
              <span className="kinetic-badge" style={{ fontSize: '0.66rem', padding: '1px 6px' }}>
                COLOMBO 07 HUB
              </span>
            </div>
            <h3 className="type-h3" style={{ fontSize: '1.2rem', margin: 0, whiteSpace: 'nowrap' }}>
              Real-Time Floor Load & Telemetry
            </h3>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <button
            type="button"
            onClick={handleCalibrateAll}
            disabled={isCalibrating}
            className="kinetic-btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.78rem', fontWeight: 800, whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            <RotateCcw size={13} className={isCalibrating ? 'animate-spin' : ''} />
            <span>{isCalibrating ? 'Pinging Nodes...' : 'Calibrate Sensors'}</span>
          </button>

          {!isInline && onClose && (
            <button
              type="button"
              onClick={onClose}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--surface-input)',
                border: '1px solid var(--border-glass)',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Control Sub-Bar */}
      <div
        style={{
          padding: '12px 24px',
          background: 'rgba(0,0,0,0.2)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', gap: '6px' }}>
          {[
            { id: 'zones', label: 'Facility Zones (4)', icon: Layers },
            { id: 'telemetry', label: 'Equipment Wear Telemetry', icon: Wrench },
            { id: 'access', label: 'Live RFID Turnstiles', icon: DoorClosed }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={active ? 'kinetic-btn-primary' : 'kinetic-btn-ghost'}
                style={{ padding: '6px 12px', fontSize: '0.78rem' }}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.78rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--status-success)' }}>
            <Wifi size={13} />
            <span style={{ fontWeight: 700 }}>56 / 56 IoT Nodes Online</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-tertiary)' }}>
            <Wind size={13} />
            <span>Facility HVAC: 21.2°C Avg</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
        {/* TAB 1: FACILITY ZONES */}
        {activeTab === 'zones' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {FACILITY_ZONES.map((zone) => {
              const pct = Math.round((zone.occupancy / zone.maxCap) * 100);
              return (
                <div
                  key={zone.id}
                  style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--surface-input)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '14px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <span className="type-caption" style={{ fontWeight: 800, color: 'var(--accent)' }}>
                        {zone.gateways}
                      </span>
                      <span
                        className="kinetic-badge"
                        style={{
                          background: pct > 85 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                          color: pct > 85 ? '#ef4444' : 'var(--status-success)',
                          borderColor: pct > 85 ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'
                        }}
                      >
                        {pct}% Capacity
                      </span>
                    </div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
                      {zone.name}
                    </h4>
                    <p className="type-caption" style={{ color: 'var(--text-secondary)' }}>
                      Key Focus: {zone.equipment}
                    </p>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '6px' }}>
                      <span style={{ color: 'var(--text-tertiary)' }}>Live Headcount</span>
                      <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>
                        {zone.occupancy} / {zone.maxCap} Athletes
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div
                      style={{
                        width: '100%',
                        height: '6px',
                        borderRadius: '10px',
                        background: 'rgba(255,255,255,0.06)',
                        overflow: 'hidden',
                        marginBottom: '12px'
                      }}
                    >
                      <div
                        style={{
                          width: `${pct}%`,
                          height: '100%',
                          background: pct > 85 ? '#ef4444' : 'var(--accent)',
                          borderRadius: '10px',
                          transition: 'width 0.4s ease'
                        }}
                      />
                    </div>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '8px',
                        padding: '8px 10px',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(0,0,0,0.3)',
                        fontSize: '0.74rem'
                      }}
                    >
                      <div>
                        <span style={{ color: 'var(--text-tertiary)', display: 'block' }}>Ambient Temp</span>
                        <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{zone.temp}</span>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-tertiary)', display: 'block' }}>HEPA Air Quality</span>
                        <span style={{ fontWeight: 800, color: 'var(--status-success)' }}>{zone.airQuality}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: EQUIPMENT WEAR TELEMETRY */}
        {activeTab === 'telemetry' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr 100px',
                padding: '8px 14px',
                fontSize: '0.75rem',
                fontWeight: 800,
                color: 'var(--text-tertiary)',
                textTransform: 'uppercase',
                borderBottom: '1px solid var(--border-subtle)'
              }}
            >
              <div>Equipment / Station Name</div>
              <div>Facility Zone</div>
              <div>Structural Wear Integrity</div>
              <div>RF Node Signal</div>
              <div>Last Calibrated</div>
              <div style={{ textAlign: 'right' }}>Action</div>
            </div>

            {SENSOR_EQUIPMENT.map((eq) => (
              <div
                key={eq.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr 100px',
                  alignItems: 'center',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--surface-input)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.84rem'
                }}
              >
                <div style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{eq.name}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>{eq.zone}</div>
                <div style={{ fontWeight: 800, color: eq.wearLevel >= 90 ? 'var(--status-success)' : '#f59e0b' }}>
                  {eq.wearLevel}% Integrity
                </div>
                <div style={{ color: 'var(--accent)', fontSize: '0.78rem', fontWeight: 700 }}>
                  {eq.sensorHealth}
                </div>
                <div style={{ color: 'var(--text-tertiary)', fontSize: '0.76rem' }}>
                  {eq.lastCalibration}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <button
                    type="button"
                    onClick={() => handleScheduleMaintenance(eq.name)}
                    className="kinetic-btn-ghost"
                    style={{ padding: '4px 8px', fontSize: '0.74rem' }}
                    title="Dispatch Work Order"
                  >
                    <Wrench size={13} color="var(--accent)" />
                    <span>Service</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: LIVE RFID ACCESS LOGS */}
        {activeTab === 'access' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { time: '10:14:22 AM', user: 'Alex Mercer', tier: 'Pro Athlete', gate: 'Turnstile 01 (Main Lobby)', pass: 'NFC Mobile Pass' },
              { time: '10:08:15 AM', user: 'Sarah Tan', tier: 'Pro Athlete', gate: 'Turnstile 02 (Turf Zone)', pass: 'RFID Key Fob' },
              { time: '09:55:40 AM', user: 'Coach Marcus Vance', tier: 'Coach Staff', gate: 'Turnstile 01 (Main Lobby)', pass: 'Staff Master Badge' },
              { time: '09:42:10 AM', user: 'Kasun Fernando', tier: 'Elite Athlete', gate: 'Turnstile 03 (Thermal Recovery)', pass: 'Biometric Palm Scan' }
            ].map((log, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--surface-input)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <DoorClosed size={16} color="var(--accent)" />
                  <div>
                    <span style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {log.user}
                    </span>
                    <div className="type-caption">
                      {log.gate} • {log.pass}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="kinetic-badge" style={{ fontSize: '0.66rem', padding: '1px 6px' }}>
                    {log.tier}
                  </span>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)' }}>
                    {log.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (isInline) {
    return contentUI;
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9995,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: '20px'
      }}
      onClick={onClose}
    >
      {contentUI}
    </div>
  );
};

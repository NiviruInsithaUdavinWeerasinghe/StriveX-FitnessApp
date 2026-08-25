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
    name: 'Assault AirBike Pro #08',
    zone: 'Zone C - Aerobic',
    wearLevel: 72,
    status: 'warning',
    lastCalibration: '14 days ago',
    sensorHealth: '82% Signal'
  },
  {
    id: 'eq_4',
    name: 'Prime Dual Cable Crossover #02',
    zone: 'Zone B - Machines',
    wearLevel: 99,
    status: 'optimal',
    lastCalibration: '3 hours ago',
    sensorHealth: '100% Signal'
  },
  {
    id: 'eq_5',
    name: 'Nordic Cold Plunge Tub #01',
    zone: 'Zone D - Recovery',
    wearLevel: 96,
    status: 'optimal',
    lastCalibration: 'Today 06:00 AM',
    sensorHealth: '100% Signal'
  }
];

export const FacilitySensorGridModal = ({ isOpen, onClose }) => {
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('zones'); // 'zones' | 'equipment' | 'access'
  const [equipmentList, setEquipmentList] = useState(SENSOR_EQUIPMENT);
  const [isCalibrating, setIsCalibrating] = useState(false);

  if (!isOpen) return null;

  const totalOccupancy = FACILITY_ZONES.reduce((acc, z) => acc + z.occupancy, 0);
  const totalMaxCap = FACILITY_ZONES.reduce((acc, z) => acc + z.maxCap, 0);
  const totalLoadPercent = Math.round((totalOccupancy / totalMaxCap) * 100);

  const handleCalibrateAll = () => {
    setIsCalibrating(true);
    addToast({
      type: 'info',
      title: 'Sensor Gateway Ping Initiated',
      message: 'Broadcasting telemetry pulse across 56 facility BLE & RF transceivers...'
    });

    setTimeout(() => {
      setIsCalibrating(false);
      setEquipmentList((prev) =>
        prev.map((eq) => ({ ...eq, lastCalibration: 'Just now', sensorHealth: '100% Signal' }))
      );
      addToast({
        type: 'success',
        title: 'Sensor Grid Calibrated',
        message: 'All facility IoT gateways synchronized with zero packet loss.'
      });
    }, 1500);
  };

  const handleScheduleMaintenance = (eqName) => {
    addToast({
      type: 'success',
      title: 'Work Order Generated',
      message: `Technician dispatch work order logged for ${eqName}.`
    });
  };

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
      <div
        className="kinetic-card animate-scale-up"
        style={{
          width: '100%',
          maxWidth: '1080px',
          height: '88vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--surface-elevated)',
          border: '1px solid var(--border-hover)',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)'
        }}
        onClick={(e) => e.stopPropagation()}
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
                Real-Time Floor Load & Equipment Telemetry
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
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Real-Time Live Load KPIs */}
        <div
          style={{
            padding: '16px 24px',
            background: 'var(--surface-input)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(212, 255, 0, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Layers size={16} color="var(--accent)" />
            </div>
            <div>
              <div className="type-caption">ON-PREMISES OCCUPANCY</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                {totalOccupancy} / {totalMaxCap} Athletes ({totalLoadPercent}%)
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(6, 182, 212, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Wifi size={16} color="#06b6d4" />
            </div>
            <div>
              <div className="type-caption">CONNECTED SENSOR NODES</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#06b6d4' }}>56 Active Gateways</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Wind size={16} color="var(--status-success)" />
            </div>
            <div>
              <div className="type-caption">HVAC & AIR PURITY</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--status-success)' }}>99 AQI HEPA High Flow</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div
          style={{
            padding: '12px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexShrink: 0
          }}
        >
          {[
            { id: 'zones', label: 'Facility Zones (4)' },
            { id: 'equipment', label: 'Smart Equipment Telemetry' },
            { id: 'access', label: 'Live RFID Access Logs' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-pill)',
                background: activeTab === tab.id ? 'var(--accent)' : 'var(--surface-input)',
                color: activeTab === tab.id ? '#111111' : 'var(--text-secondary)',
                fontSize: '0.78rem',
                fontWeight: 800,
                border: `1px solid ${activeTab === tab.id ? 'var(--accent)' : 'var(--border-subtle)'}`,
                whiteSpace: 'nowrap',
                flexShrink: 0,
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Space */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {/* TAB 1: FACILITY ZONES */}
          {activeTab === 'zones' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
              {FACILITY_ZONES.map((zone) => {
                const zoneLoad = Math.round((zone.occupancy / zone.maxCap) * 100);
                return (
                  <div
                    key={zone.id}
                    className="kinetic-card"
                    style={{
                      padding: '20px',
                      background: 'var(--surface-input)',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        {zone.name}
                      </span>
                      <span
                        className="kinetic-badge"
                        style={{
                          fontSize: '0.66rem',
                          padding: '1px 6px',
                          background: zoneLoad >= 85 ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                          color: zoneLoad >= 85 ? '#f59e0b' : 'var(--status-success)',
                          border: `1px solid ${zoneLoad >= 85 ? 'rgba(245, 158, 11, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`
                        }}
                      >
                        {zoneLoad}% CAPACITY
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div style={{ height: '8px', background: 'var(--surface-elevated)', borderRadius: '4px', overflow: 'hidden', marginBottom: '14px' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${zoneLoad}%`,
                          background: zoneLoad >= 85 ? '#f59e0b' : 'var(--accent)'
                        }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.78rem' }}>
                      <div style={{ color: 'var(--text-secondary)' }}>
                        Active Athletes: <strong style={{ color: 'var(--text-primary)' }}>{zone.occupancy} / {zone.maxCap}</strong>
                      </div>
                      <div style={{ color: 'var(--text-secondary)' }}>
                        Temperature: <strong style={{ color: 'var(--text-primary)' }}>{zone.temp}</strong>
                      </div>
                      <div style={{ color: 'var(--text-secondary)' }}>
                        Air Quality: <strong style={{ color: 'var(--text-primary)' }}>{zone.airQuality}</strong>
                      </div>
                      <div style={{ color: 'var(--text-secondary)' }}>
                        Sensor Gateways: <strong style={{ color: 'var(--accent)' }}>{zone.gateways}</strong>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: SMART EQUIPMENT TELEMETRY */}
          {activeTab === 'equipment' && (
            <div
              style={{
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-subtle)',
                overflow: 'hidden',
                background: 'var(--surface-input)'
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.6fr 1.2fr 1fr 1.2fr 1fr 1fr',
                  padding: '12px 18px',
                  background: 'var(--surface-glass)',
                  borderBottom: '1px solid var(--border-subtle)',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)',
                  letterSpacing: '0.05em'
                }}
              >
                <div>Station Equipment</div>
                <div>Location Zone</div>
                <div>Integrity Score</div>
                <div>Telemetry Signal</div>
                <div>Last Ping</div>
                <div style={{ textAlign: 'right' }}>Maintenance</div>
              </div>

              {equipmentList.map((eq) => (
                <div
                  key={eq.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1.6fr 1.2fr 1fr 1.2fr 1fr 1fr',
                    alignItems: 'center',
                    padding: '14px 18px',
                    borderBottom: '1px solid var(--border-glass)',
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
    </div>
  );
};

import { useState, useMemo } from 'react';
import { useToast } from '../../context/ToastContext';
import { CustomDropdown } from '../ui/CustomDropdown';
import {
  X,
  Search,
  DollarSign,
  Download,
  CreditCard,
  CheckCircle2,
  FileText,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

const INITIAL_TRANSACTIONS = [
  {
    id: 'TX-99412',
    date: '2026-08-25 10:14 AM',
    member: 'Alex Mercer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    tier: 'Elite Athlete',
    amount: 89.00,
    method: 'Visa •••• 8892',
    status: 'completed',
    invoiceNumber: 'INV-2026-0881'
  },
  {
    id: 'TX-99411',
    date: '2026-08-25 09:30 AM',
    member: 'Kasun Fernando',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    tier: 'Elite Annual Plan',
    amount: 468.00,
    method: 'Mastercard •••• 4012',
    status: 'completed',
    invoiceNumber: 'INV-2026-0880'
  },
  {
    id: 'TX-99410',
    date: '2026-08-25 08:45 AM',
    member: 'Sarah Tan',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop',
    tier: 'Pro Athlete',
    amount: 49.00,
    method: 'Apple Pay •••• 1928',
    status: 'completed',
    invoiceNumber: 'INV-2026-0879'
  },
  {
    id: 'TX-99409',
    date: '2026-08-24 06:12 PM',
    member: 'Maya Lin',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop',
    tier: 'Pro Athlete',
    amount: 49.00,
    method: 'Visa •••• 5514',
    status: 'completed',
    invoiceNumber: 'INV-2026-0878'
  },
  {
    id: 'TX-99408',
    date: '2026-08-24 03:20 PM',
    member: 'Ryan Patel',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
    tier: 'Starter Access',
    amount: 29.00,
    method: 'Visa •••• 9901',
    status: 'completed',
    invoiceNumber: 'INV-2026-0877'
  },
  {
    id: 'TX-99407',
    date: '2026-08-24 11:15 AM',
    member: 'Dilan Perera',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop',
    tier: 'Starter Access',
    amount: 29.00,
    method: 'Mastercard •••• 7741',
    status: 'refunded',
    invoiceNumber: 'INV-2026-0876'
  },
  {
    id: 'TX-99406',
    date: '2026-08-23 04:45 PM',
    member: 'Chloe Bennett',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop',
    tier: 'Elite Athlete',
    amount: 89.00,
    method: 'Visa •••• 3320',
    status: 'completed',
    invoiceNumber: 'INV-2026-0875'
  },
  {
    id: 'TX-99405',
    date: '2026-08-23 01:10 PM',
    member: 'Marcus Chen',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=150&auto=format&fit=crop',
    tier: 'Pro Athlete',
    amount: 49.00,
    method: 'Apple Pay •••• 8820',
    status: 'completed',
    invoiceNumber: 'INV-2026-0874'
  }
];

const STATUS_FILTER_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'completed', label: 'Completed' },
  { value: 'refunded', label: 'Refunded' }
];

const TIER_FILTER_OPTIONS = [
  { value: 'all', label: 'All Membership Tiers' },
  { value: 'Elite', label: 'Elite Tier' },
  { value: 'Pro', label: 'Pro Tier' },
  { value: 'Starter', label: 'Starter Tier' }
];

export const FinancialLedgerModal = ({ isOpen, onClose }) => {
  const { addToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    return INITIAL_TRANSACTIONS.filter((tx) => {
      const matchesSearch =
        tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.member.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || tx.status === statusFilter;
      const matchesTier = tierFilter === 'all' || tx.tier.includes(tierFilter);
      return matchesSearch && matchesStatus && matchesTier;
    });
  }, [searchQuery, statusFilter, tierFilter]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage) || 1;
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (!isOpen) return null;

  const handleExportCSV = () => {
    addToast({
      type: 'success',
      title: 'Ledger CSV Exported',
      message: `Exported ${filteredTransactions.length} transaction entries to CSV format.`
    });
  };

  const handlePrintReceipt = (tx) => {
    setSelectedReceipt(tx);
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
              <CreditCard size={18} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="type-eyebrow">FINANCIAL AUDIT & BILLING LEDGER</span>
                <span className="kinetic-badge" style={{ fontSize: '0.66rem', padding: '1px 6px' }}>
                  REAL-TIME
                </span>
              </div>
              <h3 className="type-h3" style={{ fontSize: '1.2rem', margin: 0, whiteSpace: 'nowrap' }}>
                Enterprise Revenue & Transaction Records
              </h3>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <button
              type="button"
              onClick={handleExportCSV}
              className="kinetic-btn-primary"
              style={{ padding: '8px 16px', fontSize: '0.8rem', fontWeight: 800, whiteSpace: 'nowrap', flexShrink: 0 }}
            >
              <Download size={14} />
              <span>Export CSV</span>
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

        {/* Financial KPI Highlights */}
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
              <DollarSign size={16} color="var(--accent)" />
            </div>
            <div>
              <div className="type-caption">GROSS MRR</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--text-primary)' }}>$48,250.00</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={16} color="var(--status-success)" />
            </div>
            <div>
              <div className="type-caption">CHARGE SUCCESS RATE</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--status-success)' }}>99.2%</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(6, 182, 212, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={16} color="#06b6d4" />
            </div>
            <div>
              <div className="type-caption">PAYMENT GATEWAY</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#06b6d4' }}>Stripe 3DS Secured</div>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div
          style={{
            padding: '14px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
            flexShrink: 0
          }}
        >
          {/* Search Input */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 14px',
              borderRadius: 'var(--radius-pill)',
              background: 'var(--surface-input)',
              border: '1px solid var(--border-subtle)',
              minWidth: '280px',
              flex: 1
            }}
          >
            <Search size={15} color="var(--text-tertiary)" />
            <input
              type="text"
              placeholder="Search by member, transaction ID (TX-...), or invoice..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.84rem',
                width: '100%'
              }}
            />
          </div>

          {/* Custom Dropdown Filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '160px' }}>
              <CustomDropdown
                options={STATUS_FILTER_OPTIONS}
                value={statusFilter}
                onChange={setStatusFilter}
              />
            </div>

            <div style={{ width: '190px' }}>
              <CustomDropdown
                options={TIER_FILTER_OPTIONS}
                value={tierFilter}
                onChange={setTierFilter}
              />
            </div>
          </div>
        </div>

        {/* Transactions Table Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
          <div
            style={{
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              overflow: 'hidden',
              background: 'var(--surface-input)'
            }}
          >
            {/* Table Header Row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 1.6fr 1.2fr 1fr 1fr 1fr 0.8fr',
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
              <div>TX ID / Date</div>
              <div>Athlete Member</div>
              <div>Plan Tier</div>
              <div>Amount</div>
              <div>Payment Method</div>
              <div>Status</div>
              <div style={{ textAlign: 'right' }}>Action</div>
            </div>

            {/* Table Rows */}
            {paginatedTransactions.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                No transaction records match your search criteria.
              </div>
            ) : (
              paginatedTransactions.map((tx) => (
                <div
                  key={tx.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 1.6fr 1.2fr 1fr 1fr 1fr 0.8fr',
                    alignItems: 'center',
                    padding: '14px 18px',
                    borderBottom: '1px solid var(--border-glass)',
                    fontSize: '0.84rem',
                    transition: 'background var(--transition-fast)'
                  }}
                >
                  {/* TX ID & Timestamp */}
                  <div>
                    <span style={{ fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'monospace' }}>
                      {tx.id}
                    </span>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                      {tx.date}
                    </div>
                  </div>

                  {/* Member Profile */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={tx.avatar}
                      alt={tx.member}
                      style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{tx.member}</span>
                      <div className="type-caption">{tx.invoiceNumber}</div>
                    </div>
                  </div>

                  {/* Tier */}
                  <div>
                    <span className="kinetic-badge" style={{ fontSize: '0.68rem', padding: '1px 8px' }}>
                      {tx.tier}
                    </span>
                  </div>

                  {/* Amount */}
                  <div style={{ fontWeight: 800, color: tx.status === 'refunded' ? 'var(--status-error)' : 'var(--accent)' }}>
                    {tx.status === 'refunded' ? '-' : '+'}${tx.amount.toFixed(2)}
                  </div>

                  {/* Payment Method */}
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
                    {tx.method}
                  </div>

                  {/* Status Badge */}
                  <div>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-pill)',
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        background:
                          tx.status === 'completed'
                            ? 'rgba(16, 185, 129, 0.15)'
                            : 'rgba(239, 68, 68, 0.15)',
                        color:
                          tx.status === 'completed'
                            ? 'var(--status-success)'
                            : 'var(--status-error)',
                        border: `1px solid ${
                          tx.status === 'completed'
                            ? 'rgba(16, 185, 129, 0.3)'
                            : 'rgba(239, 68, 68, 0.3)'
                        }`
                      }}
                    >
                      {tx.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Receipt Action */}
                  <div style={{ textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => handlePrintReceipt(tx)}
                      className="kinetic-btn-ghost"
                      style={{ padding: '4px 8px', fontSize: '0.74rem' }}
                      title="Inspect Official Receipt"
                    >
                      <FileText size={14} color="var(--accent)" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Table Pagination Footer */}
        <div
          style={{
            padding: '12px 24px',
            background: 'var(--surface-glass)',
            borderTop: '1px solid var(--border-glass)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0
          }}
        >
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            Showing {paginatedTransactions.length} of {filteredTransactions.length} recorded entries
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="kinetic-btn-ghost"
              style={{
                padding: '6px 10px',
                fontSize: '0.78rem',
                opacity: currentPage === 1 ? 0.4 : 1,
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
              }}
            >
              <ChevronLeft size={14} /> Previous
            </button>

            <span style={{ fontSize: '0.78rem', color: 'var(--text-primary)', fontWeight: 800, padding: '0 6px' }}>
              Page {currentPage} of {totalPages}
            </span>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="kinetic-btn-ghost"
              style={{
                padding: '6px 10px',
                fontSize: '0.78rem',
                opacity: currentPage === totalPages ? 0.4 : 1,
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
              }}
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Official Receipt Inspection Modal */}
      {selectedReceipt && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9998,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.92)',
            padding: '16px'
          }}
          onClick={() => setSelectedReceipt(null)}
        >
          <div
            className="kinetic-card animate-scale-up"
            style={{
              width: '100%',
              maxWidth: '460px',
              padding: '28px',
              background: 'var(--surface-elevated)',
              border: '1px solid var(--border-hover)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={18} color="var(--accent)" />
                <h4 className="type-h3" style={{ fontSize: '1.15rem', margin: 0 }}>
                  Official Tax Receipt
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReceipt(null)}
                style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.86rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Invoice Number:</span>
                <strong style={{ color: 'var(--text-primary)' }}>{selectedReceipt.invoiceNumber}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Transaction ID:</span>
                <strong style={{ color: 'var(--text-primary)', fontFamily: 'monospace' }}>{selectedReceipt.id}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Athlete Member:</span>
                <strong style={{ color: 'var(--text-primary)' }}>{selectedReceipt.member}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Subscription Plan:</span>
                <strong style={{ color: 'var(--accent)' }}>{selectedReceipt.tier}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Payment Method:</span>
                <strong style={{ color: 'var(--text-primary)' }}>{selectedReceipt.method}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', fontSize: '1.1rem' }}>
                <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>Total Amount Paid:</span>
                <strong style={{ fontWeight: 900, color: 'var(--accent)' }}>${selectedReceipt.amount.toFixed(2)} USD</strong>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                addToast({
                  type: 'success',
                  title: 'Receipt PDF Downloaded',
                  message: `Tax receipt for ${selectedReceipt.invoiceNumber} saved locally.`
                });
                setSelectedReceipt(null);
              }}
              className="kinetic-btn-primary"
              style={{ width: '100%', marginTop: '24px', justifyContent: 'center' }}
            >
              <Download size={14} />
              <span>Download PDF Invoice</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

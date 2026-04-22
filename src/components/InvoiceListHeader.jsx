import { useState } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import { useInvoices } from '../context/InvoiceContext';
import './InvoiceListHeader.css';

const InvoiceListHeader = ({ onNewInvoice }) => {
  const { invoices, setFilterStatus, filterStatus } = useInvoices();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const statuses = ['all', 'draft', 'pending', 'paid'];

  return (
    <header className="list-header">
      <div className="header-text">
        <h1>Invoices</h1>
        <p className="desktop-count">There are {invoices.length} total invoices</p>
        <p className="mobile-count">{invoices.length} invoices</p>
      </div>

      <div className="header-actions">
        <div className="filter-container">
          <button 
            className="filter-btn" 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <span className="desktop-text">Filter by status</span>
            <span className="mobile-text">Filter</span>
            <ChevronDown className={`chevron ${isFilterOpen ? 'open' : ''}`} size={16} color="#7C5DFA" />
          </button>

          {isFilterOpen && (
            <div className="filter-dropdown fade-in">
              {statuses.map((status) => (
                <label key={status} className="filter-option">
                  <input
                    type="radio"
                    name="statusFilter"
                    checked={filterStatus === status}
                    onChange={() => setFilterStatus(status)}
                  />
                  <span className="checkbox-custom" style={{ borderRadius: '50%' }}></span>
                  <span className="status-name">{status === 'all' ? 'All' : status}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <button className="new-btn" onClick={onNewInvoice}>
          <div className="plus-circle">
            <Plus size={16} color="#7C5DFA" strokeWidth={4} />
          </div>
          <span className="desktop-text">New Invoice</span>
          <span className="mobile-text">New</span>
        </button>
      </div>
    </header>
  );
};

export default InvoiceListHeader;

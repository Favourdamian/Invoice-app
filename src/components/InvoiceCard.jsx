import { ChevronRight } from 'lucide-react';
import './InvoiceCard.css';

const InvoiceCard = ({ invoice, onClick }) => {
  // Simple formatting functions inside the component
  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="invoice-card fade-in" onClick={() => onClick(invoice.id)}>
      <span className="id"><span>#</span>{invoice.id}</span>
      <span className="due-date">Due {formatDate(invoice.paymentDue)}</span>
      <span className="client-name">{invoice.clientName}</span>
      <span className="total">{formatPrice(invoice.total)}</span>
      <div className={`status-badge ${invoice.status}`}>
        <div className="dot"></div>
        {invoice.status}
      </div>
      <ChevronRight className="chevron" size={16} color="#7C5DFA" />
    </div>
  );
};

export default InvoiceCard;

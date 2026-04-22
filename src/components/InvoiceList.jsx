import InvoiceCard from './InvoiceCard';
import emptyImg from '../assets/images/Email campaign_Flatline.png';
import './InvoiceList.css';

const InvoiceList = ({ invoices, onInvoiceClick }) => {
  if (invoices.length === 0) {
    return (
      <div className="empty-state fade-in">
        <div className="empty-img-container">
          <img src={emptyImg} alt="No invoices" className="empty-illustration" />
        </div>
        <h2>There is nothing here</h2>
        <p>Create an invoice by clicking the <br /> <span>New Invoice</span> button and get started</p>
      </div>
    );
  }

  return (
    <div className="invoice-list">
      {invoices.map((invoice) => (
        <InvoiceCard 
          key={invoice.id} 
          invoice={invoice} 
          onClick={onInvoiceClick} 
        />
      ))}
    </div>
  );
};

export default InvoiceList;

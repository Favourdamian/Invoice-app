import { ChevronLeft } from "lucide-react";
import { useInvoices } from "../context/InvoiceContext";
import "./InvoiceDetails.css";

const InvoiceDetails = ({ id, onBack, onEdit, onDelete }) => {
  const { allInvoices, markAsPaid } = useInvoices();
  const invoice = allInvoices.find((inv) => inv.id === id);

  if (!invoice) return <div className="container">Invoice not found</div>;

  // Simple formatting functions
  const formatPrice = (amount) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="invoice-details-view fade-in">
      <button onClick={onBack} className="back-btn">
        <ChevronLeft size={16} color="#7C5DFA" />
        Go back
      </button>

      <div className="details-header">
        <div className="status-container">
          <span className="status-label">Status</span>
          <div className={`status-badge ${invoice.status}`}>
            <div className="dot"></div>
            {invoice.status}
          </div>
        </div>

        <div className="details-actions desktop-actions">
          <button className="edit-btn" onClick={() => onEdit(invoice)}>
            Edit
          </button>
          <button className="del-btn" onClick={() => onDelete(invoice.id)}>
            Delete
          </button>
          {invoice.status === "pending" && (
            <button className="paid-btn" onClick={() => markAsPaid(invoice.id)}>
              Mark as Paid
            </button>
          )}
        </div>
      </div>

      <div className="details-card">
        <div className="details-top">
          <div className="id-info">
            <span className="id">
              <span>#</span>
              {invoice.id}
            </span>
            <span className="description">{invoice.description}</span>
          </div>
          <div className="sender-address-info">
            <span className="street">{invoice.senderAddress.street}</span>
            <div className="sender-address-grid">
              <div className="address-field">
                <span className="label">City</span>
                <span className="value">{invoice.senderAddress.city}</span>
              </div>
              <div className="address-field">
                <span className="label">Post Code</span>
                <span className="value">{invoice.senderAddress.postCode}</span>
              </div>
              <div className="address-field">
                <span className="label">Country</span>
                <span className="value">{invoice.senderAddress.country}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="details-mid">
          <div className="dates">
            <div className="date-group">
              <span className="label">Invoice Date</span>
              <span className="value">{formatDate(invoice.createdAt)}</span>
            </div>
            <div className="date-group">
              <span className="label">Payment Due</span>
              <span className="value">{formatDate(invoice.paymentDue)}</span>
            </div>
          </div>

          <div className="bill-to">
            <span className="label">Bill To</span>
            <span className="value name">{invoice.clientName}</span>
            <div className="client-address-info">
              <span className="street">{invoice.clientAddress.street}</span>
              <div className="client-address-grid">
                <div className="address-field">
                  <span className="label">City</span>
                  <span className="value">{invoice.clientAddress.city}</span>
                </div>
                <div className="address-field">
                  <span className="label">Post Code</span>
                  <span className="value">
                    {invoice.clientAddress.postCode}
                  </span>
                </div>
                <div className="address-field">
                  <span className="label">Country</span>
                  <span className="value">{invoice.clientAddress.country}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="sent-to">
            <span className="label">Sent to</span>
            <span className="value">{invoice.clientEmail}</span>
          </div>
        </div>

        <div className="details-bottom">
          <div className="items-table">
            <div className="table-header">
              <span>Item Name</span>
              <span>QTY.</span>
              <span>Price</span>
              <span>Total</span>
            </div>
            {invoice.items.map((item, index) => (
              <div key={index} className="table-row">
                <span className="item-name">{item.name}</span>
                <span className="item-qty">{item.quantity}</span>
                <span className="item-price">{formatPrice(item.price)}</span>
                <span className="item-total">{formatPrice(item.total)}</span>

                <div className="mobile-item-info">
                  <div className="name-and-qty">
                    <span className="m-name">{item.name}</span>
                    <span className="m-qty">
                      {item.quantity} x {formatPrice(item.price)}
                    </span>
                  </div>
                  <span className="m-total">{formatPrice(item.total)}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="grand-total">
            <span>Amount Due</span>
            <span className="total-value">{formatPrice(invoice.total)}</span>
          </div>
        </div>
      </div>

      <div className="mobile-actions-bar">
        <button className="edit-btn" onClick={() => onEdit(invoice)}>
          Edit
        </button>
        <button className="del-btn" onClick={() => onDelete(invoice.id)}>
          Delete
        </button>
        {invoice.status === "pending" && (
          <button className="paid-btn" onClick={() => markAsPaid(invoice.id)}>
            Mark as Paid
          </button>
        )}
      </div>
    </div>
  );
};

export default InvoiceDetails;

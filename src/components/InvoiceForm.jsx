import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useInvoices } from '../context/InvoiceContext';
import './InvoiceForm.css';

// Simple helper to create a random ID
const generateId = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  let id = '';
  for (let i = 0; i < 2; i++) id += letters.charAt(Math.floor(Math.random() * letters.length));
  for (let i = 0; i < 4; i++) id += numbers.charAt(Math.floor(Math.random() * numbers.length));
  return id;
};

const InvoiceForm = ({ invoice, onClose }) => {
  const { addInvoice, updateInvoice } = useInvoices();
  const isEditing = invoice ? true : false;

  const [formData, setFormData] = useState(() => ({
    id: isEditing ? invoice.id : generateId(),
    createdAt: isEditing ? invoice.createdAt : new Date().toISOString().split('T')[0],
    paymentDue: isEditing ? invoice.paymentDue : '',
    description: isEditing ? invoice.description : '',
    paymentTerms: isEditing ? invoice.paymentTerms : 30,
    clientName: isEditing ? invoice.clientName : '',
    clientEmail: isEditing ? invoice.clientEmail : '',
    status: isEditing ? invoice.status : 'pending',
    senderAddress: isEditing ? { ...invoice.senderAddress } : { street: '', city: '', postCode: '', country: '' },
    clientAddress: isEditing ? { ...invoice.clientAddress } : { street: '', city: '', postCode: '', country: '' },
    items: isEditing ? invoice.items.map(item => ({ ...item })) : [],
    total: isEditing ? invoice.total : 0
  }));

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSenderChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      senderAddress: { ...formData.senderAddress, [name]: value }
    });
  };

  const handleClientAddressChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      clientAddress: { ...formData.clientAddress, [name]: value }
    });
  };

  const handleItemChange = (e, index) => {
    const name = e.target.name;
    const value = e.target.value;
    const newItems = [...formData.items];
    const item = { ...newItems[index] };
    
    item[name] = value;
    
    if (name === 'quantity' || name === 'price') {
      item.total = Number(item.quantity || 0) * Number(item.price || 0);
    }
    
    newItems[index] = item;
    const newTotal = newItems.reduce((acc, curr) => acc + curr.total, 0);
    setFormData({ ...formData, items: newItems, total: newTotal });
  };

  const addNewItem = () => {
    const newItem = { name: '', quantity: 1, price: 0, total: 0 };
    setFormData({ ...formData, items: [...formData.items, newItem] });
  };

  const removeAnItem = (index) => {
    const newItems = formData.items.filter((item, i) => i !== index);
    const newTotal = newItems.reduce((acc, curr) => acc + curr.total, 0);
    setFormData({ ...formData, items: newItems, total: newTotal });
  };

  const saveAsDraft = () => {
    const finalData = { ...formData, status: 'draft' };
    addInvoice(finalData);
    onClose();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const finalData = { ...formData, status: isEditing ? formData.status : 'pending' };
    
    if (isEditing) {
      updateInvoice(finalData);
    } else {
      addInvoice(finalData);
    }
    onClose();
  };

  return (
    <form className="invoice-form" onSubmit={handleFormSubmit}>
      {/* Bill From Section */}
      <div className="form-group">
        <h3 className="group-title">Bill From</h3>
        <div className="field full">
          <label htmlFor="senderStreet">Street Address</label>
          <input type="text" id="senderStreet" name="street" value={formData.senderAddress.street} onChange={handleSenderChange} required />
        </div>
        <div className="field-grid">
          <div className="field">
            <label htmlFor="senderCity">City</label>
            <input type="text" id="senderCity" name="city" value={formData.senderAddress.city} onChange={handleSenderChange} required />
          </div>
          <div className="field">
            <label htmlFor="senderPostCode">Post Code</label>
            <input type="text" id="senderPostCode" name="postCode" value={formData.senderAddress.postCode} onChange={handleSenderChange} required />
          </div>
          <div className="field">
            <label htmlFor="senderCountry">Country</label>
            <input type="text" id="senderCountry" name="country" value={formData.senderAddress.country} onChange={handleSenderChange} required />
          </div>
        </div>
      </div>

      {/* Bill To Section */}
      <div className="form-group">
        <h3 className="group-title">Bill To</h3>
        <div className="field full">
          <label htmlFor="clientName">Client's Name</label>
          <input type="text" id="clientName" name="clientName" value={formData.clientName} onChange={handleInputChange} required />
        </div>
        <div className="field full">
          <label htmlFor="clientEmail">Client's Email</label>
          <input type="email" id="clientEmail" name="clientEmail" value={formData.clientEmail} onChange={handleInputChange} required />
        </div>
        <div className="field full">
          <label htmlFor="clientStreet">Street Address</label>
          <input type="text" id="clientStreet" name="street" value={formData.clientAddress.street} onChange={handleClientAddressChange} required />
        </div>
        <div className="field-grid">
          <div className="field">
            <label htmlFor="clientCity">City</label>
            <input type="text" id="clientCity" name="city" value={formData.clientAddress.city} onChange={handleClientAddressChange} required />
          </div>
          <div className="field">
            <label htmlFor="clientPostCode">Post Code</label>
            <input type="text" id="clientPostCode" name="postCode" value={formData.clientAddress.postCode} onChange={handleClientAddressChange} required />
          </div>
          <div className="field">
            <label htmlFor="clientCountry">Country</label>
            <input type="text" id="clientCountry" name="country" value={formData.clientAddress.country} onChange={handleClientAddressChange} required />
          </div>
        </div>
      </div>

      <div className="form-group">
        <div className="field-grid-2">
          <div className="field">
            <label htmlFor="createdAt">Invoice Date</label>
            <input type="date" id="createdAt" name="createdAt" value={formData.createdAt} onChange={handleInputChange} required />
          </div>
          <div className="field">
            <label htmlFor="paymentTerms">Payment Terms</label>
            <select id="paymentTerms" name="paymentTerms" value={formData.paymentTerms} onChange={handleInputChange}>
              <option value="1">Next 1 Day</option>
              <option value="7">Next 7 Days</option>
              <option value="30">Next 30 Days</option>
            </select>
          </div>
        </div>
        <div className="field full">
          <label htmlFor="description">Project Description</label>
          <input type="text" id="description" name="description" value={formData.description} onChange={handleInputChange} required />
        </div>
      </div>

      {/* Item List Section */}
      <div className="form-group">
        <h3 className="item-list-title">Item List</h3>
        <div className="item-list">
          <div className="item-header">
            <span>Item Name</span>
            <span>Qty.</span>
            <span>Price</span>
            <span>Total</span>
            <span></span>
          </div>
          
          {formData.items.map((item, index) => (
            <div key={index} className="item-row">
              <div className="field">
                <input type="text" aria-label="Item Name" name="name" value={item.name} onChange={(e) => handleItemChange(e, index)} required />
              </div>
              <div className="field">
                <input type="number" aria-label="Quantity" name="quantity" value={item.quantity} onChange={(e) => handleItemChange(e, index)} required />
              </div>
              <div className="field">
                <input type="number" aria-label="Price" name="price" value={item.price} onChange={(e) => handleItemChange(e, index)} required />
              </div>
              <div className="item-total-val">
                £{item.total.toFixed(2)}
              </div>
              <button type="button" aria-label="Delete Item" className="del-item-btn" onClick={() => removeAnItem(index)}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
        
        <button type="button" className="add-item-btn" onClick={addNewItem}>
          + Add New Item
        </button>
      </div>

      <div className="form-footer">
        <button type="button" className="cancel-btn" onClick={onClose}>
          {isEditing ? 'Cancel' : 'Discard'}
        </button>
        <div className="save-actions">
          {!isEditing && (
            <button type="button" className="draft-btn" formNoValidate onClick={saveAsDraft}>
              Save as Draft
            </button>
          )}
          <button type="submit" className="submit-btn">
            {isEditing ? 'Save Changes' : 'Save & Send'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default InvoiceForm;

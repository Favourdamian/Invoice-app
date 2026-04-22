import { useState } from 'react';
import Sidebar from './components/Sidebar';
import InvoiceListHeader from './components/InvoiceListHeader';
import InvoiceList from './components/InvoiceList';
import InvoiceDetails from './components/InvoiceDetails';
import InvoiceForm from './components/InvoiceForm';
import ModalWrapper from './components/ModalWrapper';
import { useInvoices } from './context/InvoiceContext';
import './App.css';

function App() {
  const { invoices, deleteInvoice } = useInvoices();
  const [view, setView] = useState('list'); // 'list' or 'details'
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);

  const handleInvoiceClick = (id) => {
    setSelectedInvoiceId(id);
    setView('details');
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    setView('list');
    setSelectedInvoiceId(null);
  };

  const handleEdit = (invoice) => {
    setEditingInvoice(invoice);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id) => {
    setSelectedInvoiceId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    deleteInvoice(selectedInvoiceId);
    setIsDeleteModalOpen(false);
    setView('list');
    setSelectedInvoiceId(null);
  };

  return (
    <div className="app-container">
      <Sidebar />
      
      <main className="main-content">
        <div className="container">
          {view === 'list' ? (
            <>
              <InvoiceListHeader onNewInvoice={() => { setEditingInvoice(null); setIsFormOpen(true); }} />
              <InvoiceList 
                invoices={invoices} 
                onInvoiceClick={handleInvoiceClick} 
              />
            </>
          ) : (
            <InvoiceDetails 
              id={selectedInvoiceId} 
              onBack={goBack}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          )}
        </div>
      </main>

      {/* InvoiceForm (Slide-in) */}
      <ModalWrapper 
        isOpen={isFormOpen} 
        onClose={() => { setIsFormOpen(false); setEditingInvoice(null); }}
        overlayClassName="form-overlay"
        className="form-container"
      >
        <h2 style={{ color: 'var(--color-text-main)', marginBottom: '48px', fontSize: '24px', letterSpacing: '-0.5px' }}>
          {editingInvoice ? (
             <>Edit <span style={{ color: 'var(--color-text-secondary)' }}>#</span>{editingInvoice.id}</>
          ) : (
            'New Invoice'
          )}
        </h2>
        
        <InvoiceForm 
          invoice={editingInvoice} 
          onClose={() => { setIsFormOpen(false); setEditingInvoice(null); }} 
        />
      </ModalWrapper>

      {/* Delete Confirmation Modal */}
      <ModalWrapper 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)}
        overlayClassName="modal-overlay"
        className="modal-content fade-in"
      >
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete invoice #{selectedInvoiceId}? This action cannot be undone.</p>
        <div className="modal-actions">
          <button className="edit-btn" onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
          <button className="del-btn" onClick={confirmDelete}>Delete</button>
        </div>
      </ModalWrapper>
    </div>
  );
}

export default App;

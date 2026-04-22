import { Trash2 } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

const FormItemList = ({ items, onAddItem, onRemoveItem, onItemChange }) => {
  return (
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
        
        {items.map((item, index) => (
          <div key={index} className="item-row">
            <div className="field">
              <input 
                type="text" 
                name="name" 
                value={item.name} 
                onChange={(e) => onItemChange(e, index)} 
              />
            </div>
            <div className="field">
              <input 
                type="number" 
                name="quantity" 
                value={item.quantity} 
                onChange={(e) => onItemChange(e, index)} 
              />
            </div>
            <div className="field">
              <input 
                type="number" 
                name="price" 
                value={item.price} 
                onChange={(e) => onItemChange(e, index)} 
              />
            </div>
            <div className="item-total-val">
              {formatCurrency(item.total)}
            </div>
            <button 
              type="button" 
              className="del-item-btn" 
              onClick={() => onRemoveItem(index)}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
      
      <button type="button" className="add-item-btn" onClick={onAddItem}>
        + Add New Item
      </button>
    </div>
  );
};

export default FormItemList;

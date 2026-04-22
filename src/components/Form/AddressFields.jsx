const AddressFields = ({ section, data, onChange, title }) => {
  return (
    <div className="form-group">
      <h3 className="group-title">{title}</h3>
      <div className="field full">
        <label>Street Address</label>
        <input 
          type="text" 
          name="street" 
          value={data.street} 
          onChange={(e) => onChange(e, section)} 
        />
      </div>
      <div className="field-grid">
        <div className="field">
          <label>City</label>
          <input 
            type="text" 
            name="city" 
            value={data.city} 
            onChange={(e) => onChange(e, section)} 
          />
        </div>
        <div className="field">
          <label>Post Code</label>
          <input 
            type="text" 
            name="postCode" 
            value={data.postCode} 
            onChange={(e) => onChange(e, section)} 
          />
        </div>
        <div className="field">
          <label>Country</label>
          <input 
            type="text" 
            name="country" 
            value={data.country} 
            onChange={(e) => onChange(e, section)} 
          />
        </div>
      </div>
    </div>
  );
};

export default AddressFields;

import { useState, useEffect } from 'react';

const TrackForm = ({ onSubmit, initialData = {}, submitLabel = 'Zapisz' }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    length_meters: '',
    is_indoor: false,
    ...initialData
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nazwa toru</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Lokalizacja</label>
        <input
          type="text"
          name="location"
          className="form-control"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Długość (m)</label>
        <input
          type="number"
          name="length_meters"
          className="form-control"
          value={formData.length_meters}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-check">
        <input
          type="checkbox"
          name="is_indoor"
          className="form-check-input"
          checked={formData.is_indoor}
          onChange={handleChange}
        />
        <label className="form-check-label">Tor kryty</label>
      </div>

      <button type="submit" className="btn btn-primary mt-2">{submitLabel}</button>
    </form>
  );
};

export default TrackForm;

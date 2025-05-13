import { useState } from 'react';

const RaceForm = ({ onSubmit, initialData = {}, submitLabel = 'Zapisz' }) => {
  const [formData, setFormData] = useState({
    name: '',
    start_time: '',
    end_time: '',
    ...initialData
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nazwa wyścigu</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="form-group">
        <label>Data rozpoczęcia</label>
        <input
          type="datetime-local"
          name="start_time"
          value={formData.start_time}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="form-group">
        <label>Data zakończenia</label>
        <input
          type="datetime-local"
          name="end_time"
          value={formData.end_time}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary mt-2">{submitLabel}</button>
    </form>
  );
};

export default RaceForm;

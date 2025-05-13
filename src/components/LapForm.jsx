import { useEffect, useState } from 'react';
import { getUsers } from '../services/user.service'; // Nowy serwis użytkowników

const LapForm = ({ onSubmit, initialData = {}, submitLabel = 'Zapisz' }) => {
  const [formData, setFormData] = useState({
    user_id: '',
    lap_number: '',
    lap_time_seconds: '',
    position: '',
    ...initialData,
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Użytkownik</label>
        <select
          name="user_id"
          value={formData.user_id}
          onChange={handleChange}
          className="form-control"
          required
        >
          <option value="">-- Wybierz użytkownika --</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.email || `ID ${user.id}`}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Numer okrążenia</label>
        <input
          type="number"
          name="lap_number"
          value={formData.lap_number}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="form-group">
        <label>Czas okrążenia (sekundy)</label>
        <input
          type="number"
          name="lap_time_seconds"
          step="0.01"
          value={formData.lap_time_seconds}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="form-group">
        <label>Pozycja</label>
        <input
          type="number"
          name="position"
          value={formData.position}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary mt-2">{submitLabel}</button>
    </form>
  );
};

export default LapForm;

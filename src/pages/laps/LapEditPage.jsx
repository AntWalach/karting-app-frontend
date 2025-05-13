import { useEffect, useState } from 'react';
import { getLap, updateLap } from '../../services/lap.service';
import { useParams, useNavigate } from 'react-router-dom';
import LapForm from '../../components/LapForm';

const LapEditPage = () => {
  const { id } = useParams(); // ID okrążenia
  const navigate = useNavigate();
  const [lap, setLap] = useState(null);

  useEffect(() => {
    const fetchLap = async () => {
      const data = await getLap(id);
      setLap(data);
    };
    fetchLap();
  }, [id]);

  const handleSubmit = async (data) => {
    await updateLap(id, data);
    if (lap && lap.race_id) {
      navigate(`/races/${lap.race_id}`);
    }
  };

  if (!lap) return <p>Ładowanie...</p>;

  return (
    <div>
      <h2>Edytuj okrążenie</h2>
      <LapForm onSubmit={handleSubmit} initialData={lap} submitLabel="Zapisz zmiany" />
    </div>
  );
};

export default LapEditPage;

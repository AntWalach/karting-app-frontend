import { useParams, useNavigate } from 'react-router-dom';
import LapForm from '../../components/LapForm';
import { createLap } from '../../services/lap.service';

const LapCreatePage = () => {
  const { raceId } = useParams(); // id wyścigu
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    await createLap(raceId, data);
    navigate(`/races/${raceId}`);
  };

  return (
    <div>
      <h2>Dodaj okrążenie</h2>
      <LapForm onSubmit={handleSubmit} submitLabel="Dodaj" />
    </div>
  );
};

export default LapCreatePage;

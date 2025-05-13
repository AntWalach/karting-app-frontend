import RaceForm from '../../components/RaceForm';
import { useParams, useNavigate } from 'react-router-dom';
import { createRace } from '../../services/race.service';

const RaceCreatePage = () => {
  const { trackId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    await createRace(trackId, data);
    navigate(`/tracks/${trackId}`);
  };

  return (
    <div>
      <h2>Nowy wyścig</h2>
      <RaceForm onSubmit={handleSubmit} submitLabel="Dodaj" />
    </div>
  );
};

export default RaceCreatePage;

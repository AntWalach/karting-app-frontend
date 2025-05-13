import { useNavigate } from 'react-router-dom';
import { createTrack } from '../../services/track.service';
import TrackForm from '../../components/TrackForm';

const TrackCreatePage = () => {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    await createTrack(data);
    navigate('/tracks');
  };

  return (
    <div className="container mt-4">
      <h2>Dodaj nowy tor</h2>
      <TrackForm onSubmit={handleCreate} submitLabel="Dodaj" />
    </div>
  );
};

export default TrackCreatePage;

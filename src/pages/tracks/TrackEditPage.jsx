import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTrack, updateTrack } from '../../services/track.service';
import TrackForm from '../../components/TrackForm';

const TrackEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trackData, setTrackData] = useState(null);

  useEffect(() => {
    getTrack(id).then(setTrackData);
  }, [id]);

  const handleUpdate = async (data) => {
    await updateTrack(id, data);
    navigate('/tracks');
  };

  return (
    <div className="container mt-4">
      <h2>Edytuj tor</h2>
      {trackData && <TrackForm onSubmit={handleUpdate} initialData={trackData} submitLabel="Zapisz zmiany" />}
    </div>
  );
};

export default TrackEditPage;

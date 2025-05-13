import { useEffect, useState } from 'react';
import { getTracks, deleteTrack } from '../../services/track.service';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// importy pozostają bez zmian

const TrackListPage = () => {
  const { role } = useAuth();
  const [tracks, setTracks] = useState([]);

  const loadTracks = async () => {
    const data = await getTracks();
    setTracks(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Czy na pewno usunąć ten tor?')) {
      await deleteTrack(id);
      loadTracks();
    }
  };

  useEffect(() => {
    loadTracks();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Lista torów</h2>
      {role === 'A' && (
        <Link to="/tracks/new" className="btn btn-success mb-3">Dodaj tor</Link>
      )}
      <ul className="list-group">
        {tracks.map((track) => (
          <li key={track.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <Link to={`/tracks/${track.id}`} className="text-decoration-none fw-bold">
                {track.name}
              </Link> – {track.location} ({track.length_meters}m, {track.is_indoor ? 'kryty' : 'otwarty'})
            </div>
            <div>
              {role === 'A' && (
                <>
                  <Link to={`/tracks/edit/${track.id}`} className="btn btn-sm btn-warning me-2">Edytuj</Link>
                  <button onClick={() => handleDelete(track.id)} className="btn btn-sm btn-danger">Usuń</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackListPage;

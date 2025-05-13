import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTrack } from '../../services/track.service';
import { getRaces, deleteRace } from '../../services/race.service';
import { useAuth } from '../../context/AuthContext';

const TrackDetailsPage = () => {
  const { id } = useParams();
  const { role } = useAuth();
  const [track, setTrack] = useState(null);
  const [races, setRaces] = useState([]);

  useEffect(() => {
    const fetchTrackAndRaces = async () => {
      try {
        const trackData = await getTrack(id);
        setTrack(trackData);

        const raceData = await getRaces(id); // trackId = id
        setRaces(raceData);
      } catch (error) {
        console.error('Błąd ładowania danych:', error);
      }
    };

    fetchTrackAndRaces();
  }, [id]);

  const handleDeleteRace = async (raceId) => {
    if (window.confirm('Czy na pewno usunąć ten wyścig?')) {
      await deleteRace(raceId);
      const updatedRaces = await getRaces(id);
      setRaces(updatedRaces);
    }
  };

  if (!track) return <p>Ładowanie...</p>;

  return (
    <div className="container mt-4">
      <h2>{track.name}</h2>
      <p><strong>Lokalizacja:</strong> {track.location}</p>
      <p><strong>Długość:</strong> {track.length_meters} m</p>
      <p><strong>Typ:</strong> {track.is_indoor ? 'Kryty' : 'Otwarty'}</p>

      <Link to="/tracks" className="btn btn-secondary mt-3 mb-4">Wróć do listy</Link>

      <hr />

      <h4>Wyścigi</h4>
      {role === 'A' && (
        <Link to={`/tracks/${track.id}/races/new`} className="btn btn-success mb-2">Dodaj wyścig</Link>
      )}
      {races.length === 0 ? (
        <p>Brak wyścigów dla tego toru.</p>
      ) : (
        <ul className="list-group">
          {races.map((race) => (
            <li key={race.id} className="list-group-item d-flex justify-content-between align-items-center">
              {race.name} — {new Date(race.start_time).toLocaleString()}
              <div>
                <Link to={`/races/${race.id}`} className="btn btn-sm btn-info mx-1">Szczegóły</Link>
                {role === 'A' && (
                  <>
                    <Link to={`/races/${race.id}/edit`} className="btn btn-sm btn-warning mx-1">Edytuj</Link>
                    <button onClick={() => handleDeleteRace(race.id)} className="btn btn-sm btn-danger">Usuń</button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrackDetailsPage;

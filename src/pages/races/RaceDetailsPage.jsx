import { useEffect, useState } from 'react';
import { getRace } from '../../services/race.service';
import { getLaps } from '../../services/lap.service';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RaceDetailsPage = () => {
  const { id } = useParams();
  const { role } = useAuth();
  const [race, setRace] = useState(null);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const raceData = await getRace(id);
      setRace(raceData);

      const lapsData = await getLaps(id);
      setLaps(lapsData);
    };
    fetchData();
  }, [id]);

  if (!race) return <p>Ładowanie...</p>;

  return (
    <div>
      <h2>{race.name}</h2>
      <p><strong>Start:</strong> {new Date(race.start_time).toLocaleString()}</p>
      <p><strong>Koniec:</strong> {new Date(race.end_time).toLocaleString()}</p>

      <Link to={`/tracks/${race.track_id}`} className="btn btn-secondary mt-3 mb-4">Wróć do toru</Link>

      <hr />
      <h3>Okrążenia</h3>
      {role === 'A' && (
        <Link to={`/races/${id}/laps/new`} className="btn btn-sm btn-success mb-2">Dodaj okrążenie</Link>
      )}
      {laps.length === 0 ? (
        <p>Brak okrążeń.</p>
      ) : (
        <ul className="list-group">
          {laps.map(lap => (
            <li key={lap.id} className="list-group-item d-flex justify-content-between align-items-center">
              Okrążenie #{lap.lap_number} – {lap.lap_time_seconds}s {' '}
              <span className="text-muted">
                ({lap.username})
              </span>
              <div>
                <Link to={`/laps/${lap.id}`} className="btn btn-sm btn-info me-2">Szczegóły</Link>
                {role === 'A' && (
                  <Link to={`/laps/${lap.id}/edit`} className="btn btn-sm btn-warning">Edytuj</Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RaceDetailsPage;

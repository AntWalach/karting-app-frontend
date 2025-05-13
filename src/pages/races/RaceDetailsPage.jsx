import { useEffect, useState } from 'react';
import { getRace } from '../../services/race.service';
import { useParams } from 'react-router-dom';

const RaceDetailsPage = () => {
  const { id } = useParams();
  const [race, setRace] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRace(id);
      setRace(data);
    };
    fetchData();
  }, [id]);

  if (!race) return <p>Ładowanie...</p>;

  return (
    <div>
      <h2>{race.name}</h2>
      <p><strong>Start:</strong> {new Date(race.start_time).toLocaleString()}</p>
      <p><strong>Koniec:</strong> {new Date(race.end_time).toLocaleString()}</p>
    </div>
  );
};

export default RaceDetailsPage;

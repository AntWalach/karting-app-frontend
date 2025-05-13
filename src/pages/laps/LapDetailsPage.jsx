import { useEffect, useState } from 'react';
import { getLap } from '../../services/lap.service';
import { useParams } from 'react-router-dom';

const LapDetailsPage = () => {
  const { id } = useParams();
  const [lap, setLap] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLap(id);
      setLap(data);
      console.log(data)
    };
    fetchData();
  }, [id]);

  if (!lap) return <p>Ładowanie...</p>;

  return (
    <div>
      <h2>Okrążenie #{lap.lap_number}</h2>
      <p><strong>Kierowca:</strong> {lap.username}</p>
      <p><strong>Czas okrążenia:</strong> {lap.lap_time_seconds} sekundy</p>
      <p><strong>Pozycja:</strong> {lap.position}</p>
    </div>
  );
};

export default LapDetailsPage;

import { useEffect, useState } from 'react';
import { getRace, updateRace } from '../../services/race.service';
import { useParams, useNavigate } from 'react-router-dom';
import RaceForm from '../../components/RaceForm';

const RaceEditPage = () => {
  const { id } = useParams();  // Id wyścigu
  const navigate = useNavigate();
  const [race, setRace] = useState(null);

  useEffect(() => {
    const fetchRace = async () => {
      const data = await getRace(id);

      // Funkcja pomocnicza do konwersji daty na format yyyy-MM-ddTHH:mm
      const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toISOString().slice(0, 16); // yyyy-MM-ddTHH:mm
      };

      const formattedRace = {
        ...data,
        start_time: formatDate(data.start_time),
        end_time: formatDate(data.end_time),
      };

      setRace(formattedRace);
    };

    fetchRace();
  }, [id]);

  const handleSubmit = async (data) => {
    await updateRace(id, data);
    
    // Przekierowanie na stronę toru
    if (race && race.track_id) {
      navigate(`/tracks/${race.track_id}`);
    }
  };

  if (!race) return <p>Ładowanie...</p>;

  return (
    <div>
      <h2>Edytuj wyścig</h2>
      <RaceForm onSubmit={handleSubmit} initialData={race} submitLabel="Zapisz zmiany" />
    </div>
  );
};

export default RaceEditPage;

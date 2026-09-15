import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client/react';
import { useState } from 'react';
import { GET_CHARACTER_DETAIL } from '../services/CharacterData';

function CharacterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [locationName, setLocationName] = useState('');
  const [message, setMessage] = useState('');

  const { loading, error, data } = useQuery(GET_CHARACTER_DETAIL, {
    variables: { id }
  });

  const handleAssign = () => {
    if (locationName === '') {
      alert('Add Location to save');
      return;
    }

    const savedData = localStorage.getItem('locations');
    const savedLocations = JSON.parse(savedData) || {};

    if (!savedLocations[locationName]) {
      savedLocations[locationName] = [];
    }

    const assigned = savedLocations[locationName].some(item => item.id === data.character.id);

    if (assigned) {
      setMessage('Character is already assigned in other location.');
    } else {
      savedLocations[locationName].push({
        id: data.character.id,
        name: data.character.name
      });
      localStorage.setItem('locations', JSON.stringify(savedLocations));
      setMessage('Success');
      setLocationName('');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const character = data.character;

  const savedData = JSON.parse(localStorage.getItem('locations')) || {};
  let savedLocation = "";

  Object.keys(savedData).forEach((locationName) => {
    const detected = savedData[locationName].some(c => c.id === character.id);
    if (detected) {
      savedLocation = locationName;
    }
  });

  return (
    <div style={{ padding: '20px' }}>
      
      <div style={{ marginTop: '20px' }}>
        <img src={character.image} alt={character.name} width="200" />
        <h1>{character.name}</h1>
        <p>Status: {character.status}</p>
        <p>Species: {character.species}</p>
        <p>
          Location: {savedLocation !== "" ? (
            <span style={{ color: 'green', fontWeight: 'bold' }}>{savedLocation} (assigned)</span>
          ) : (
            character.location.name
          )}
        </p>
      </div>

      <hr />

      <div>
        <h3>Assign new location</h3>
        <input 
          type="text" 
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
        />
        <button onClick={handleAssign}>Save</button>
        <p>{message}</p>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
}

export default CharacterDetail;
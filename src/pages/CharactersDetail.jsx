import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client/react';
import { useState } from 'react';
import { GET_CHARACTER_DETAIL } from '../services/CharacterData';

function CharacterDetail() {
  const { id } = useParams();
  const [locationName, setLocationName] = useState('');
  const [message, setMessage] = useState('');

  const { loading, error, data } = useQuery(GET_CHARACTER_DETAIL, {
    variables: { id }
  });

  const handleRemoveAssign = () => {
    const savedData = JSON.parse(localStorage.getItem('locations')) || {};
    const charId = data.character.id;

    for (const loc in savedData) {
      const found = savedData[loc].some(c => c.id === charId);
      if (found) {
        savedData[loc] = savedData[loc].filter(c => c.id !== charId);
        if (savedData[loc].length === 0) {
          delete savedData[loc];
        }
        localStorage.setItem('locations', JSON.stringify(savedData));
        window.location.reload();
        return;
      }
    }
  };

  const handleAssign = () => {
    if (locationName === '') {
      alert('Add Location to save');
      return;
    }

    const savedData = localStorage.getItem('locations');
    const savedLocations = JSON.parse(savedData) || {};

    const charId = data.character.id;

    for (const loc in savedLocations) {
      const found = savedLocations[loc].some(item => item.id === charId);
      if (found) {
        alert(`Karakter ini sudah ada di lokasi "${loc}"!`);
        return;
      }
    }

    if (!savedLocations[locationName]) {
      savedLocations[locationName] = [];
    }

    savedLocations[locationName].push({
      id: charId,
      name: data.character.name
    });

    localStorage.setItem('locations', JSON.stringify(savedLocations));
    setMessage('Success');
    setLocationName('');
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

      <div style={{ border: '1px solid #dee2e6', borderRadius: '8px', padding: '20px', margin: '0 auto', marginBottom: '20px', backgroundColor: '#f8f9fa', maxWidth: '400px' }}>
        <h3 style={{ margin: '0 0 15px', fontSize: '14px', color: '#555' }}>Assign new location</h3>

        <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '13px', color: '#333' }}>Location Name:</label>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
          <input 
            type="text" 
            value={locationName} 
            onChange={(e) => setLocationName(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ced4da', fontSize: '14px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          {savedLocation !== "" && (
            <button 
              onClick={handleRemoveAssign} 
              style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', fontSize: '14px', cursor: 'pointer' }}
            >
              Delete Location
            </button>
          )}
          <button onClick={handleAssign} style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', fontSize: '14px', cursor: 'pointer' }}>Save</button>
        </div>

        <p style={{ margin: '10px 0', fontSize: '13px', color: message.includes('Berhasil') ? '#28a745' : '#dc3545', fontWeight: '500' }}>
          {message}
        </p>
      </div>
    </div>
  );
}

export default CharacterDetail;
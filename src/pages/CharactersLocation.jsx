import { useState } from 'react';
import { Link } from 'react-router-dom';

function CharactersLocation() {
  const [locations] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('locations')) || {};
    } catch {
      return {};
    }
  });

  const locationNames = Object.keys(locations);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Characters Location</h1>

      {locationNames.length === 0 ? (
        <p>No locations found. <Link to="/">Search for characters here.</Link></p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
              <th style={{ padding: '12px', border: '1px solid #ddd', width: '200px' }}>Location</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Character List</th>
            </tr>
          </thead>
          <tbody>
            {locationNames.map((name) => (
              <tr key={name}>
                <td style={{ padding: '12px', border: '1px solid #ddd', verticalAlign: 'top', fontWeight: 'bold' }}>
                  {name}
                </td>
                
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {locations[name].map((char, index) => (
                      <span key={char.id}>
                        <Link 
                          to={`/character/${char.id}`} 
                          style={{ color: '#00b0c8', textDecoration: 'none' }}
                        >
                          {char.name}
                        </Link>
                        {index < locations[name].length - 1 && ","}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CharactersLocation;
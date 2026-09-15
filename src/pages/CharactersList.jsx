import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
import { Link } from 'react-router-dom';
import { GET_CHARACTERS } from '../services/CharacterData';

function CharactersList() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 600);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { 
      page: page,
      filter: { 
        name: debouncedSearch,
        status: statusFilter,
        species: speciesFilter,
      }
    },
  });

  if (loading) return <p style={{ padding: '20px' }}>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div style={{ padding: '20px' }}>
      
      <div style={{ 
        marginBottom: '30px', 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '10px',
        flexWrap: 'wrap' 
      }}>
        <input 
          type="text" 
          placeholder="Search Character Name"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          style={{ padding: '10px', width: '250px', borderRadius: '5px', border: '1px solid #ccc' }}
        />

        <select 
          value={statusFilter} 
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        >
          <option value="">All Status</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>

        <select 
          value={speciesFilter} 
          onChange={(e) => {
            setSpeciesFilter(e.target.value);
            setPage(1);
          }}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        >
          <option value="">All Species</option>
          <option value="human">Human</option>
          <option value="alien">Alien</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {data.characters.results.map((item) => (
          <Link to={`/character/${item.id}`} key={item.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '10px', backgroundColor: '#fff', textAlign: 'center' }}>
              <img src={item.image} alt={item.name} loading="lazy" style={{ width: '100%', height: 'auto', aspectRatio: '1/1', backgroundColor: '#f0f0f0', borderRadius: '4px' }} />
              <h3 style={{ fontSize: '16px', margin: '10px 0' }}>{item.name}</h3>
              <p style={{ fontSize: '14px', color: '#666' }}>{item.species} - {item.status}</p>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '15px' }}>
        <button 
          disabled={page === 1} 
          onClick={() => setPage(prev => prev - 1)}
          style={{ padding: '8px 15px', cursor: page === 1 ? 'not-allowed' : 'pointer' }}
        >
          Prev
        </button>

        <span style={{ alignSelf: 'center' }}>Page {page} of {data.characters.info.pages || 1}</span>

        <button 
          disabled={!data.characters.info.next} 
          onClick={() => setPage(prev => prev + 1)}
          style={{ padding: '8px 15px', cursor: !data.characters.info.next ? 'not-allowed' : 'pointer' }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CharactersList;
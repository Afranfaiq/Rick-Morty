import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 30px',
      backgroundColor: '#202329',
      color: 'white',
      marginBottom: '20px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
    }}>
      <Link to="/" style={{ 
        color: '#ff9800', 
        textDecoration: 'none', 
        fontSize: '20px', 
        fontWeight: 'bold' 
      }}>
        Rick and Morty Characters
      </Link>

      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ 
          color: 'white', 
          textDecoration: 'none', 
          fontSize: '16px' 
        }}>
          Characters
        </Link>
        <Link to="/characters-location" style={{ 
          color: 'white', 
          textDecoration: 'none', 
          fontSize: '16px' 
        }}>
          Characters Location
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CharactersList from './pages/CharactersList'; 
import CharactersDetail from './pages/CharactersDetail'; 
import CharactersLocation from './pages/CharactersLocation'; 
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CharactersList />} />
        <Route path="/character/:id" element={<CharactersDetail />} />
        <Route path="/characters-location" element={<CharactersLocation />} />
      </Routes>
    </Router>
  );
}

export default App;
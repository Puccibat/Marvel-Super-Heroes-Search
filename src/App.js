import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeroGrid from './components/heroes/HeroGrid';
import Header from './components/UI/Header';
import './style/App.css';
import SearchBar from './components/UI/SearchBar';

function App() {
  const [heroes, setHeroes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const apiKey =
    'dbe0038f839406bd1e69416a03e2d67a&hash=fb974711d8b7728c370ddfe09b191981';
  const apiURL = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${query}&ts=1&apikey=${apiKey}`;

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const fetchHeroes = async () => {
      const result = await axios(apiURL);

      setHeroes(result.data.data.results);
      setIsLoading(false);
    };
    fetchHeroes();
  }, [apiURL]);

  return (
    <div className='App'>
      <Header />
      <SearchBar handleChange={handleChange} />
      <HeroGrid isLoading={isLoading} heroes={heroes} />
    </div>
  );
}

export default App;

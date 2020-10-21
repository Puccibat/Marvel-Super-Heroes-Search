import React, {useState, useEffect} from 'react';
import axios from 'axios';
import HeroGrid from './components/heroes/HeroGrid'
import Header from './components/UI/Header'
import './style/App.css';

function App() {
  const [heroes, setHeroes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiKey ='dbe0038f839406bd1e69416a03e2d67a&hash=fb974711d8b7728c370ddfe09b191981';

  // ?nameStartsWith=${query}&ts=1&apikey=${apiKey}

  useEffect(() => {
    const fetchHeroes = async () => {
      const result = await axios(`https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=${apiKey}`)
      //const result = await axios(`https://www.breakingbadapi.com/api/characters`)

      console.log(result.data)
      setHeroes(result.data.data.results)
      setIsLoading(false)  
    }
    fetchHeroes()
  },[])

  return (
    <div className='App'>
      <Header />
      <HeroGrid isLoading={isLoading} heroes={heroes} />
    </div>
  );
}

export default App;

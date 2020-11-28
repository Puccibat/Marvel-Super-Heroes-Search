import React from 'react';
import HeroItem from './HeroItem';
import Avengers from '../../style/avangers.jpg';
//import Deadpool from '../../style/deadpool-comics.jpg';

const HeroGrid = ({ heroes, isLoading }) => {
  return isLoading ? (
    <div className=''>
      <img src={Avengers} alt='' className='homePageImg' />
    </div>
  ) : (
    <section className='cards'>
      {heroes.lenght === 0 || !heroes ? (
        <div className=''>Pas de contenu</div>
      ) : (
        heroes.map((hero) => {
          return <HeroItem key={hero.id} hero={hero}></HeroItem>;
        })
      )}
    </section>
  );
};

export default HeroGrid;

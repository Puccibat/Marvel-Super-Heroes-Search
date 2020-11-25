import React from 'react';

const HeroItem = ({ hero }) => {
  console.log(hero);
  return (
    <div className='card'>
      <div className='card-inner'>
        <div className='card-front'>
          <img
            src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
            alt=''
          />
        </div>
        <div className='card-back'>
          <h1>{hero.name}</h1>
          <p>{hero.description}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroItem;

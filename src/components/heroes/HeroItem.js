import React from 'react'

const HeroItem = ({ hero }) => {
  console.log(hero);
  return (
    <div>
      {hero.name}
    </div>
  )
}

export default HeroItem

import React from 'react'
import HeroItem from './HeroItem'

const HeroGrid = ({heroes, isLoading}) => {
  return isLoading ? (
  <h1>Loading...</h1>
  ) : (
    <section className='cards'>
    {heroes.map((hero) => {
        return(
            <HeroItem key={hero.id} hero={hero}></HeroItem>
        )
        })}
</section>
  )
}

export default HeroGrid

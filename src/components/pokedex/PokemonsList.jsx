import React from 'react'
import PokemonCard from './PokemonCard'

const PokemonsList = ({pokemonsInPage}) => {
  return (
    <section className='flex flex-wrap justify-center items-center'>
        {
            pokemonsInPage.map(pokemon => <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url}/>)
        }
    </section>
  )
}

export default PokemonsList
import React from 'react'
import PokemonCard from './PokemonCard'

const PokemonsList = ({pokemons}) => {
  return (
    <section className='flex flex-wrap justify-center items-center'>
        {
            pokemons.map(pokemon => <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url}/>)
        }
    </section>
  )
}

export default PokemonsList
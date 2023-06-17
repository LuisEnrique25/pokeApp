import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const pokeLinearGradients = {
    grass: "bg-gradient-to-t to-emerald-500 from-purple-500",
    fire: "bg-gradient-to-t to-red-500 from-orange-500"
}

const PokemonCard = ({pokemonUrl}) => {
    const [pokemon, setPokemon] = useState(null)

   const formatTypesPokemon = (types = []) => {
       const nameTypes = types.map((type) => type.type.name)
       const phraseTypes = nameTypes.join(" / ")
       return phraseTypes
   }




    useEffect(() => {
        axios.get(pokemonUrl)
            .then(({data}) => setPokemon(data))
            .catch((err)=> console.log(err))
    }, [])
  return (
    <Link to={`/pokedex/${pokemon?.name}`} className='sm:w-[300px] min-w-[290px] m-3 border-8 rounded-md'>
        <section className={` relative h-40 ${pokeLinearGradients[pokemon?.types[0].type.name]}`}>
            <div className='absolute px-12 -bottom-14'>
                <img className='min-w-[165px]' src={pokemon?.sprites.other["official-artwork"].front_default} alt={pokemon?.name}/>
            </div>

        </section>
            <h3 className='capitalize mt-14'>{pokemon?.name}</h3>
            <h5 className='capitalize'>{formatTypesPokemon(pokemon?.types)}</h5>

            <span>type</span>
            <hr />

            <section>
                {/**Generar lista de stats */}
                {
                    pokemon?.stats.slice(0, 4).map(stat =>( 
                    <div key={stat.stat.url} className='capitalize'>
                        <h6>{stat.stat.name}</h6>
                        <span>{stat.base_stat}</span>
                    </div>))
                }
            </section>






        <section>

        </section>
    </Link>
  )
}

export default PokemonCard
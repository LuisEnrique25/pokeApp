import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// normal: "",
const pokeLinearGradients = {
    normal: "bg-gradient-to-t to-gray-400 from-gray-300",
    fighting: "bg-gradient-to-t to-red-900 from-red-500",
    flying: "bg-gradient-to-t to-sky-200 from-cyan-300",
    poison: "bg-gradient-to-t to-purple-700 from-purple-400",
    ground: "bg-gradient-to-t to-amber-950 from-amber-700",
    rock: "bg-gradient-to-t to-gray-700 from-gray-500",
    bug: "bg-gradient-to-t to-green-800 from-emerald-600",
    ghost: "bg-gradient-to-t to-gray-900 from-purple-700",
    steel: "bg-gradient-to-t to-zinc-800 via-gary-500 from-zinc-500",
    fire: "bg-gradient-to-t to-red-500 from-orange-500",
    water: "bg-gradient-to-t to-blue-500 from-blue-300",
    grass: "bg-gradient-to-t to-emerald-600 from-green-400",
    electric: "bg-gradient-to-t to-yellow-600 from-yellow-300",
    psychic: "bg-gradient-to-t to-indigo-700 from-pink-500",
    ice: "bg-gradient-to-t to-cyan-500 from-cyan-300",
    dragon: "bg-gradient-to-t to-red-500 from-rose-900",
    dark: "bg-gradient-to-t to-gray-700 from-gray-900",
    fairy: "bg-gradient-to-t to-pink-600 from-pink-300",
    unknown: "bg-gradient-to-t to-gray-300 from-gray-500",
    shadow: "bg-gradient-to-t to-black from-gray-600"
}

const pokeTextColors = {
    normal: "text-gray-500 dark:text-gray-300",
    fighting: "text-red-900",
    flying: "text-cyan-400",
    poison: "text-purple-500 dark:text-purple-400",
    ground: "text-amber-700 dark:text-amber-500",
    rock: "text-gray-700 dark:text-gray-400",
    bug: "text-lime-700 dark:text-lime-500",
    ghost: "text-gray-900",
    steel: "text-zinc-700 dark:text-zinc-400",
    fire: "text-red-600 dark:text-red-400",
    water: "text-blue-500 dark:text-blue-300",
    grass: "text-emerald-600 dark:text-emerald-500",
    electric: "text-yellow-600 dark:text-yellow-500",
    psychic: "text-indigo-700 dark:text-indigo-400",
    ice: "text-cyan-500",
    dragon: "text-rose-950",
    dark: "text-black",
    fairy: "text-pink-300",
    unknown: "text-gray-300",
    shadow: "text-gray-600"
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
    <Link to={`/pokedex/${pokemon?.name}`} target='_blank' className={ ` sm:w-[300px] min-w-[290px] m-3 p-2 rounded-md ${pokeLinearGradients[pokemon?.types[0].type.name]} `}>
        <section className='bg-white dark:bg-slate-600 dark:text-white  transition-colors duration-300 ease-out'>

            {/** IMAGEN */}
            <section className={ ` relative h-40 ${pokeLinearGradients[pokemon?.types[0].type.name]} `}>
                <div className='absolute px-12 -bottom-14'>
                    <img className='min-w-[165px]' src={pokemon?.sprites.other["official-artwork"].front_default || "/images/notFound.webp"} alt={pokemon?.name}/>
                </div>
            </section >



                {/* NOMBRE Y TIPOS */}
            <section className='flex flex-col justify-center items-center pb-3'>

                <h3 className={`capitalize mt-14 text-lg font-semibold ${pokeTextColors[pokemon?.types[0].type.name]} `}>{pokemon?.name}</h3>
                <h5 className='capitalize font-medium'>{formatTypesPokemon(pokemon?.types)}</h5>

                <span className='text-gray-400 text-sm'>Type</span>
            </section>


            <hr  className='pb-1'/>



            <section className='grid grid-cols-2 p-3 gap-3'>


                {/**Generar lista de stats */}
                {
                    pokemon?.stats.slice(0, 4).map(stat =>( 
                    <div key={stat.stat.url} className='capitalize flex flex-col justify-center items-center'>
                        <h6>{stat.stat.name}</h6>
                        <span>{stat.base_stat}</span>
                    </div>))
                }
            </section>


        
        </section>
    </Link>
  )
}

export default PokemonCard
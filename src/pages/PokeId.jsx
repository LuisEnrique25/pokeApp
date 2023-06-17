import React, { useEffect, useState } from 'react'
import Header from '../components/pokedex/Header'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const pokeLinearGradients = {
  grass: "bg-gradient-to-t to-emerald-500 from-purple-500",
  fire: "bg-gradient-to-t to-red-500 from-orange-500"
}

const PokeId = () => {
  const [pokemon, setPokemon] = useState(null)
  const {pokemonName} = useParams()
  
  console.log(pokemon);
  const percentProgresStat = (baseStat) => {
    const stat = `${(baseStat * 100) / 255}%`
    
    return stat
  }
  
  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`

    axios.get(url)
      .then(({data})=>setPokemon(data))
      .then((err)=> console.log(err))


  }, [])

  return (
    <main>
      <Header/>
      <section className='flex justify-center items-center'>

        <article className='p-3 w-[400px] sm:w-[800px] transition-all duration-100 ease-linear'>
          {/**HEADER */}
          <section className={`relative mt-12 h-16 sm:h-32 ${pokeLinearGradients[pokemon?.types[0].type.name]} transition-all duration-100 ease-linear `}>
              <div className=' px-12 flex justify-center '>
                  <img className='w-[125px] sm:w-[200px] absolute -translate-y-16 sm:-translate-y-20 transition-all duration-100 ease-linear' src={pokemon?.sprites.other["official-artwork"].front_default} alt={pokemon?.name}/>
              </div>

          </section>

          {/**NOMBRE PESO Y ALTURA */}

          <section className='py-2 '>
            <div className='flex justify-center items-center py-2'>
              <h2 className='capitalize w-fit font-semibold text-center p-1 px-3 border-[1px] border-gray-300 sm:text-lg rounded-sm'>#{pokemon?.id}</h2>
            </div>

            <div className='flex justify-center items-center gap-3 px-4'>
              <hr className='border-gray-300 w-full border-[1px]'/>
              <h2 className='capitalize font-semibold sm:text-2xl'>{pokemon?.name}</h2>
              <hr className='border-gray-300 w-full border-[1px]'/>
              
            </div>
            <div></div>

          </section>




           {/**STATS */}
          <section className='p-4'>
            <h4>Stats</h4>
            <section>
              {
                pokemon?.stats.map((stat) => (
                  <article key={stat.stat.url}>
                    <section className='capitalize flex justify-between items-center'>
                      <h5>{stat.stat.name}</h5>
                      <span>{stat.base_stat}/255</span>
                    </section>

                    <section className='bg-gray-400 h-4 sm:h-8 rounded-md overflow-hidden'>
                      <div style={{width: percentProgresStat(stat.base_stat)}} className='h-full bg-yellow-500 '></div>

                    </section>
                  </article>))
              }
            </section>
          </section>


        </article>

      </section>
    </main>
  )
}

export default PokeId
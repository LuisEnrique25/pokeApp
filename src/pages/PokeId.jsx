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
  const [pokeTypes, setPokeTypes] = useState([])
  const [pokeMovements, setPokeMovements] = useState([])
  const [mainMoves, setMainMoves] = useState([])
  
  console.log(mainMoves);
  
  const percentProgresStat = (baseStat) => {
    const stat = `${(baseStat * 100) / 255}%`
    
    return stat
  }

  
 
  
  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`

    axios.get(url)
      .then(({data})=>{
        setPokemon(data)
        setPokeTypes(data.types)
        setPokeMovements(data.moves)
        setMainMoves(data.abilities)
      })
      .then((err)=> console.log(err))


  }, [])

  return (
    <main className='bg-slate-50'>
      <Header/>
      <section className='flex justify-center mt-14 items-center '>

        <article className='p-3 w-[400px] sm:w-[800px] transition-all duration-100 ease-linear  rounded-sm  shadow-xl  relative'>
          {/**HEADER */}
          <section className={`relative  h-16 sm:h-32 ${pokeLinearGradients[pokemon?.types[0].type.name]} transition-all duration-100 ease-linear absolute top-0 `}>
              <div className=' px-12 flex justify-center '>
                  <img className='w-[150px] sm:w-[225px] absolute -translate-y-16 sm:-translate-y-20 transition-all duration-100 ease-linear drop-shadow-md z-50' src={pokemon?.sprites.other["official-artwork"].front_default} alt={pokemon?.name}/>
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

            <section className='flex justify-center gap-8 text-xs text-center py-3'>
              <div className='flex flex-col gap-1'>
                <p>Weight</p>
                <p>{pokemon?.weight}</p>
              </div>
              <div  className='flex flex-col gap-1'>
                <p>Height</p>
                <p>{pokemon?.height}</p>
              </div>
            </section>
          </section>

          {/**TIPO Y HABILIDADES */}

          <section className='flex justify-center items-center gap-4'>
            <div className='capitalize flex justify-center items-center flex-col gap-3'>
              <h3>Type</h3>
              <div className='flex gap-3 flex-col md:flex-row'>
              {
                pokeTypes.map((type) => <div key={type.type.url} className='bg-slate-600 py-1 w-20 sm:w-32 text-center rounded-sm px-3'> <h4 >{type.type.name}</h4></div> )
              }
              </div>
            </div>

            <div className='capitalize flex justify-center items-center flex-col gap-3'>
              <h3>Habilities</h3>
              <div className='flex gap-3 flex-col md:flex-row'>
              {
                mainMoves.map((move) =>  <div key={move.ability.url} className='border-[1px] py-1 sm:w-32 text-center rounded-sm px-3'> <h4 >{move.ability.name}</h4></div> )
              }
              </div> 
            </div>

          </section>



           {/**STATS */}

          <section className='p-4'>
            <div className='flex items-center gap-3 mb-3'>
              <h4 className='text-3xl font-semibold'>Stats</h4>
              <hr className='border-gray-300 w-full border-[1px]'/>
              <img src="/images/pokeball.webp" alt="" className='h-10  animate-spin-slow' />
            </div>
            <section>
              {
                pokemon?.stats.map((stat) => (
                  <article key={stat.stat.url} className=' mb-4'>
                    <section className='capitalize flex justify-between items-center text-lg font-medium'>
                      <h5>{stat.stat.name}</h5>
                      <span>{stat.base_stat}/255</span>
                    </section>
                    <section className='bg-gray-400 h-4 sm:h-8 rounded-md overflow-hidden'>
                      <div style={{width: percentProgresStat(stat.base_stat)}} className='h-full bg-gradient-to-r via-orange-600 from-orange-500 to-red-600 rounded-r-md '></div>
                    </section>
                  </article>))
              }
            </section>
          </section>
        </article>

      </section>

      {/**SECCION DE HABILIDADES */}

      <section className='flex justify-center mt-14 items-center mb-9 '>
         <article className='p-5 w-[400px] sm:w-[800px] transition-all duration-100 ease-linear  rounded-sm  shadow-xl relative '>
          {/**STAT TITLE */}
           <div className='flex items-center gap-3 mb-5 sm:mb-9'>
                <h4 className='text-3xl font-semibold'>Movements</h4>
                <hr className='border-gray-300 w-full border-[1px]'/>  
                <img src="/images/pokeball.webp" alt="" className='h-10  animate-spin-slow' />
            </div>
            {/**LISTA DE HABILIDADES */}
            <section className='flex flex-wrap gap-3 items-center '>
                {
                  pokeMovements.map((move) => <p className='text-sm sm:text-base bg-slate-200 py-2 px-3 rounded-2xl capitalize' key={move.move.url}>{move.move.name}</p>)
                }
            </section>
         </article>
      </section>
    </main>
  )
}

export default PokeId
import React, { useEffect, useState } from 'react'
import Header from '../components/pokedex/Header'
import { useSelector } from 'react-redux'
import axios from 'axios'
import PokemonsList from '../components/pokedex/PokemonsList'

const Pokedex = () => {

    const nameTrainer = useSelector(store => store.nameTrainer)

    
    const [pokemons, setPokemons] = useState([])
    const [namePokemon, setNamePokemon] = useState("")
    const [types, setTypes] = useState([])
    const [currentType, setCurrentType] = useState("")
    
    const pokemonsByName = pokemons.filter((pokemon) => pokemon.name.includes(namePokemon.toLocaleLowerCase().trim()))

    const handleSubmit = (e) => {
        e.preventDefault()
        setNamePokemon(e.target.namePokemon.value)
    }

    const handleChangeType = (e) => {
        setCurrentType(e.target.value)
    }
    

    useEffect(() => {
        if(!currentType){
            const URL = "https://pokeapi.co/api/v2/pokemon?limit=40"
    
            axios.get(URL)
                .then(({data}) => setPokemons(data.results))
                .catch((err) => console.log(err))
        }

    }, [currentType])

    useEffect(() => {
        const URL = "https://pokeapi.co/api/v2/type"
        axios.get(URL)
        .then(({data}) => setTypes(data.results))
        .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        if(currentType){
            const url =`https://pokeapi.co/api/v2/type/${currentType}`
            axios.get(url)
            .then(({data}) => {
                const pokemonByType = data.pokemon.map(pokemon => pokemon.pokemon)
                setPokemons(pokemonByType)
            })
            .catch((err) => console.log(err))
        }


    }, [currentType])


  return (
    <main className='bg-slate-50'>
        <Header/>

        <p className='text-center p-3'><span className='text-red-600 font-semibold'>Welcome {nameTrainer},</span> Here you can find your favorite pokemon!</p>

        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row justify-center items-center sm:justify-around gap-2 p-2 '>
            <div className='flex shadow-md w-fit'>
                <input id='namePokemon' type="text" placeholder='Search a pokemon...' className=' p-2 outline-none w-48 sm:w-auto '/>
                <button className='bg-red-500 p-3 text-white sm:px-5 hover:bg-red-600'>Search! </button>
            </div>

            <select onChange={handleChangeType}  className='h-[42px] w-[273px] shadow-md capitalize' >
                <option value="" >All</option>
                {
                    types.map((type) => <option value={type.name} key={type.url} >{ type.name} </option> )
                }
            </select>


        </form>

        <PokemonsList pokemons={pokemonsByName}/>

    </main>
  )
}

export default Pokedex
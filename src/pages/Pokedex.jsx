import React, { useEffect, useState } from 'react'
import Header from '../components/pokedex/Header'
import { useSelector } from 'react-redux'
import axios from 'axios'
import PokemonsList from '../components/pokedex/PokemonsList'

const Pokedex = () => {

    const nameTrainer = useSelector(store => store.nameTrainer)

    
    const [pokemons, setPokemons] = useState([]);
    const [namePokemon, setNamePokemon] = useState("");
    const [types, setTypes] = useState([]);
    const [currentType, setCurrentType] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pokePerPage, setPokePerPage] = useState(parseInt(localStorage.getItem("pokes_per_page")) || 12)
    
    const pokemonsByName = pokemons.filter((pokemon) => pokemon.name.includes(namePokemon.toLocaleLowerCase().trim()));

  
    console.log(pokePerPage);
    
    const paginationLogic = () => {
        const POKEMONS_PER_PAGE = pokePerPage;
        const initialSlice = (currentPage - 1) * POKEMONS_PER_PAGE

        const finalSlice = initialSlice + POKEMONS_PER_PAGE
        
        const pokemonsInPage = pokemonsByName.slice(initialSlice, finalSlice)

        const lastPage = Math.ceil(pokemonsByName.length / POKEMONS_PER_PAGE) || 1 

        //BLOQUE ACTUAL

        const PAGES_PER_BLOCK = 5
        const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK)

        //PAGINAS A MOSTAR EN EL BLOQUE ACTUAL
        const pagesInBlock = []
        const minPage = (actualBlock - 1) * PAGES_PER_BLOCK + 1
        const maxPage = actualBlock * PAGES_PER_BLOCK

        for (let i = minPage; i <= maxPage; i++) {
            if(i <= lastPage){
                pagesInBlock.push(i)
            }
            
        }

        return{
            pokemonsInPage, lastPage, pagesInBlock
        }
    }

    const {lastPage, pagesInBlock, pokemonsInPage } = paginationLogic()
    
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setNamePokemon(e.target.namePokemon.value)
    }

    const handlePokesPerPage = (e) => {
        setPokePerPage(parseInt(e.target.value))
        localStorage.setItem("pokes_per_page", e.target.value )
        setCurrentPage(1)
    }



    const handleChangeType = (e) => {
        setCurrentType(e.target.value)
    }

    const handlePreviusPage = () =>{
        if (currentPage !== 1) {
            setCurrentPage(currentPage -1)
        }
    }

    const handleNextPage = () =>{
        if (currentPage !== lastPage) {
            setCurrentPage(currentPage + 1)
        }
    }
    const handleInitialPage = () =>{
        if (currentPage !== 1) {
            setCurrentPage(1)
        }
    }

    const hanldeLastPage = () =>{
        if (currentPage !== lastPage) {
            setCurrentPage(lastPage)
        }
    }
    
    

    useEffect(() => {
        if(!currentType){
            const URL = "https://pokeapi.co/api/v2/pokemon?limit=1281"
    
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

    useEffect(() => {
        setCurrentPage(1)
    }, [currentType, namePokemon])


  return (
    <main className='bg-slate-50   dark:bg-slate-800 min-h-screen'>
        <Header/>

        <p className='text-center p-3 dark:text-white'><span className='text-red-600 font-semibold'>Welcome {nameTrainer},</span> Here you can find your favorite pokemon!</p>

        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row justify-center items-center sm:justify-around gap-2 p-2 flex-wrap'>
            <div className='flex shadow-md w-fit'>
                <input id='namePokemon' type="text" placeholder='Search a pokemon...' className=' p-2 outline-none w-48 sm:w-auto dark:bg-slate-700 dark:text-white'/>
                <button className='bg-red-500 p-3 text-white sm:px-5 hover:bg-red-600'>Search! </button>
            </div>

            <select onChange={handleChangeType}  className='h-[42px] w-[273px] sm:w-[260px] shadow-md capitalize dark:bg-slate-700 dark:text-white outline-none' >
                <option value="" >All</option>
                {
                    types.map((type) => <option value={type.name} key={type.url} >{ type.name} </option> )
                }
            </select>


            {/* POKEMONS POR PAGINA */}
            <div className='flex gap-2 justify-center items-center'>
                <label className='dark:text-white'>Pokemons Dysplayed:</label>
                <select  onChange={handlePokesPerPage} defaultValue={localStorage.getItem("pokes_per_page") || pokePerPage } className='h-[42px] w-[100px] shadow-md capitalize dark:bg-slate-700 dark:text-white outline-none'>
                <option value={4}>4</option>
                <option value={8}>8</option>
                <option value={12}>12</option>
                <option value={16}>16</option>
                <option value={20}>20</option>
            </select>
            </div>
            
        </form>
        


                {/**PAGINATION */}
        <ul className='flex gap-2 justify-center py-3 px-2 flex-wrap'>
            <li onClick={handleInitialPage} className='px-3 py-2 bg-red-500 font-bold text-white cursor-pointer'>{"<<"}</li>
            <li onClick={handlePreviusPage} className='px-3 py-2 bg-red-500 font-bold text-white cursor-pointer'>{"<"}</li>
            {
            pagesInBlock.map(numberPage => <li onClick={() => setCurrentPage(numberPage)} key={numberPage} className={`px-3 py-2 bg-red-500 font-bold text-white cursor-pointer ${currentPage === numberPage && "bg-red-700" }`}>{numberPage}</li>)
            }
            <li onClick={handleNextPage} className='px-3 py-2 bg-red-500 font-bold text-white cursor-pointer'>{">"}</li>
            <li onClick={hanldeLastPage} className='px-3 py-2 bg-red-500 font-bold text-white cursor-pointer'>{">>"}</li>
        </ul>

        <PokemonsList pokemonsInPage={pokemonsInPage}/>

    </main>
  )
}

export default Pokedex
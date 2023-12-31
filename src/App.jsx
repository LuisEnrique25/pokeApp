import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Pokedex from './pages/Pokedex'
import PokeId from './pages/PokeId'
import ProtectedRoutes from './components/auth/ProtectedRoutes'
import DarkMode from './components/DarkMode'

function App() {


  return (
    <section className='font-["Inter"] min-h-screen  '>
      <Routes>
        <Route path='/' element= {<Home/>}/>

        <Route element={<ProtectedRoutes/>}>

          <Route path='/pokedex' element= {<Pokedex/>}/>

          <Route path='/pokedex/:pokemonName' element= {<PokeId/>}/>

        </Route>
      </Routes>
      <DarkMode/>
    </section>
  )
}

export default App

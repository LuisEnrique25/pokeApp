import { useDispatch } from 'react-redux'
import FooterHome from '../components/home/FooterHome'
import { setNameTrainer } from '../store/slices/nameTrainer.slice'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) =>{
        e.preventDefault()
        const nameTrainer = e.target.nameTrainer.value
        dispatch(setNameTrainer(nameTrainer))
        navigate("/pokedex")
    }



  return (
    <main className='grid grid-rows-[1fr_auto] min-h-screen bg-slate-50 dark:bg-slate-800 dark:text-white'>
        <section className=' flex flex-col justify-center items-center p-4 gap-4'>
            <div>
                <img src="/images/logo.png" alt="" />
            </div>
            <div>

            <h3 className='text-red-600 font-bold text-2xl sm:text-3xl'>¡Hello Trainer!</h3>
            <p>Sign in with your name!</p>
            </div>

            <form onSubmit={handleSubmit} className='flex rounded-sm overflow-hidden shadow-md'>
                
                <input required id='nameTrainer' type="text" placeholder='Type your name...' className=' p-2 outline-none w-52 sm:w-auto dark:bg-slate-700 '/>
                <button className='bg-red-500 p-3 text-white sm:px-5 hover:bg-red-600'>Start!</button>
                
            </form>

        </section>


        <FooterHome/>
    </main>
  )
}

export default Home


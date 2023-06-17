import React from 'react'
import { setNameTrainer } from '../../store/slices/nameTrainer.slice'
import { useDispatch } from 'react-redux'

const Header = () => {

  const dispatch = useDispatch()
  
  const handleClickLogOut = () => {
    dispatch(setNameTrainer(""))
  }

  return (
    <section className='relative mb-5'>
    {/*PARTE ROJA */}
    <div className='bg-red-600 h-20 relative'>
        <div className='absolute left-0 bottom-0 w-[200px] sm:w-[350px]'>
            <img src="/images/logo.png" alt="" />

        </div>
    </div>
    {/*PARTE NEGRO */}
    <div className='bg-black h-12'></div>
    {/*BOLA*/}
    <div className='h-14 aspect-square bg-white border-[10px] border-black rounded-full absolute -bottom-4 right-0 -translate-x-1/2 after:content-[""] after:h-7 after:aspect-square after:bg-gray-700 after:rounded-full after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1/2 after:-translate-x-1/2 after:border-[9px] after:border-black'>
      <button onClick={handleClickLogOut} className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white z-20'>X</button>
       
    </div>
</section>
  )
}

export default Header
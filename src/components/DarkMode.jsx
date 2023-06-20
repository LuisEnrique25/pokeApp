import { useEffect } from "react"
import { useState } from "react"


const DarkMode = () => {

    const [isDark, setIsDark] = useState(localStorage.getItem("theme"))

    const handleIsDark = () => {
        if(isDark === "dark"){
          setIsDark("light")
          localStorage.setItem("theme", "light")
        }else{
          setIsDark("dark")
          localStorage.setItem("theme", "dark")
        }

    }
    const handleResetLS = () => {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setIsDark('dark')
      } else {
        setIsDark('light')
      }
      localStorage.removeItem("theme");
    }

    useEffect(() => {
      if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }, [isDark])


  return (
    <div className="fixed flex flex-col right-0 top-24 opacity-30 hover:opacity-100  text-2xl">
        <button onClick={handleIsDark} className="bg-slate-400/30 hover:bg-white/50 backdrop-blur dark:bg-slate-950/30 dark:hover:dark:bg-slate-950/50 p-1 sm:p-2 rounded-md flex justify-center items-center">{(isDark === "light") ? <i className="fa-solid fa-sun text-yellow-500"></i> :<i className="fa-solid fa-moon text-blue-800"></i> }</button>
          <button onClick={handleResetLS} className="bg-slate-400/30 hover:bg-white/50 backdrop-blur dark:bg-slate-950/30 dark:hover:dark:bg-slate-950/50 p-1 sm:p-3 rounded-md flex justify-center items-center "><i className="fa-solid fa-desktop text-gray-900 dark:text-gray-500"></i></button>
    </div>
  )
}

export default DarkMode
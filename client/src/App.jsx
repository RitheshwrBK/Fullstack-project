import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'


const Navbar = () => {
  return (<nav className="flex items-center justify-between px-8 py-5 border-b border-gray-200 bg-[#f76840]">
    <h2 className="Bitcount text-6xl">Subscription Tracker</h2>
  </nav>
)}
const App = () => {
  return (
    <div>
      <Navbar />
    </div>
  )
}

fetch("http://localhost:5500/api/health")
  .then((res) => res.json())
  .then((data) => console.log(data));

export default App


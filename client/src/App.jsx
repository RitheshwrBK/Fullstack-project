import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BASE_URL } from '../config/env.js'


const LoginCard = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
    });

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch("http://localhost:5500/api/v1/auth/sign-in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    return (
      <div className='login-card' className="w-full max-w-md p-8 bg-white border border-gray-200 rounded-2xl shadow-xl  place-items-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className='flex items-center gap-20'>
        <label htmlFor='email'>Email</label><input 
          type= 'email'
          name = 'email'
          placeholder='Enter email address'
          value = {formData.email}
          onChange= {handleChange}
          required
          /> <br></br>
        </div>
        <div className='flex items-center gap-12.5'>
          Password<input 
            type= 'password'
            name = 'password'
            placeholder='Enter password'
            value = {formData.password}
            onChange= {handleChange}
            required
          /><br></br>
          </div>
          <div className='flex justify-center'>
          <button type='submit' className='w-fit'>Sign In</button>
          </div>
        </form>
      </div>
    )
};

const Navbar = () => {
  return (<nav className="flex items-center rounded-xl justify-between px-8 py-5 p-16 border-b border-gray-200 bg-[#f76840] mt-3 mb-3 my-3 mx-3">
    <h2 className="Bitcount text-6xl">Subscription Tracker</h2>
  </nav>
)}
const App = () => {
  return (
    <div>
      <Navbar />
       <div className="flex flex-1 items-center justify-center">
      <LoginCard />
      </div>
    </div>
  )
}

fetch(`${BASE_URL}/api/health`)
  .then((res) => res.json())
  .then((data) => console.log(data));

export default App


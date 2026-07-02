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
    const [showPopup, setShowPopup] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`${BASE_URL}/api/v1/auth/sign-in`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          if (response.status === 401) {
            setShowPopup(true);
            return;
          }
        throw new Error('Something else went wrong')
        }
        
        const data = await response.json();
        console.log(data);

        
      } catch (error) {
        console.error("Error:", error);
      }
    };

    return (
      <div className='login-card' className=" relative w-full max-w-md p-8 bg-white border border-gray-200 rounded-2xl shadow-xl  place-items-center">
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
         <div className='flex items-center gap-13'>
        <label htmlFor='name'>Name</label><input 
          name = 'name'
          placeholder='Enter username'
          value = {formData.name}
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
        {showPopup && (
        <>
          {/* Backdrop layer: dims and blurs out the form inputs beneath it */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-xl z-10" />

          {/* Standalone Alert Box */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 p-5 bg-white border-2 border-red-500 rounded-lg shadow-xl text-center z-20">
            <h4 className="text-lg font-bold text-red-600 mb-1">Login Failed</h4>
            <p className="text-sm text-gray-600 mb-4">The password you entered is incorrect.</p>
            <button 
              onClick={() => setShowPopup(false)} 
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-bold rounded transition duration-150"
            >
              Try Again
            </button>
          </div>
        </>
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
  .then((res) => res.json(),)
  .then((data) => console.log(data));

export default App


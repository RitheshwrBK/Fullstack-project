import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BASE_URL } from '../config/env.js'
import { Routes, Route } from "react-router-dom";

import gameBoy from './assets/image copy.png'
import star from './assets/star_pixel.png'
import bubble from './assets/bubble.png'


const LoginCard = () => {
    const [formData, setFormData] = useState({
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
          credentials: "include", // Include cookies in the request
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

        if (data.success){
          // Redirect to dashboard
          window.location.href = "/dashboard";
        }

        
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const containerStyle = {
    backgroundImage: `url(${gameBoy})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Semi-transparent white
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: '400px',
  };

    return (
      <div className='login-card' className="relative
    w-[800px]
    h-[960px]
    bg-contain
    bg-no-repeat
    bg-center"
      style={{ backgroundImage: `url(${gameBoy})`,
    backgroundPosition: "-60px -50px" }}
      >
        <form onSubmit={handleSubmit} className="absolute
      left-[23%]
      top-[18%]
      w-[54%]
      h-[33%]
      flex
      flex-col
      justify-center
      gap-3
      px-2">
        <div className='flex items-center gap-20'>
        <label htmlFor='email' className= 'block mb-1'>Email</label><input className='w-full'
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
      
    )
}
</div>
)};

const Navbar = () => {
  return (<nav className="flex items-center rounded-xl justify-between px-8 py-5 p-16 border-b border-gray-200 bg-[#f76840] mt-3 mb-3 my-3 mx-3">
    <h2 className="Bitcount text-6xl">Subscription Tracker</h2>
  </nav>
)}
const LoginPage = () => {
  return (
    <>
     <div className="relative  min-h-screen  bg-[#F3EDE3] bg-[radial-gradient(#e3d8c6_3px,transparent_3px)]">
      <img
  src={star}
  className="star top-150 left-16 w-70 z-50 "
  style={{
    width: "300px"}}
/>

<img
  src={star}
  className="star top-48 right-20"
  style={{ animationDelay: "0.8s",
  width: "300px"}}
/>

<img
  src={star}
  className="star bottom-24 right-32"
  style={{ animationDelay: "1.6s" ,
  width: "300px"
  }}
/>

<img
  src={bubble}
  className="star top-12 left-16 w-70 z-50 "
  style={{
    width: "300px"}}
/>

<img
  src={bubble}
  className="star top-25 right-90"
  style={{ animationDelay: "0.8s",
  width: "300px"}}
/>

<img
  src={bubble}
  className="star bottom-60 right-60"
  style={{ animationDelay: "1.6s" ,
  width: "300px"
  }}
  />
    <Navbar />
    <div className="flex-1 flex items-center justify-center">
    <LoginCard />
    </div>
    </div>
    </>
  )
}
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<div>Dashboard</div>} />
    </Routes>
  )
}

fetch(`${BASE_URL}/api/health`)
  .then((res) => res.json(),)
  .then((data) => console.log(data));

export default App


import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'


const loginCard = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
    });

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
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
    </div>
  )
}

fetch("http://localhost:5500/api/health")
  .then((res) => res.json())
  .then((data) => console.log(data));

export default App


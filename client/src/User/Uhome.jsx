import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Weather from './Weather';

const Uhome = () => {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:7000/cropsdata')
      .then(res => setCrops(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
<Navbar/>
<Weather/>
    <div className="container mx-auto p-4 bg-green-200">
      <h1 className="text-3xl font-bold mb-4 text-center">Agriculter Info</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {crops.map(crop => (
          <Link to={`/crop/${crop.name}`} key={crop._id}>
            <div className="bg-green-50 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <img src={crop.imgUrl} alt={crop.name} className="w-full h-60 object-cover rounded-t-lg"/>
              <div className="mt-2">
                <h2 className="text-2xl font-semibold text-center">{crop.name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
      </div>
       {/* Footer */}
       <footer className="bg-green-600 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 AgriTech. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Uhome;

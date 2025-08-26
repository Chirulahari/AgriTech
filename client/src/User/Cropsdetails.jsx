import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CropList = () => {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:7000/cropsdata')
      .then(res => setCrops(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Crop Data</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {crops.map(crop => (
          <div key={crop._id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <img src={crop.imgUrl} alt={crop.name} className="w-full h-48 object-cover rounded-t-lg"/>
            <div className="mt-4">
              <h2 className="text-2xl font-semibold">{crop.name}</h2>
              <p className="text-gray-600 italic">{crop.scientificName}</p>
              <div className="mt-2">
                <p><span className="font-semibold">Season:</span> {crop.season}</p>
                <p><span className="font-semibold">Temperature Range:</span> {crop.temperatureRange}</p>
                <p><span className="font-semibold">Rainfall Range:</span> {crop.rainfallRange}</p>
                <p><span className="font-semibold">Soil Type:</span> {crop.soilType}</p>
                <p><span className="font-semibold">Sowing Time:</span> {crop.sowingTime}</p>
                <p><span className="font-semibold">Harvest Time:</span> {crop.harvestTime}</p>
                <p><span className="font-semibold">Duration:</span> {crop.duration}</p>
                <p><span className="font-semibold">Pesticides:</span> {crop.pesticides.join(', ')}</p>
                <p><span className="font-semibold">Fertilizers:</span> {crop.fertilizers.join(', ')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CropList;

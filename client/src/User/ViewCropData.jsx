import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const ViewCropData = () => {
  const { name } = useParams();
  const [crop, setCrop] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:7000/cropsdata/${name}`)
      .then(res => setCrop(res.data))
      .catch(err => console.error(err));
  }, [name]);

  if (!crop) return <div>Loading...</div>;

  return (
    <div>
        <Navbar/>
        <div>

        </div>
    <div className="container mx-auto p-4 bg-green-200 h-fit">
    <div className='flex justify-center'>
    <img src={crop.imgUrl} alt={crop.name} className="w-min h-80 object-cover rounded-t-lg"/>
    </div>
    <h1 className="text-3xl font-bold mb-4 text-center">{crop.name}</h1>
      <div className="mt-2 flex justify-center">
  <table className=" bg-white border border-gray-200" style={{width:"800px"}}>
    <tbody>
    <tr className="border-b">
        <td className="px-6 py-4 font-semibold">Crop Name:</td>
        <td className="px-6 py-4">{crop.name}</td>
      </tr>
      <tr className="border-b">
        <td className="px-6 py-4 font-semibold">Scientific Name:</td>
        <td className="px-6 py-4">{crop.scientificName}</td>
      </tr>
      <tr className="border-b">
        <td className="px-6 py-4 font-semibold">Season:</td>
        <td className="px-6 py-4">{crop.season}</td>
      </tr>
      <tr className="border-b">
        <td className="px-6 py-4 font-semibold">Temperature Range:</td>
        <td className="px-6 py-4">{crop.temperatureRange}</td>
      </tr>
      <tr className="border-b">
        <td className="px-6 py-4 font-semibold">Rainfall Range:</td>
        <td className="px-6 py-4">{crop.rainfallRange}</td>
      </tr>
      <tr className="border-b">
        <td className="px-6 py-4 font-semibold">Soil Type:</td>
        <td className="px-6 py-4">{crop.soilType}</td>
      </tr>
      <tr className="border-b">
        <td className="px-6 py-4 font-semibold">Sowing Time:</td>
        <td className="px-6 py-4">{crop.sowingTime}</td>
      </tr>
      <tr className="border-b">
        <td className="px-6 py-4 font-semibold">Harvest Time:</td>
        <td className="px-6 py-4">{crop.harvestTime}</td>
      </tr>
      <tr className="border-b">
        <td className="px-6 py-4 font-semibold">Duration:</td>
        <td className="px-6 py-4">{crop.duration}</td>
      </tr>
      <tr className="border-b">
        <td className="px-6 py-4 font-semibold">Pesticides:</td>
        <td className="px-6 py-4">{crop.pesticides.join(', ')}</td>
      </tr>
      <tr className="border-b">
        <td className="px-6 py-4 font-semibold">Fertilizers:</td>
        <td className="px-6 py-4">{crop.fertilizers.join(', ')}</td>
      </tr>
    </tbody>
  </table>
</div>

    </div>
    </div>
  );
}

export default ViewCropData;

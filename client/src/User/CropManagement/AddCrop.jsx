import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

const AddCrop = ({ fetchCrops }) => {
  const [cropdata, setCropdata] = useState({
    name: '',
    variety: '',
    quantity: '',
    plantedDate: '',
    estimatedHarvestDate: ''
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate =useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCropdata({
      ...cropdata,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!cropdata.name || !cropdata.variety || !cropdata.quantity || !cropdata.plantedDate || !cropdata.estimatedHarvestDate) {
      setError('All fields are required!');
      setIsLoading(false);
      return;
    }
    
    const userid = JSON.parse(localStorage.getItem('user')).id;
    const username = JSON.parse(localStorage.getItem('user')).name;

    const updatedFormData = {
        ...cropdata,
        userId:userid,
        userName:username
      };

    try {
      await axios.post('http://localhost:7000/addcrop', updatedFormData);
      alert('Data added successfully');
      navigate('/getcrops')
      fetchCrops(); // Fetch the updated list of crops
      // Reset form fields
      setCropdata({
        name: '',
        variety: '',
        quantity: '',
        plantedDate: '',
        estimatedHarvestDate: ''
      });
    } catch (error) {
      setError('There was an error adding the crop!');
      console.error('Error in adding:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar/>
      <form onSubmit={handleSubmit} className="bg-orange-400 shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Crop</h2>
      <div className="mb-4">
        <label className="block text-black-900 text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={cropdata.name}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="variety">
          Variety
        </label>
        <input
          type="text"
          name="variety"
          placeholder="Variety"
          value={cropdata.variety}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-900 text-sm font-bold mb-2"
          htmlFor="quantity">
          Quantity
        </label>
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={cropdata.quantity}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="plantedDate">
          Planted Date
        </label>
        <input
          type="date"
          name="plantedDate"
          placeholder="Planted Date"
          value={cropdata.plantedDate}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="estimatedHarvestDate">
          Estimated Harvest Date
        </label>
        <input
          type="date"
          name="estimatedHarvestDate"
          placeholder="Estimated Harvest Date"
          value={cropdata.estimatedHarvestDate}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
        >
          {isLoading ? 'Adding...' : 'Add Crop'}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
    </form>
    </div>

  );
};

export default AddCrop;

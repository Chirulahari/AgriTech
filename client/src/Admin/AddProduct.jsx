import React, { useState } from 'react';
import axios from 'axios';
import Anavbar from './Anavbar';
import { useNavigate } from 'react-router-dom';

const AddProduct = ({ fetchProducts }) => {
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: ''   // Changed from imgUrl to image
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validation
    if (!productData.name || !productData.category || !productData.price || !productData.description || !productData.image) {
      setError('All fields are required!');
      setIsLoading(false);
      return;
    }

    try {
      await axios.post('http://localhost:7000/products', productData);
      alert('Product added successfully');
      navigate('/getproducts');
      fetchProducts(); // refresh product list after adding
      setProductData({
        name: '',
        category: '',
        price: '',
        description: '',
        image: ''
      });
    } catch (error) {
      setError('There was an error adding the product!');
      console.error('Error in adding:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Anavbar />
      <form onSubmit={handleSubmit} className="bg-orange-400 shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
        
        {/* Product Name */}
        <div className="mb-4">
          <label className="block text-black-900 text-sm font-bold mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={productData.name}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-900 text-sm font-bold mb-2">Category</label>
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={productData.category}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-gray-900 text-sm font-bold mb-2">Price</label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={productData.price}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-900 text-sm font-bold mb-2">Description</label>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={productData.description}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Image URL */}
        <div className="mb-6">
          <label className="block text-gray-900 text-sm font-bold mb-2">Image URL</label>
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={productData.image}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
          >
            {isLoading ? 'Adding...' : 'Add Product'}
          </button>
        </div>

        {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default AddProduct;

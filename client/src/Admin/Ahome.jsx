import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts';
import { Link } from 'react-router-dom';
import Anavbar from './Anavbar';

function Ahome() {
  const [users, setUsers] = useState([]);
  const [Products, setProducts] = useState([]);
  const [farms, setFarms] = useState([]);

  useEffect(() => {
    // Fetch user data
    axios.get('http://localhost:7000/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users: ', error);
      });

    // Fetch Products data
    axios.get('http://localhost:7000/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products: ', error);
      });


   // Fetch Farm data
   axios.get('http://localhost:7000/farms')
   .then((response) => {
     setFarms(response.data);
   })
   .catch((error) => {
     console.error('Error fetching surveys: ', error);
   });
}, []);

  // Calculate the number of users and bookings
  const totalUsers = users.length;
  const totalProducts = Products.length;
  const totalFarms = farms.length;

  // Define data for the bar chart
  const data = [
    { name: 'Users', value: totalUsers },
    { name: 'Products', value: totalProducts },
    { name: 'Farms', value: totalFarms },
  ];

  const colors = ['#8884d8', 'red', 'teal'];

  return (
    <div>
      <Anavbar />
      <br/>
      <h3 className="text-center text-3xl text-purple-700 ">Dashboard</h3>
      <div className="bg-whitesmoke w-11/12 mx-auto mt-5 p-5 h-auto rounded-lg shadow-lg bg-green-200">
        <div className="flex justify-around items-center p-2">
          <Link to="/users" className="no-underline">
            <div className="w-64 h-32 rounded-lg shadow-md flex flex-col justify-center items-center text-xl font-bold text-gray-800 bg-purple-600 text-center">
              USERS <br /><br />{totalUsers}
            </div>
          </Link>
          <Link to="/users" className="no-underline">
            <div className="w-64 h-32 rounded-lg shadow-md flex flex-col justify-center items-center text-xl font-bold text-gray-800 bg-red-500 text-center">
             Farms <br /><br /> {totalFarms}
            </div>
          </Link>
          <Link to="/getproducts" className="no-underline">
            <div className="w-64 h-32 rounded-lg shadow-md flex flex-col justify-center items-center text-xl font-bold text-gray-800 bg-teal-600 text-center">
             Products <br /><br /> {totalProducts}
            </div>
          </Link>
        </div>
        <div className="mt-10 flex justify-center">
          <BarChart width={400} height={300} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" barSize={50}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </div>
      </div>
    </div>
  );
}
export default Ahome;

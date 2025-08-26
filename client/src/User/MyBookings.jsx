import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Mybookings() {
  const [items, setItems] = useState([]);  
  const navigate = useNavigate();
  const pdref = useRef();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      axios.get(`http://localhost:7000/getbookings/${user.id}`)
        .then((response) => {
          const taskData = response.data;
          setItems(taskData);
          console.log(taskData)
        })
        .catch((error) => {
          console.error('Error fetching tasks: ', error);
        });  
    }
  }, []);

  const calculateStatus = (bookingDate) => {
    const currentDate = new Date();
    const formattedBookingDate = new Date(bookingDate);
    const diffTime = Math.abs(currentDate - formattedBookingDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? 'completed' : 'upcoming';
  };

  const calculateStatus1 = (bookingDate) => {
    const currentDate = new Date();
    const formattedBookingDate = new Date(bookingDate);
    const diffTime = Math.abs(currentDate - formattedBookingDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 5 ? 'on the way' : 'delivered';
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ flex: "1" }}>
        <h1 className='text-center text-3xl py-5'>My Bookings</h1>
        {items.length > 0 ? (
          <div>
            {items.map((item) => {
              const status = calculateStatus(item.date);

              return (
                <div
                  key={item._id}
                  style={{
                    width: '90%',
                    marginLeft: '65px',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    paddingTop: '15px',
                    marginBottom: '35px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-around' }} ref={pdref}>
                    {/* <div>
                      <img src={item.imgUrl} alt="Product" style={{ height: '80px' }} />
                    </div> */}
                    <div>
                      <p>BookingId:</p>
                      <p>{item._id.slice(0, 10)}</p>
                    </div>
                    <div>
                      <p>Product Name:</p>
                      <p>{item.productName}</p>
                    </div>
                    <div>
                      <p>BookingDate:</p>
                      <p>{item.OrderdDate}</p>
                    </div>
                    <div>
                      <p>Quantity:</p>
                      <p>{item.quantity}</p>
                    </div>
                    <div>
                      <p>Price:</p>
                      <p>₹{item.totalamount}</p>
                    </div>
                    <div>
                      <p>Status:</p>
                      <p>{calculateStatus1(item.OrderdDate)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "55vh" }}>
            <p className="text-5xl font-extrabold">No bookings Yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Mybookings;

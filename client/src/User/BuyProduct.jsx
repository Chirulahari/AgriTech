import React, { useState, useEffect } from "react";
import axios from "axios";

const BuyProduct = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:7000/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log("Error fetching products", err);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    const { name, description, price, image, category } = formData;
    if (!name || !description || !price || !image || !category) {
      alert("Please fill all fields");
      return;
    }

    axios
      .post("http://localhost:7000/api/products", formData)
      .then((res) => {
        setProducts([...products, res.data]);
        setFormData({
          name: "",
          description: "",
          price: "",
          image: "",
          category: "",
        });
      })
      .catch((err) => {
        console.log("Error adding product", err);
      });
  };

  return (
    <div className="container">
      <h2>Buy Products</h2>

      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />
        <button type="submit">Add Product</button>
      </form>

      <div className="product-list">
        {products.map((item, index) => (
          <div key={index} className="product-card">
            <img
              src={item.image} // ✅ Fixed here
              alt={item.name}
              style={{ width: "150px", height: "150px" }}
            />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: ₹{item.price}</p>
            <p>Category: {item.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyProduct;

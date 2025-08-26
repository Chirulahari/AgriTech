// ================== Imports ==================
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');
require('./db/config');

const Product = require('./db/Admin/Product');
const Crop = require('./db/User/CropSchema');
const User = require('./db/User/UserSchema');
const UserBooking = require('./db/User/MyBookings');
const Farm = require('./db/User/FarmSchema');
const Admin = require('./db/Admin/AdminSchema');

const app = express();

// ================== Middleware ==================
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["POST", "GET", "DELETE", "PUT"],
  credentials: true
}));

// Centralized async handler
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// ================== ADMIN ROUTES ==================

// Admin Login
app.post('/alogin', asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.json("no user");
  if (admin.password !== password) return res.json("incorrect password");
  res.json({ Status: "Success", user: { id: admin.id, name: admin.name, email: admin.email } });
}));

// Admin Signup
app.post('/asignup', asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await Admin.findOne({ email });
  if (exists) return res.json("Already have an account");
  await Admin.create({ name, email, password });
  res.json("Account Created");
}));

// ================== USER ROUTES ==================

// User Login
app.post('/ulogin', asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.json("no user");
  if (user.password !== password) return res.json("login fail");
  res.json({ Status: "Success", user: { id: user.id, name: user.name, email: user.email } });
}));

// User Signup
app.post('/usignup', asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.json("Already have an account");
  await User.create({ name, email, password });
  res.json("Account Created");
}));

// CRUD for Users
app.get('/users', asyncHandler(async (req, res) => res.json(await User.find())));
app.get('/users/:id', asyncHandler(async (req, res) => res.json(await User.findById(req.params.id))));
app.put('/useredit/:id', asyncHandler(async (req, res) => res.json(await User.findByIdAndUpdate(req.params.id, req.body, { new: true }))));
app.delete('/userdelete/:id', asyncHandler(async (req, res) => res.json(await User.deleteOne({ _id: req.params.id }))));

// ================== CROPS DATA (Static JSON) ==================
app.get('/cropsdata', asyncHandler(async (req, res) => {
  const data = await fs.readFile(path.join(__dirname, './db/crops.json'), 'utf8');
  res.json(JSON.parse(data));
}));

app.get('/cropsdata/:name', asyncHandler(async (req, res) => {
  const data = await fs.readFile(path.join(__dirname, './db/crops.json'), 'utf8');
  const crops = JSON.parse(data);
  const crop = crops.find(c => c.name.toLowerCase() === req.params.name.toLowerCase());
  if (!crop) return res.status(404).json({ message: 'Crop not found' });
  res.json(crop);
}));

// ================== PRODUCT ROUTES ==================
app.get('/products', asyncHandler(async (req, res) => res.json(await Product.find())));
app.get('/products/:id', asyncHandler(async (req, res) => res.json(await Product.findById(req.params.id))));
app.post('/products', asyncHandler(async (req, res) => res.status(201).json(await new Product(req.body).save())));
app.put('/products/:id', asyncHandler(async (req, res) => res.json(await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }))));
app.delete('/deleteproduct/:id', asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json({ message: 'Product deleted successfully' });
}));

// ================== BOOKING ROUTES ==================
app.post('/orderproduct', asyncHandler(async (req, res) => {
  await new UserBooking(req.body).save();
  res.status(201).json({ message: 'Booked successfully' });
}));

app.get('/getbookings/:userId', asyncHandler(async (req, res) => {
  res.json(await UserBooking.find({ userId: req.params.userId }).sort('position'));
}));

// ================== FARM ROUTES ==================
app.post('/addfarm', asyncHandler(async (req, res) => res.status(201).json(await new Farm(req.body).save())));
app.get('/getfarm/:id', asyncHandler(async (req, res) => res.json(await Farm.findById(req.params.id))));
app.get('/farms', asyncHandler(async (req, res) => res.json(await Farm.find())));
app.get('/getfarms/:userId', asyncHandler(async (req, res) => res.json(await Farm.find({ userId: req.params.userId }))));
app.put('/editfarm/:id', asyncHandler(async (req, res) => res.json(await Farm.findByIdAndUpdate(req.params.id, req.body, { new: true }))));
app.delete('/deletefarm/:id', asyncHandler(async (req, res) => res.json(await Farm.findByIdAndDelete(req.params.id))));

// ================== USER CROP ROUTES ==================
app.get('/getcrop/:id', asyncHandler(async (req, res) => res.json(await Crop.findById(req.params.id))));
app.get('/getcrops/:userId', asyncHandler(async (req, res) => res.json(await Crop.find({ userId: req.params.userId }))));
app.post('/addcrop', asyncHandler(async (req, res) => res.status(201).json(await new Crop(req.body).save())));
app.put('/editcrop/:id', asyncHandler(async (req, res) => res.json(await Crop.findByIdAndUpdate(req.params.id, req.body, { new: true }))));
app.delete('/deletecrop/:id', asyncHandler(async (req, res) => res.json(await Crop.findByIdAndDelete(req.params.id))));

// ================== ERROR HANDLER ==================
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// ================== START SERVER ==================
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


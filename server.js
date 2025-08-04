// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mydb';

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
});
const User = mongoose.model('User', userSchema);

// Booking Schema
const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  productId: String,
  date: String,
  notes: String,
});
const Booking = mongoose.model('Booking', bookingSchema);

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Missing token' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};


// REGISTER
app.post('/api/register', async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password)
    return res.status(400).json({ message: 'All fields are required' });

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(409).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: newUser._id }, JWT_SECRET);
  const { password: _, ...userWithoutPassword } = newUser.toObject();

  res.json({ token, user: userWithoutPassword });
});

// LOGIN
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

  const token = jwt.sign({ id: user._id }, JWT_SECRET);
  const { password: _, ...userWithoutPassword } = user.toObject();

  res.json({ token, user: userWithoutPassword });
});

// PROFILE
app.get('/api/profile', authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

app.post('/api/bookings', authenticateToken, async (req, res) => {
  const { productId, date, notes } = req.body;
  console.log("Booking request received:", { productId, date, notes });
console.log("User from token:", req.user);

  if (!productId || !date) {
    console.log("Missing fields:", { productId, date });
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newBooking = await Booking.create({
      userId: req.user.id,
      productId,
      date,
      notes,
    });

    res.status(201).json({
      message: 'Booking successful',
      booking: newBooking,
    });
  } catch (err) {
    console.error("Booking creation failed:", err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(5000, () => console.log('🚀 Server on http://localhost:5000'));
  })
  .catch(err => console.error('❌ MongoDB error:', err));

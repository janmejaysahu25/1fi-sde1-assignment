require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const customerRoutes = require('./routes/customerRoutes'); 
const checkoutRoutes = require('./routes/checkoutRoutes');

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://1fi-sde1-assignment.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors());

app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/onefi_store';
connectDB(MONGODB_URI);

app.use('/api/products', productRoutes);
app.use('/api/auth', customerRoutes);
app.use('/api', checkoutRoutes);

app.get('/', (req, res) => res.send('1Fi assignment backend running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

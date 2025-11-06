require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const customerRoutes = require('./routes/customerRoutes'); 


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGODB_URI || 'mongodb://localhost:27017/onefi_store');

app.use('/api/products', productRoutes);

const checkoutRoutes = require('./routes/checkoutRoutes');
app.use('/api', checkoutRoutes);
app.use('/api/auth', customerRoutes);


app.get('/', (req, res) => res.send('1Fi assignment backend running'));

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

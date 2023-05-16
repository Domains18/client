const express = require('express');
const app = express();
const dotenv = require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

app.use(express.json());



app.use('/api/users', userRoutes);










app.listen(process.env.PORT, () => console.log('Server Running on port 5000'));

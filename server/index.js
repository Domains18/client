const express = require('express');
const app = express();
const dotenv = require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middleware/errMiddleware');

//inbult middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




//routes
app.use('/api/users', userRoutes);

//custom middleware
app.use(errorHandler)
app.use(notFound)







app.listen(process.env.PORT, () => console.log('Server Running on port 5000'));

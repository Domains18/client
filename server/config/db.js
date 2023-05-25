const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.mongo_db);
        console.log(`Deployment Succesfully Pinged at: ${conn.connection.host}`);
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
        process.exit(1);
    }
}


module.exports = connectDB;

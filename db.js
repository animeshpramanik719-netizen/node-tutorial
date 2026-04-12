const mongoose = require("mongoose");

// Define the mongodb connection URL
// FIXED: Changed the port from 2701 to the standard 27017
//const mongoURL = "mongodb://localhost:27017/hotels"
const atlasURL = 'mongodb+srv://animesh9906:animesh990678@cluster0.oubyoyx.mongodb.net/';
const localURL = 'mongodb://127.0.0.1:27017/hotels';
const connectDB = async () => {
  try {
    await mongoose.connect(atlasURL);
    console.log('Connected to MongsoDB Atlas');
  } catch (err) {
    console.log('Atlas failed, connecting to Local DB...');
    
    try {
      await mongoose.connect(localURL);
      console.log('Connected to Local MongoDB');
    } catch (localErr) {
      console.log('Local DB also failed:', localErr);
      process.exit(1);
    }
  }
};

// Connect to the MongoDB database using Mongoose
// Get the default connection
// Mongoose maintains a default connection object representing the mongoDB connection.
// You can access this default connection using mongoose.connection.
const db = mongoose.connection;


// Export the database connection
module.exports = connectDB;

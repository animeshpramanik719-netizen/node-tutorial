const mongoose = require("mongoose");

// Define the mongodb connection URL
// FIXED: Changed the port from 2701 to the standard 27017
//const mongoURL = "mongodb://localhost:27017/hotels"
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("DB connection failed:", err);
    process.exit(1);
  }
};

// Connect to the MongoDB database using Mongoose
// Get the default connection
// Mongoose maintains a default connection object representing the mongoDB connection.
// You can access this default connection using mongoose.connection.
// const db = mongoose.connection;


// Export the database connection
module.exports = connectDB;

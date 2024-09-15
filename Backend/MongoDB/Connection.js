import mongoose from "mongoose"; // Import the mongoose package

const connectToDatabase = async () => { // Function to connect to the MongoDB database
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
      console.log("Connected to MongoDB");
      return mongoose; // Returns the database if the connection is successful
  } catch (err) {
      console.error("Error connecting to MongoDB:", err.message);
      return false; // Returns false if the connection is unsuccessful
  }
};

export default connectToDatabase;

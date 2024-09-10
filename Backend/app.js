import express from "express";
import dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config();

import connectToDB from "./MongoDB/Connection.js";
import { Add_Listing, Add_Seed_Data, Show_Listings, Delete_Listing, Delete_All_Listings, Show_Listing } from "./MongoDB/Listing_transactions.js";

const db = await connectToDB(); // Connect to the MongoDB database

// Initialize Express app
const app = express();

// Middleware to parse JSON data in requests
app.use(express.json());

// Simple route handler for the home page
app.get("/", (req, res) => {
	res.send("Welcome to your Express app!");
});

app.get("/listings", async (req, res) => {
    const listings = await Show_Listings();
    res.json(listings);
}); // Show all listings

// Define a port to listen to, from the environment variable or a default one
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

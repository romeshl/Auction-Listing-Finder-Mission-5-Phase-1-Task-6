import express from "express";
import dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config();

import connectToDB from "./MongoDB/Connection.js"; // Import the mongoDB connection
import { Search_Listings} from "./MongoDB/Listing_transactions.js"; // Import the Search_Listings function

const db = await connectToDB(); // Connect to the MongoDB database

// Initialize Express app
const app = express();

// Middleware to parse JSON data in requests
app.use(express.json());

// Home page of the app
app.get("/", (req, res) => {
	res.send("Welcome to your Express app!");
});

// Route to search for listings
app.get("/listings/:searchText", async (req, res) => {
	try {
		const searchText = req.params.searchText; // Get the search text from the request
		const listings = await Search_Listings(searchText); // Search for listings
		res.status(200).json(listings); // Return the listings from the search
	} catch (error) {
		res.status(500).json({ error: error.message }); // Return an error message
		console.error(error.message);
	}
});

// Define a port to listen to, from the environment variable or a default one
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});


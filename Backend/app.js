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

app.get("/listings/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const listing = await Show_Listing(id);
		const array = [listing];
		res.status(200).json(array);
	} catch (error) {
		res.status(500).json({ error: error.message });
		console.error(error.message);
	}
});

app.post("/api/test", async (req, res) => {
    const data = req.body;
    console.log(data);
    const test = {...data, name: "Roma", age: data.age + 30}
    //const listing = await Add_Listing(data);
    res.json(test);
})  

// Define a port to listen to, from the environment variable or a default one
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

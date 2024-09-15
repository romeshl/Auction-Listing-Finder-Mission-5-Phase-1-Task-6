import mongoose  from "mongoose"; // Import the mongoose package
import ListingsSchema from "./ListingsSchema.js"; // Import the Listings schema

const Listings = mongoose.model("Listings", ListingsSchema); // Create a new mongoose model for the listings

// Create a text index on the 'title' and 'description' fields
Listings.collection.createIndex({ title: 'text', description: 'text' }, (err, result) => {
    if (err) {
        console.log(process.env.PORT);
        throw new Error(err.message);
    }
});

export default Listings;
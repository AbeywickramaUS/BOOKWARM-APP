import express from 'express';
import cloudinary from "../lib/cloudinary.js"; // Assuming you have a cloudinary setup file
import Book from "../models/book.js"; // Assuming you have a Book model defined
import protectRoute from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/", protectRoute, async (req, res) => {
    try {
        const { title, caption, image, rating, user } = req.body;
        if (!title || !caption || !image || !rating || !user) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        //upload image to cloudinary or any other service here
        const uploadResponse = await cloudinary.uploader.upload(image);
        const imageUrl = uploadResponse.secure_url;

        //save book to db

        const newBook = new Book ({
            title,
            caption,
            image: imageUrl,
            rating,
            user: req.user._id // Use the authenticated user's ID
        });

        await newBook.save();
        return res.status(201).json(newBook);

    } catch (error) {
        console.log("Error creating book:", error);
        return res.status(500).json({ error: error.message });
    }
});

//pagination => infinite loading
router.get("/", protectRoute, async (req, res) => {
    try {
        const books = await Book.find().populate('user', 'username email'); // Populate user details
        return res.send(books);
    
    } catch (error) {
        console.log("Error in getting all books routes:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
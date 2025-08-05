import express from 'express';
import clodinary from "../lib/cloudinary.js"; // Assuming you have a cloudinary setup file
import Book from "../models/book.js"; // Assuming you have a Book model defined

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { title, caption, image, rating, user } = req.body;
        if (!title || !caption || !image || !rating || !user) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        //upload image to cloudinary or any other service here
        const uploadResponse = await clodinary.uploader.upload(image)
        constimageUrl = uploadResponse.secure_url;

        //save book to db

        const newBook = new Book ({
            title,
            caption,
            image: imageUrl,
            rating,
        });

        await newBook.save();
        return res.status(201).json(newBook);

    } catch (error) {
        console.log("Error creating book:", error);
        return res.status(500).json({ error: error.message });
    }
});

export default router;
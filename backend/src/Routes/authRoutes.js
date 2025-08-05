import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

import User from "../models/User.js";

const generateAuthToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "15d"});

}

router.post("/login", async (req, res) => {
    res.send("Login");

});

router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        if (username.length < 3) {
            return res.status(400).json({ message: "Username must be at least 3 characters long" });
        }  
        
        //check if user already exists

        //const existingUser = await User.findOne({ $or: [{ email}, {username } ]});
        //if (existingUser) {return res.status(400).json({ message: "User already exists" });};

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }
        
        // Check if username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }  
        
        const profileImage = "https://api.dicebear.com/6.x/initials/svg?seed=" + username;

        // Create new user
        const newUser = new User({
            email,
            username,
            password,
            profileImage,
        });

        await newUser.save();

        const token = generateAuthToken(newUser._id);

        res.status(201).json({
            token,
            user: {
                id: newUser._id,
                email: newUser.email,
                username: newUser.username,
                profileImage: newUser.profileImage,
            }
        });

    } catch (error) {
        console.log("Error during registration:", error);
        res.status(500).json({ message: "Internal server error" })
    }
});




export default router;
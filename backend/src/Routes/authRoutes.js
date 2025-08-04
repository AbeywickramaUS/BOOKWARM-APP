import express from "express";

const router = express.Router();

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

        const existingEmail = await User.findone({ email });
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

        await User.save();

    } catch (error) {}
});




export default router;
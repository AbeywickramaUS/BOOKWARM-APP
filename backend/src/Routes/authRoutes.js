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
        
    } catch (error) {}
});




export default router;
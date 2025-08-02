import express from "express";

const router = express.Router();

router.post("/login", async (req, res) => {
    res.send("Login");

});
router.post("/register", async (req, res) => {
    res.send("Register");  
});




export default router;
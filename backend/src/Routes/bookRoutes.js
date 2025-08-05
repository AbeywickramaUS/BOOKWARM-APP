import express from 'express';


const router = express.Router();

router.post("/", (req, res) => {
    const newBook = new Book(req.body);
    newBook.save()
        .then((book) => res.status(201).json(book))
        .catch((error) => res.status(400).json({ error: error.message }));
});

export default router;
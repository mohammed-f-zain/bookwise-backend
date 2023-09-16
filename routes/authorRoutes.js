import express from "express";
import {
    createAuthor,
    getAllAuthors,
    getAuthorById,
    updateAuthorById,
    deleteAuthorById
} from "../controllers/authorController.js";
import { adminAuthMiddleware } from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

// Create a new book (protected route)
router.post("/create", adminAuthMiddleware,createAuthor);

// Get a list of all books
router.get("/list", getAllAuthors);

// Get book details by ID
router.get("/:id", getAuthorById);

// Update book details by ID (protected route)
router.patch("/:id",adminAuthMiddleware, updateAuthorById);

// Delete a book by ID (protected route)
router.delete("/:id",adminAuthMiddleware, deleteAuthorById);



export default router;

import Author from '../models/authorModel.js';
import { validationResult } from 'express-validator';



// Create a new author
export const createAuthor = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, age, country, writingType, lifeAndCareer ,image} = req.body;

  try {
    const author = new Author({
      name,
      age,
      country,
      writingType,
      lifeAndCareer,
      image
    });

    const savedAuthor = await author.save();
    res.status(201).json(savedAuthor);
  } catch (error) {
    // Handle duplicate name error (code 11000)
    if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
      return res.status(400).json({ error: 'Author with this name already exists' });
    }

    res.status(500).json({ error: 'Server error' });
  }
};


// Get a list of all authors
export const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get author details by ID
export const getAuthorById = async (req, res) => {
  const authorId = req.params.id;

  try {
    const author = await Author.findById(authorId);
    if (!author) {
      return res.status(404).json({ error: 'Author not found' });
    }

    res.json(author);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update author details by ID
export const updateAuthorById = async (req, res) => {
  const authorId = req.params.id;

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, age, country, writingType, lifeAndCareer } = req.body;

  try {
    const author = await Author.findByIdAndUpdate(
      authorId,
      {
        name,
        age,
        country,
        writingType,
        lifeAndCareer,
      },
      { new: true }
    );

    if (!author) {
      return res.status(404).json({ error: 'Author not found' });
    }

    res.json(author);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete an author by ID
export const deleteAuthorById = async (req, res) => {
  const authorId = req.params.id;

  try {
    const author = await Author.findByIdAndRemove(authorId);

    if (!author) {
      return res.status(404).json({ error: 'Author not found' });
    }

    res.json({ message: 'Author deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

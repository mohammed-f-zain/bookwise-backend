import express from 'express';
import {signInAdmin,signUpAdmin} from '../controllers/adminController.js';


const router = express.Router();

// Sign Up an Admin
router.post('/signup',signUpAdmin);

// Sign In an Admin
router.post('/signin', signInAdmin);



export default router;

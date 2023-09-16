import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image:{
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  writingType: {
    type: String,
    required: true,
  },
  lifeAndCareer: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Author', authorSchema);

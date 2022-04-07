import mongoose, { ObjectId } from "mongoose";
import category from './category'
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  desc: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    lowercase: true,
    unique: true,
    index: true
  },
  category: {
      type: ObjectId,
      ref: category
  }
}, { timestamps: true })



export default mongoose.model('Product', productSchema);

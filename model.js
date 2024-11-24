import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  seller: { type: String, required: true },
  rating: { type: Number },
}, { timestamps: true });

export const Product = mongoose.model('Product', productSchema);

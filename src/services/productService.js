// 📁 services/productService.js
const Product = require('../models/Product');

// 🟢 Get all products
async function getAllProducts() {
  return await Product.find()
    .populate('sensors actuators')
    .sort({ createdAt: -1 });
}

// 🟢 Get product by ID
async function getProductById(id) {
  const product = await Product.findById(id).populate('sensors actuators');
  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }
  return product;
}

// 🟢 Create new product
async function createProduct(data) {
  const product = new Product(data);
  return await product.save();
}

// 🟢 Update product by ID
async function updateProduct(id, updates) {
  // prevent ID update
  delete updates._id;

  const product = await Product.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true
  }).populate('sensors actuators');

  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }

  return product;
}

// 🟢 Delete product by ID
async function deleteProduct(id) {
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }
  return product;
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};

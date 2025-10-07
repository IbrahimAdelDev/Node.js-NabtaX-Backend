// 📁 controllers/productController.js
const productService = require('../services/productService');

// 🟢 Get all products
exports.getAll = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

// 🟢 Get product by ID
exports.getById = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

// 🟢 Create new product
exports.create = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

// 🟢 Update product
exports.update = async (req, res, next) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

// 🟢 Delete product
exports.remove = async (req, res, next) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.status(204).send(); // No content
  } catch (err) {
    next(err);
  }
};

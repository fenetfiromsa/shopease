const dotenv = require("dotenv");
dotenv.config(); 

const Product = require("../models/Product");
const cloudinary = require("cloudinary").v2;

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



// Async handler wrapper
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Upload buffer to Cloudinary helper
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "products" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(fileBuffer);
  });
};

// CREATE PRODUCT
exports.createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, stock, category } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  let imageUrl = "";

  // Upload new file 
  if (req.file) {
    try {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = uploadResult.secure_url;
    } catch (error) {
      console.error("🔥 Cloudinary Upload Error:", error);
      return res.status(500).json({ message: "Image upload failed" });
    }
  }
  
  else if (req.body.image) {
    imageUrl = req.body.image;
  }

  const product = await Product.create({
    name,
    description: description || "No description provided",
    price,
    stock: stock || 0,
    category,
    image: imageUrl,
  });

  res.status(201).json(product);
});

//  GET ALL PRODUCTS 
exports.getProducts = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 1000));
  const skip = (page - 1) * limit;

  const filter = {};

  if (req.query.category) filter.category = req.query.category;

  const minPrice = req.query.minPrice ? Number(req.query.minPrice) : undefined;
  const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : undefined;
  if (!isNaN(minPrice) || !isNaN(maxPrice)) {
    filter.price = {};
    if (!isNaN(minPrice)) filter.price.$gte = minPrice;
    if (!isNaN(maxPrice)) filter.price.$lte = maxPrice;
  }

  const search = req.query.search?.trim();
  if (search) filter.$text = { $search: search };

  let sort = { createdAt: -1 };
  const s = req.query.sort;
  if (s === "price_asc") sort = { price: 1 };
  else if (s === "price_desc") sort = { price: -1 };
  else if (s === "oldest") sort = { createdAt: 1 };
  else if (s === "popular") sort = { sold: -1 };
  else if (s === "rating_desc") sort = { rating: -1 };

  const total = await Product.countDocuments(filter);
  const products = await Product.find(filter).sort(sort).skip(skip).limit(limit);

  res.json({
    total,
    page,
    pages: Math.ceil(total / limit),
    limit,
    products,
  });
});

// GET PRODUCT BY ID
exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

// UPDATE PRODUCT
exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  const { name, description, price, stock, category } = req.body;
  let imageUrl = product.image;

  // Upload new image 
  if (req.file) {
    try {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = uploadResult.secure_url;
    } catch (error) {
      console.error("🔥 Cloudinary Upload Error:", error);
      return res.status(500).json({ message: "Image upload failed" });
    }
  } else if (req.body.image) {
    imageUrl = req.body.image;
  }

  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price ?? product.price;
  product.stock = stock ?? product.stock;
  product.category = category || product.category;
  product.image = imageUrl;

  const updated = await product.save();
  res.json(updated);
});

// DELETE PRODUCT
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  await product.deleteOne();
  res.json({ message: "Product deleted successfully" });
});

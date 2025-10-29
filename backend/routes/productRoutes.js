
const express = require('express');

const multer = require("multer");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');


const { protect, admin } = require('../middleware/auth');



const storage = multer.memoryStorage(); 
const upload = multer({ storage });
router.get('/', getProducts);


router.get('/:id', getProductById);


router.post("/", protect, admin, upload.single("image"), createProduct);
router.put("/:id", protect, admin, upload.single("image"), updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;
   

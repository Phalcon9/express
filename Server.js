const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("client"));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Upload to 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp for unique file name
  },
});

const upload = multer({ storage: storage });

const PORT = 5000;
const products = [];

// POST request to upload product
app.post("/add-product", upload.single("image"), (req, res) => {
  const { name, price } = req.body;
  const imageUrl = `/uploads/${req.file.filename}`;

  const newProduct = { name, price, imageUrl };
  products.push(newProduct);

  res.json({ status: "Product added successfully", product: newProduct });
  console.log(products);
});

// GET request to fetch products
app.get("/products", (req, res) => {
  res.json(products);
});

const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.use("/uploads", express.static("uploads"));


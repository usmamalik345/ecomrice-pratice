const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ProductModel = require("./router/ecommrceSc.js");
const router = express.Router();
var cors = require("cors");

const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");

  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
const port = process.env.PORT || 3000;
mongoose.set("strictQuery", false);

const mongoDB = "mongodb://localhost:27017/ecommercestore";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);

main().catch((err) => console.log(err));

async function main() {
  await mongoose
    .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.error(`Error connecting to database: ${err}`);
    });
}

router.post("/products", async (req, res) => {
  const { name, description, price, image } = req.body;
  await createProduct(name, description, price, image);
  const products = await ProductModel.find();
  res.json(products);
});

router.get('/products', async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters
  const limit = parseInt(req.query.limit) ||3; // Get the limit (number of items per page) from the query parameters

  try {
    // Count the total number of products
    const totalProductsCount = await ProductModel.countDocuments();

    // Calculate the number of pages based on the total products count and the limit
    const totalPages = Math.ceil(totalProductsCount / limit);

    // Calculate the starting index of products for the current page
    const startIndex = (page - 1) * limit;

    // Fetch the paginated products from the database
    const products = await ProductModel.find()
      .skip(startIndex)
      .limit(limit);

    // Create a pagination object to send in the response
    const pagination = {
      totalProductsCount,
      totalPages,
      currentPage: page,
    };

    // Send the paginated products and pagination object as a response
    res.json({ products, pagination });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// app.post("/products/search", async (req, res) => {
//   const { searchTerm } = req.body;
//   const matchingProducts = await ProductModel.find({
//     $or: [
//       { name: { $regex: searchTerm, $options: "i" } },
//       { description: { $regex: searchTerm, $options: "i" } },
//     ],
//   });
//   res.json(matchingProducts);
// });

router.get("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const product = await ProductModel.findById(productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

router.delete("/products/:id", async (req, res) => {
  const id = req.params.id;
  await ProductModel.findByIdAndDelete(id);
  res.send("Product deleted successfully");
});

// router.get("/products",  async (req, res) => {
//   //const _ispublished = req.query.published;
//   const match = {};

//   if (req.query.published) {
//     match.published = req.query.published === "true";
//   }
//   try {
//     await req.user
//       .populate({
//         path: "posts",
//         match,
//       })
//       .execPopulate();
//     res.send(req.user.posts);
//   } catch (error) {
//     res.status(500).send();
//   }
// });

async function createProduct(name, description, price, image) {
  await ProductModel.create({ name, description, price, image });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

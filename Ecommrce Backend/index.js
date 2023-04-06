const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ProductModel = require("./router/ecommrceSc.js");
const router = express.Router();
var cors = require("cors");

const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:60342");

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

// router.get("/products", async (req, res) => {

//   await ProductModel.create({
//     name: "Me Is Ussama",
//     description: "Junior Developer",
//     price: 15000,
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJSsDFB9dhoKSKDa9Xc69KAaJdKsZPGtPX3YS_-ZN&s",
//   });

//   const products = await ProductModel.find();
//   res.json(products);
// });

router.post("/products", async (req, res) => {
  const { name, description, price, image } = req.body;
  await createProduct(name, description, price, image);
  const products = await ProductModel.find();
  res.json(products);
});

router.get("/products", async (req, res) => {
  const products = await ProductModel.find();
  res.json(products);
});

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

async function createProduct(name, description, price, image) {
  await ProductModel.create({ name, description, price, image });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

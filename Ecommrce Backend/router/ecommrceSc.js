const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: "string",
  description: "string",
  price: "number",
  image: "string",
});

module.exports = mongoose.model("Product", ProductSchema);
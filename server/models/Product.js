const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: { type: String },
  price: { type: Number },
  amount: { type: Number },
  description: { type: String },
  image: {type: String},
  category: { type: Schema.Types.ObjectId, ref: "Category" },
});

module.exports = model("Product", schema);

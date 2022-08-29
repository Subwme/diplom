const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    dateMlsec: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Comment", schema);

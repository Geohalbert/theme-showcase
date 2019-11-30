const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Quake = new Schema(
  {
    id: { type: String, required: true },
    properties: { type: Object, required: true },
    coordinates: { type: Array, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("quakes", Quake);

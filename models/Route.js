const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  source: { type: String, required: true },
  destination: { type: String, required: true },
  distance: { type: Number, required: true },
  duration: { type: String, required: true },
});

module.exports = mongoose.model("Route", routeSchema);
const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  busNumber: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
  routes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Route" }],
  date: { type: Date, required: true }, 
});

module.exports = mongoose.model("Bus", busSchema);
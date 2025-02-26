const Bus = require("../models/Bus");
const Route = require("../models/Route");


exports.addBus = async (req, res) => {
  try {
    const { busNumber, capacity, date, routeId } = req.body;
    const bus = new Bus({ busNumber, capacity, date, routes: [routeId] });
    await bus.save();
    res.status(201).json({ message: "Bus added successfully.", bus });
  } catch (err) {
    res.status(500).json({ message: "Error adding bus.", error: err.message });
  }
};

exports.updateBus = async (req, res) => {
  const { id } = req.params;
  const bus = await Bus.findByIdAndUpdate(id, req.body, { new: true });
  res.json({ message: "Bus updated successfully.", bus });
};


exports.searchBuses = async (req, res) => {
  const { source, destination, date } = req.query;
  const routes = await Route.find({ source, destination });
  const buses = await Bus.find({ routes: { $in: routes }, date });
  res.json(buses);
};
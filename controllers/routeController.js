const Route = require("../models/Route");


exports.addRoute = async (req, res) => {
  const { source, destination, distance, duration } = req.body;
  const route = new Route({ source, destination, distance, duration });
  await route.save();
  res.status(201).json({ message: "Route added successfully.", route });
};


exports.updateRoute = async (req, res) => {
  const { id } = req.params;
  const route = await Route.findByIdAndUpdate(id, req.body, { new: true });
  res.json({ message: "Route updated successfully.", route });
};
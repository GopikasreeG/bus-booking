const Booking = require("../models/Booking");
const Bus = require("../models/Bus");

// Book Bus
exports.bookBus = async (req, res) => {
  const { busId, seats } = req.body;
  const bus = await Bus.findById(busId);

  if (!bus) {
    return res.status(404).json({ message: "Bus not found." });
  }

  if (bus.capacity < seats) {
    return res.status(400).json({ message: "Not enough seats available." });
  }

  const booking = new Booking({ user: req.user.id, bus: busId, seats });
  await booking.save();

  bus.capacity -= seats;
  await bus.save();

  res.status(201).json({ message: "Booking successful.", booking });
};

// Cancel Booking
exports.cancelBooking = async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findById(id);

  if (!booking) {
    return res.status(404).json({ message: "Booking not found." });
  }

  if (booking.user.toString() !== req.user.id) {
    return res.status(403).json({ message: "Unauthorized to cancel this booking." });
  }

  const bus = await Bus.findById(booking.bus);
  bus.capacity += booking.seats;
  await bus.save();

  await booking.remove();
  res.json({ message: "Booking cancelled successfully." });
};
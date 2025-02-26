const express = require("express");
const auth = require("../middleware/auth");
const { addBus, updateBus, searchBuses } = require("../controllers/busController");

const router = express.Router();

router.post("/", auth(["admin"]), addBus);
router.put("/:id", auth(["admin"]), updateBus);
router.get("/search", searchBuses); 

module.exports = router;
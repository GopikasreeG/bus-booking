const express = require("express");
const auth = require("../middleware/auth");
const { addRoute, updateRoute } = require("../controllers/routeController");

const router = express.Router();

router.post("/", auth(["admin"]), addRoute);
router.put("/:id", auth(["admin"]), updateRoute);

module.exports = router;
const express = require("express");
const controller = require("../controllers/bookings.controller");

const router = express.Router();

router.get("/", controller.list);
router.get("/search", controller.search);
router.post("/", controller.create);

module.exports = router;

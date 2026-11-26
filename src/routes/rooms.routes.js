const express = require("express");
const roomsRepository = require("../repositories/rooms.repository");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.json(await roomsRepository.findAll());
  } catch (err) {
    next(err);
  }
});

module.exports = router;

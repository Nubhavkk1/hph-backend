const express = require("express");

const verifyToken = require("../Middlewares/authMiddleware.js");
const { createAppointment } = require("../Controllers/appointmentController.js");

const router = express.Router();

router.post("/create", verifyToken, createAppointment);

module.exports = router;


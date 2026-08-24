const Appointment = require("../Models/appointment.model.js");
const User = require("../Models/user.model.js");

const createAppointment = async (req, res) => {
  try {
    const authUser = req.user;

    if (!authUser || !authUser.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required to create an appointment.",
      });
    }

    const user = await User.findById(authUser.id).select("_id role username");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Registered user not found.",
      });
    }

    if (user.role !== "patient") {
      return res.status(403).json({
        success: false,
        message: "Only registered patients can create appointments.",
      });
    }

    const { appointmentDate, appointmentMode, notes } = req.body || {};

    if (!appointmentDate) {
      return res.status(400).json({
        success: false,
        message: "appointmentDate is required.",
      });
    }

    const parsedDate = new Date(appointmentDate);

    if (Number.isNaN(parsedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "appointmentDate must be a valid ISO date string.",
      });
    }

    const minimumAdvanceTime = 15 * 60 * 1000;
    const now = Date.now();

    if (parsedDate.getTime() < now + minimumAdvanceTime) {
      return res.status(400).json({
        success: false,
        message: "Appointment time must be at least 15 minutes in the future.",
      });
    }

    const allowedModes = ["online", "homevisit", "onclinic"];

    if (!appointmentMode) {
      return res.status(400).json({
        success: false,
        message: "appointmentMode is required.",
      });
    }

    if (!allowedModes.includes(appointmentMode)) {
      return res.status(400).json({
        success: false,
        message: `appointmentMode must be one of: ${allowedModes.join(", ")}.`,
      });
    }

    const existingAppointment = await Appointment.findOne({
      patient: user._id,
      appointmentDate: parsedDate,
    });

    if (existingAppointment) {
      return res.status(409).json({
        success: false,
        message: "You already have an appointment scheduled at this time.",
      });
    }

    const newAppointment = await Appointment.create({
      patient: user._id,
      appointmentDate: parsedDate,
      appointmentMode,
      status: "scheduled",
      notes: notes?.trim?.() || undefined,
    });

    return res.status(201).json({
      success: true,
      message: "Appointment created successfully.",
      data: newAppointment,
    });
  } catch (error) {
    console.error("Create appointment error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment data format.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating the appointment.",
    });
  }
};

module.exports = {
  createAppointment,
};

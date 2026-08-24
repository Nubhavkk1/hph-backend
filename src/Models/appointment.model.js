const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Patient is required."],
      index: true,
    },
    appointmentDate: {
      type: Date,
      required: [true, "appointmentDate is required."],
      validate: {
        validator: function (value) {
          return value instanceof Date && !Number.isNaN(value.getTime());
        },
        message: "appointmentDate must be a valid date.",
      },
    },
    appointmentMode: {
      type: String,
      enum: {
        values: ["online", "homevisit", "onclinic"],
        message: "appointmentMode must be one of: online, homevisit, onclinic.",
      },
      required: [true, "appointmentMode is required."],
      default: "onclinic",
    },
    status: {
      type: String,
      enum: {
        values: ["scheduled", "completed", "cancelled"],
        message: "status must be one of: scheduled, completed, cancelled.",
      },
      default: "scheduled",
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, "notes cannot exceed 500 characters."],
    },
  },
  { timestamps: true }
);

appointmentSchema.index({ patient: 1, appointmentDate: 1 }, { unique: false });

module.exports = mongoose.model("Appointment", appointmentSchema);
const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  actualLandingTime: {
    type: Date,
  },
  aircraftType: {
    iataMain: {
      type: String,
      required: true,
    },
    iataSub: {
      type: String,
      required: true,
    },
  },
  codeshares: {
    codeshares: [
      {
        type: String,
      },
    ],
  },
  estimatedLandingTime: {
    type: Date,
  },
  flightDirection: {
    type: String,
    enum: ["A", "D"],
    required: true,
  },
  flightName: {
    type: String,
    required: true,
  },
  flightNumber: {
    type: Number,
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  isOperationalFlight: {
    type: Boolean,
    required: true,
  },
  mainFlight: {
    type: String,
  },
  prefixIATA: {
    type: String,
  },
  prefixICAO: {
    type: String,
  },
  airlineCode: {
    type: Number,
  },
  publicFlightState: {
    flightStates: [
      {
        type: String,
      },
    ],
  },
  route: {
    destinations: [
      {
        type: String,
        required: true,
      },
    ],
    eu: {
      type: String,
    },
    visa: {
      type: Boolean,
    },
  },
  scheduleDateTime: {
    type: Date,
    required: true,
  },
  scheduleDate: {
    type: String,
    required: true,
  },
  scheduleTime: {
    type: String,
    required: true,
  },
  serviceType: {
    type: String,
  },
  terminal: {
    type: Number,
  },
  schemaVersion: {
    type: String,
    default: "4",
  },
});

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;

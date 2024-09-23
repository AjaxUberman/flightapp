const axios = require("axios");
const Flight = require("../models/flight");

// Schiphol API URL ve anahtarlar
const flightApiUrl = "https://api.schiphol.nl/public-flights/flights";
const appKey = "50467f63114d776a1694933310e61ad9";
const appId = "548d1296";

/* Uçuşların hepsini apiden çekme */
const getFlights = async (req, res) => {
  try {
    const { direction, flightdate } = req.query;
    const response = await axios.get(flightApiUrl, {
      headers: {
        Accept: "application/json",
        app_id: appId,
        app_key: appKey,
        resourceversion: "v4",
      },
      params: {
        scheduleDate: flightdate,
        flightDirection: direction,
      },
    });
    const flights = response.data;
    res.json({ flights });
  } catch (error) {
    console.error("Error fetching data", error);
    res.status(500).send("Error fetching data");
  }
};

/* Flightlarımıza yeni uçuş ekleme */
const addFlights = async (req, res) => {
  try {
    const newFlight = new Flight(req.body);
    await newFlight.save();
    res.status(200).json("Flight added");
  } catch (error) {
    console.error("Error saving flight:", error);
    res
      .status(500)
      .json({ message: "Error adding flight", error: error.message });
  }
};

/* Eklediğimiz uçuşları çekme */
const getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).json(flights);
  } catch (error) {
    console.error("Error fetching flight data from MongoDB:", error);
    res.status(500).json({
      message: "Error fetching flight data from MongoDB",
      error: error.message,
    });
  }
};

/* Uçuş silme */
const deleteFlight = async (req, res) => {
  const { id } = req.params;
  try {
    const flight = await Flight.findById(id);

    if (!flight) {
      return res.status(404).json({ message: "Flight not found." });
    }

    await Flight.findByIdAndDelete(flight._id);
    res.status(200).json({ message: "Flight deleted successfully." });
  } catch (error) {
    console.error("Error deleting flight:", error.message);
    res
      .status(500)
      .json({ message: "Error deleting flight", error: error.message });
  }
};

module.exports = {
  getFlights,
  addFlights,
  getAllFlights,
  deleteFlight,
};

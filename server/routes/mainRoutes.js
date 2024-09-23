const express = require("express");
const flightController = require("../controllers/flightController");
const router = express.Router();

// Uçuşları Schiphol API'den getiren endpoint
router.get("/", flightController.getFlights);

// Yeni uçuş ekleyen endpoint
router.post("/add-flight", flightController.addFlights);

// MongoDB'den tüm uçuşları getiren endpoint
router.get("/get-flight", flightController.getAllFlights);

// Uçuş silen endpoint
router.delete("/delete-flight/:id", flightController.deleteFlight);

module.exports = router;

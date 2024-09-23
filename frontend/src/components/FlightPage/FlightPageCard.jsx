import React, { useEffect, useState } from "react";
import thyLogo from "../../assets/thy.png";
import { FaAngleDown } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import airlinesDatas from "../../datas/airlines.json";
import dayjs from "dayjs";
import Modal from "../ui/PopUp";

const FlightPageCard = ({ flightDatas, selectedFilters }) => {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchOptions = [
    { name: "Economy", price: "150$" },
    { name: "Flexible", price: "250$" },
    { name: "Business", price: "350$" },
  ];

  /* Airline Code'a göre name alma  */
  const getAirlineName = (code) => {
    const airline = airlinesDatas.find(
      (airline) => airline.id === code.toString()
    );
    return airline ? airline.name : "Unknown Airline";
  };

  /*Flight Detail Modal açma  */
  const openModal = (flight) => {
    setSelectedFlight(flight);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFlight(null);
  };

  /* Uçuş silme */
  const deleteFlight = async (flightId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/delete-flight/${flightId}`
      );
      if (response.status === 200) {
        toast.success("Flight deleted successfully.");
      }
    } catch (error) {
      toast.error("Error deleting flight.");
      console.error(error);
    }
  };

  /* Aktarmalı uçuş mu kontrol */
  const getStopInformation = (destinations) => {
    if (destinations.length <= 1) {
      return "Nonstop";
    } else {
      const stops = destinations.length - 1;
      return `${stops} stop${stops > 1 ? "s" : ""}`;
    }
  };

  // Uçuş verilerini filtreleme fonksiyonu
  const filterFlights = () => {
    return flightDatas.filter((flight) => {
      const { date, stops, airlines, times, airports } = selectedFilters;
      const matchesDate = date
        ? dayjs(flight.scheduleDateTime).isSame(dayjs(date), "day")
        : true;
      const matchesStops = stops
        ? getStopInformation(flight.route.destinations) === stops
        : true;
      const matchesAirlines = airlines ? flight.airlineCode === airlines : true;
      console.log(flight);
      const matchesTimes = times
        ? (times.includes("Morning") &&
            dayjs(flight.scheduleDateTime).hour() < 12) ||
          (times.includes("Afternoon") &&
            dayjs(flight.scheduleDateTime).hour() >= 12)
        : true;

      const matchesAirports = airports
        ? flight.route.destinations.includes(airports)
        : true;

      return (
        matchesDate &&
        matchesStops &&
        matchesAirlines &&
        matchesTimes &&
        matchesAirports
      );
    });
  };

  const filteredFlights = filterFlights();

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : filteredFlights.length > 0 ? (
        filteredFlights.map((flight, index) => (
          <div
            key={index}
            className="bg-white rounded-md shadow-sm flex flex-col md:flex-row my-4 justify-between p-5 md:p-7 relative grid-cols-4"
          >
            <div className="flex w-full gap-4 md:col-span-3">
              <img src={thyLogo} alt="Thy Logo" className="w-10 h-10" />
              <div className="flex flex-col w-full">
                <p className="text-2xl">
                  {dayjs(flight.scheduleDateTime, "HH:mm:ss").format("h A")} -{" "}
                  {dayjs(flight.estimatedLandingTime).format("h:mm A")}
                </p>
                <div className="flex flex-col md:flex-row justify-around mt-4">
                  <div className="flex flex-col">
                    <p className="font-semibold">
                      {getAirlineName(flight.airlineCode)}
                    </p>
                    <button
                      onClick={() => openModal(flight)}
                      className="text-secondary hover:text-blue-800 flex items-center mt-2"
                    >
                      <p>Flight Details</p>
                      <FaAngleDown />
                    </button>
                  </div>
                  <div className="flex flex-col mt-3 md:mt-0">
                    <p className="font-semibold">
                      {getStopInformation(flight.route.destinations)}
                    </p>
                    <p className="text-maintext">1h 32m</p>
                  </div>
                  <div className="flex flex-col md:flex-row md:gap-6 mt-3 md:mt-0">
                    <div className="flex flex-col">
                      <p className="font-semibold text-lg">
                        {flight.flightDirection === "D"
                          ? "AMS"
                          : flight.route.destinations[0]}{" "}
                        -{" "}
                        {flight.flightDirection === "A"
                          ? "AMS"
                          : flight.route.destinations[
                              flight.route.destinations.length - 1
                            ]}
                      </p>
                      <p className="text-maintext">{flight.flightName}</p>
                    </div>
                    <button
                      onClick={() => deleteFlight(flight._id)}
                      className="text-white bg-red-400 px-2 py-1 rounded-md shadow-ms hover:bg-red-600 transition duration-100 ease-in mt-3 md:mt-0"
                    >
                      Cancel Flight
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Price Cards */}
            <div className="flex gap-2 flex-wrap justify-between mt-4 md:mt-0 md:col-span-1">
              {searchOptions.map((option, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center rounded-md shadow-sm w-20 gap-2 border bg-gray-100"
                >
                  <p className="font-semibold">{option.price}</p>
                  <p className="text-maintext">{option.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No flights available.</p>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        flight={selectedFlight}
      />
    </>
  );
};

export default FlightPageCard;

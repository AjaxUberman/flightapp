import React, { useState, useEffect } from "react";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaCalendarCheck,
  FaCalendarWeek,
} from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";
import airportNames from "../../datas/airportNames.json";

const FlightSearch = ({ setFlightDetails }) => {
  const [active, setActive] = useState("round");
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [flightDate, setFlightDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [filteredDepartureAirports, setFilteredDepartureAirports] = useState(
    []
  );
  const [filteredArrivalAirports, setFilteredArrivalAirports] = useState([]);
  const [showDepartureMenu, setShowDepartureMenu] = useState(false);
  const [showArrivalMenu, setShowArrivalMenu] = useState(false);

  /* Airport isimlerini json dosyamızdan çekiyoruz */
  useEffect(() => {
    if (departure.length > 1) {
      const filtered = airportNames.filter((airport) =>
        airport.iata.toUpperCase().includes(departure.toUpperCase())
      );
      setFilteredDepartureAirports(filtered);
    } else {
      setFilteredDepartureAirports([]);
      setShowDepartureMenu(false);
    }
  }, [departure]);

  /* Airport isimlerini json dosyamızdan çekiyoruz */
  useEffect(() => {
    if (arrival.length > 1) {
      const filtered = airportNames.filter((airport) =>
        airport.iata.toUpperCase().includes(arrival.toUpperCase())
      );
      setFilteredArrivalAirports(filtered);
    } else {
      setFilteredArrivalAirports([]);
      setShowArrivalMenu(false);
    }
  }, [arrival]);

  /* Havalimanı seçerken menünün açılması ve havalimanı seçmek için olan fonksiyon */
  const handleAirportSelect = (airport, type) => {
    if (type === "departure") {
      setDeparture(airport.iata);
      setShowDepartureMenu(false);
    } else {
      setArrival(airport.iata);
      setShowArrivalMenu(false);
    }
  };

  /* Ara Buttonu İçin Fonksiyon */
  const searchHandler = async () => {
    if (!departure || !arrival || !flightDate) {
      toast.error("Please fill out all required fields.");
      return;
    }
    const fromAirportCode = departure.toUpperCase();
    const toAirportCode = arrival.toUpperCase();

    try {
      let directionFilter;
      if (fromAirportCode !== "AMS" && toAirportCode === "AMS") {
        directionFilter = "A";
      } else if (fromAirportCode === "AMS" && toAirportCode !== "AMS") {
        directionFilter = "D";
      }

      const response = await axios.get("http://localhost:4000/", {
        params: {
          flightdate: flightDate
            ? dayjs(flightDate).format("YYYY-MM-DD")
            : null,
          returnDate:
            active === "round"
              ? returnDate
                ? dayjs(returnDate).format("YYYY-MM-DD")
                : null
              : null,
          direction: directionFilter,
        },
      });

      const flights = response.data.flights.flights;
      console.log(flights);

      /* Kalkış ve varışları filtreleme */
      if (Array.isArray(flights)) {
        const filteredFlights = flights.filter((flight) => {
          const fromForDestinations = flight.route.destinations || [];
          const toForDestinations = flight.route.destinations || [];

          if (directionFilter === "A") {
            return fromForDestinations.includes(fromAirportCode);
          } else if (directionFilter === "D") {
            return toForDestinations.includes(toAirportCode);
          }

          return false;
        });

        if (filteredFlights.length === 0) {
          toast.error("No flights found for the given criteria.");
        } else {
          setFlightDetails(filteredFlights);
          toast.success("Flights found successfully");
        }
      } else {
        console.error("Flights data is not an array:", flights);
      }
    } catch (error) {
      toast.error("Error fetching flight data.");
      console.error("Error fetching flight data:", error.message);
    }
  };

  return (
    <div className="flex flex-col rounded-md shadow-sm bg-white px-7 py-6">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <FaPlaneDeparture className="text-xl" />
          <p className="font-semibold text-lg">BOOK YOUR FLIGHT</p>
        </div>
        <div className="flex items-center">
          <button
            className={`rounded-l-full px-2 py-2 hover:bg-secondary hover:text-white transition duration-100 ease-in ${
              active === "round"
                ? "bg-primary text-white"
                : "bg-gray-300 text-primary"
            }`}
            onClick={() => setActive("round")}
          >
            Round Trip
          </button>
          <button
            className={`rounded-r-full px-2 py-2 hover:bg-secondary hover:text-white transition duration-100 ease-in ${
              active === "one-way"
                ? "bg-primary text-white"
                : "bg-gray-300 text-primary"
            }`}
            onClick={() => setActive("one-way")}
          >
            One Way
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-5 relative">
        <div className="flex items-center gap-1">
          <div className="relative flex items-center gap-1 border-2 rounded-full w-full py-1 px-2">
            <FaPlaneDeparture className="text-primary" />
            <input
              className="opacity-70 w-full focus:outline-none"
              placeholder="From..."
              type="text"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              onClick={() => setShowDepartureMenu(true)}
              onBlur={() => setShowDepartureMenu(false)}
            />
            {showDepartureMenu && filteredDepartureAirports.length > 0 && (
              <ul className="absolute z-10 top-full left-0 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {filteredDepartureAirports.map((airport, index) => (
                  <li
                    key={index}
                    className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleAirportSelect(airport, "departure")}
                  >
                    {airport.name} ({airport.iata})
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="relative flex items-center gap-1 border-2 rounded-full w-full py-1 px-2">
            <FaPlaneArrival className="text-primary" />
            <input
              className="opacity-70 w-full focus:outline-none"
              placeholder="To..."
              type="text"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              onClick={() => setShowArrivalMenu(true)}
            />
            {showArrivalMenu && filteredArrivalAirports.length > 0 && (
              <ul className="absolute z-10 top-full left-0 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {filteredArrivalAirports.map((airport, index) => (
                  <li
                    key={index}
                    className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleAirportSelect(airport, "arrival")}
                  >
                    {airport.name} ({airport.iata})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div
            className={`flex items-center gap-1 border-2 w-full py-1 px-2 ${
              active === "round" ? "rounded-l-full" : "rounded-full"
            }`}
          >
            <FaCalendarCheck className="text-primary" />
            <input
              className="opacity-70 w-full focus:outline-none"
              placeholder="Flight Date"
              type="date"
              onChange={(e) => setFlightDate(dayjs(e.target.value))}
            />
          </div>
          <div
            className={`flex items-center gap-1 border-2 w-full py-1 px-2 ${
              active === "one-way" ? "hidden " : "rounded-r-full"
            }`}
          >
            <FaCalendarWeek className="text-primary" />
            <input
              className="opacity-70 w-full focus:outline-none"
              placeholder="Return Date"
              type="date"
              onChange={(e) => setReturnDate(dayjs(e.target.value))}
            />
          </div>
        </div>
      </div>
      <div className="flex mt-4">
        <button
          className="bg-primary text-white rounded-full py-2 px-4 w-full hover:bg-secondary transition duration-100 ease-in"
          onClick={searchHandler}
        >
          Search Flights
        </button>
      </div>
    </div>
  );
};

export default FlightSearch;

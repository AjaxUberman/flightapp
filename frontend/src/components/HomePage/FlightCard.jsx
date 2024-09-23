import React, { useState } from "react";
import { FaPlaneDeparture, FaPlaneArrival, FaPlane } from "react-icons/fa";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { toast } from "react-toastify";
import axios from "axios";
import airlinesDatas from "../../datas/airlines.json";
import { useNavigate } from "react-router-dom";
import Loading from "../ui/Loading"; // Loading bileşenini import ettik
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

const FlightCard = ({ flightDetails }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const calculateFlightDuration = (departureTime, arrivalTime) => {
    const depTime = dayjs(departureTime);
    const arrTime = dayjs(arrivalTime);
    const diff = dayjs.duration(arrTime.diff(depTime));
    return `${diff.hours()}h ${diff.minutes()}m`;
  };

  const getAirlineName = (code) => {
    const airline = airlinesDatas.find(
      (airline) => airline.id === code.toString()
    );
    return airline ? airline.name : "Unknown Airline";
  };

  const getStopInformation = (destinations) => {
    if (destinations.length <= 1) {
      return "Nonstop";
    } else {
      const stops = destinations.length - 1;
      return `${stops} stop${stops > 1 ? "s" : ""}`;
    }
  };

  const bookHandler = async (flight) => {
    const flightDate = dayjs(flight.scheduleDateTime);
    if (flightDate.isBefore(dayjs(), "day")) {
      toast.error("You can't book past flights.");
      return;
    }

    setLoading(true);

    try {
      const newFlight = {
        actualLandingTime: flight.actualLandingTime || null,
        aircraftType: {
          iataMain: flight.aircraftType.iataMain,
          iataSub: flight.aircraftType.iataSub,
        },
        codeshares: flight.codeshares
          ? {
              codeshares: flight.codeshares.codeshares || [],
            }
          : { codeshares: [] },
        estimatedLandingTime: flight.estimatedLandingTime || null,
        flightDirection: flight.flightDirection,
        flightName: flight.flightName,
        flightNumber: flight.flightNumber,
        id: flight.id,
        isOperationalFlight: flight.isOperationalFlight,
        mainFlight: flight.mainFlight || null,
        prefixIATA: flight.prefixIATA || null,
        prefixICAO: flight.prefixICAO || null,
        airlineCode: flight.airlineCode || null,
        publicFlightState: {
          flightStates: flight.publicFlightState.flightStates || [],
        },
        route: {
          destinations: flight.route.destinations,
          eu: flight.route.eu || null,
          visa: flight.route.visa || null,
        },
        scheduleDateTime: flight.scheduleDateTime,
        scheduleDate: flight.scheduleDate,
        scheduleTime: flight.scheduleTime,
        serviceType: flight.serviceType || null,
        terminal: flight.terminal || null,
        schemaVersion: flight.schemaVersion || "4",
      };

      const response = await axios.post(
        "http://localhost:4000/add-flight",
        newFlight
      );

      toast.success(
        "Flight booked successfully!, redirecting to your flights."
      );
      setTimeout(() => {
        navigate("/my-flights");
      }, 3000);
    } catch (error) {
      console.error(
        "Error booking flight:",
        error.response ? error.response.data : error.message
      );
      toast.error("Error Booking Flight");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      {loading ? (
        <Loading /> // Loading bileşenini burada gösteriyoruz
      ) : (
        flightDetails?.map((flight, index) => (
          <div
            key={index}
            className="bg-white rounded-md flex flex-col shadow-md p-5 relative mb-5"
          >
            <p className="text-lg font-bold">
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
            <div className="flex items-center justify-between mt-2">
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-gray-600">
                  <FaPlaneDeparture />
                  <p>
                    {flight.flightDirection === "D" ? "Departure" : "Arrival"}
                  </p>
                </div>
                <p className="font-bold">
                  {dayjs(flight.scheduleDateTime)
                    .tz("Europe/Berlin")
                    .format("h:mm A")}{" "}
                </p>
                <p className="text-gray-600">
                  Airport:{" "}
                  {flight.flightDirection === "D"
                    ? "AMS"
                    : flight.route.destinations[0]}
                </p>
              </div>
              <div className="bg-gray-500 w-16 h-0.5"></div>
              <div className="flex flex-col items-center">
                <p className="text-primary font-semibold mb-2">
                  {getAirlineName(flight.airlineCode)}
                </p>
                <FaPlane className="text-gray-600" />
                <p>
                  {calculateFlightDuration(
                    flight.scheduleDateTime,
                    flight.estimatedLandingTime
                  )}{" "}
                  ({getStopInformation(flight.route.destinations)})
                </p>
              </div>
              <div className="bg-gray-500 w-16 h-0.5"></div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-gray-600">
                  <FaPlaneArrival />
                  <p>
                    {flight.flightDirection === "A" ? "Departure" : "Arrival"}
                  </p>
                </div>
                <p className="font-bold">
                  {dayjs(flight.estimatedLandingTime)
                    .tz("Europe/Berlin")
                    .format("h:mm A")}
                </p>
                <p className="text-gray-600">
                  Airport:{" "}
                  {flight.flightDirection === "A"
                    ? "AMS"
                    : flight.route.destinations[
                        flight.route.destinations.length - 1
                      ]}
                </p>
              </div>
            </div>
            <div className="flex justify-between relative">
              <div className="mt-5">
                <p className="font-bold text-primary">Price: $200</p>
                <p>Round Trip</p>
              </div>
            </div>
            <button
              className="bg-primary text-white px-10 py-6 absolute bottom-0 right-0 rounded-md hover:scale-105 hover:bg-purple-700 ease-in transition duration-200"
              onClick={() => bookHandler(flight)}
            >
              Book Flight
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default FlightCard;

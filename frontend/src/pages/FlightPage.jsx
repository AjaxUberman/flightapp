import React, { useEffect, useState } from "react";
import FlightPageHeader from "../components/FlightPage/FlightPageHeader";
import FlightPageCard from "../components/FlightPage/FlightPageCard";
import SortOptions from "../components/FlightPage/SortOptions";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const FlightPage = () => {
  const [flightDatas, setFlightDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    date: null,
    stops: null,
    airlines: null,
    times: null,
    airports: null,
  });

  /* Önceki filtreleri tutup kalan filtreleri değiştirme */
  const handleFilterChange = (value, type) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  // Destinations'ı alacak fonksiyon
  const getDestinations = () => {
    const destinations = flightDatas.flatMap(
      (flight) => flight.route?.destinations || []
    );
    return [...new Set(destinations)]; // Tekil destinasyonları döndür
  };

  /* Apiden kullanıcı uçuşlarını çekme */
  const getFlightDatas = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/get-flight");
      setFlightDatas(response.data);
    } catch (error) {
      toast.error("Error getting your flight datas.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFlightDatas();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <ToastContainer />
      <FlightPageHeader
        onFilterChange={handleFilterChange}
        airportNames={getDestinations()}
      />
      <div className="xl:px-32 px-5 md:px-10 ">
        <SortOptions />
        <FlightPageCard
          flightDatas={flightDatas}
          selectedFilters={selectedFilters}
        />
      </div>
    </div>
  );
};

export default FlightPage;

import React, { useState } from "react";
import Header from "../components/Header";
import RightSection from "../components/HomePage/RightSection";
import FlightSearch from "../components/HomePage/FlightSearch";
import FlightCard from "../components/HomePage/FlightCard";
import SortOptions from "../components/HomePage/SortOptions";
import { ToastContainer } from "react-toastify";

const HomePage = () => {
  const [flightDetails, setFlightDetails] = useState([]);
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col xl:px-32 xl:py-5 px-4">
      <ToastContainer />
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5 pt-5">
        <div className="col-span-1 md:col-span-4 flex flex-col">
          <FlightSearch setFlightDetails={setFlightDetails} />
          <div className="grid grid-cols-1 md:grid-cols-6 gap-5 mt-6">
            <div className="col-span-1 md:col-span-4">
              <FlightCard flightDetails={flightDetails} />
            </div>
            <div className="col-span-1 md:col-span-2">
              <SortOptions />
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <RightSection />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

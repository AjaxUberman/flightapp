import React from "react";
import { FaCar } from "react-icons/fa";
import { PiIslandBold } from "react-icons/pi";
import { FaHotel } from "react-icons/fa";
import carImage from "../../assets/car.jpg";
import suitCaseImage from "../../assets/suitcase.jpg";
import hotelsImage from "../../assets/hotels.jpg";

const RightSection = () => {
  return (
    <section className="flex flex-col gap-2">
      <div className="relative group cursor-pointer">
        <img
          src={carImage}
          alt="Car Rental"
          className=" transition duration-100 ease-in rounded-lg object-cover aspect-square"
        />
        <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
        <div className="absolute left-2 bottom-0 w-full p-2 text-white flex flex-col">
          <FaCar />
          <p className="font-bold text-lg">Car Rentals</p>
        </div>
      </div>
      <div className="relative group cursor-pointer">
        <img
          src={hotelsImage}
          alt="Hotels"
          className=" transition duration-100 ease-in rounded-lg object-cover aspect-square"
        />
        <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
        <div className="absolute left-2 bottom-0 w-full p-2 text-white flex flex-col">
          <FaHotel />
          <p className="font-bold text-lg">Hotels</p>
        </div>
      </div>
      <div className="relative group cursor-pointer">
        <img
          src={suitCaseImage}
          alt="Suit Case"
          className=" transition duration-100 ease-in rounded-lg object-cover aspect-square"
        />
        <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
        <div className="absolute left-2 bottom-0 w-full p-2 text-white flex flex-col">
          <PiIslandBold />
          <p className="font-bold text-lg">Travel Packages</p>
        </div>
      </div>
    </section>
  );
};

export default RightSection;

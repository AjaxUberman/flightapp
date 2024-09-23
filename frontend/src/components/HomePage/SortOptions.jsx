import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";

const SortOptions = () => {
  const [menuOpener, setMenuOpener] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Lowest Price");
  const [selectedTime, setSelectedTime] = useState("morning");
  const [selectedStops, setSelectedStops] = useState("nonstop");
  const [selectedAirlines, setSelectedAirlines] = useState("alitalia");
  const [maxPrice, setMaxPrice] = useState(0);

  const selectOptions = [
    { value: "lowest-price", label: "Lowest Price" },
    { value: "highest-price", label: "Highest Price" },
    { value: "shortest-time", label: "Shortest Time" },
  ];

  const timeOptions = [
    { label: "5:00 AM - 11:59 AM", value: "morning" },
    { label: "12:00 PM - 5:59 PM", value: "afternoon" },
  ];

  const stopsOptions = [
    { label: "Nonstop", value: "nonstop", price: "230$" },
    { label: "1 Stop", value: "1stop", price: "230$" },
    { label: "2 Stop", value: "2stop", price: "230$" },
  ];

  const airlinesOptions = [
    { label: "Alitalia", value: "alitalia", price: "230$" },
    { label: "Delta", value: "delta", price: "250$" },
    { label: "Emirates", value: "emirates", price: "270$" },
  ];

  return (
    <div className="flex flex-col gap-4 w-60">
      {/* Sort By */}
      <div className="flex flex-col gap-2.5">
        <p className="font-bold">Sort By:</p>
        <div className="flex flex-col relative">
          {/* Button to open/close the dropdown */}
          <button
            className="bg-white w-60 rounded-md shadow-md flex justify-between items-center px-2 py-2 hover:bg-gray-200"
            onClick={() => setMenuOpener(!menuOpener)}
          >
            <p>{selectedSort}</p>
            <FaCaretDown className="text-primary" />
          </button>

          {/* Dropdown menu that appears when menuOpener is true */}
          {menuOpener && (
            <div className="absolute bg-white w-60 mt-1 rounded-md shadow-lg z-10">
              {selectOptions.map((option, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedSort(option.label);
                    setMenuOpener(false);
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Arrival Time */}
      <div className="flex flex-col gap-2.5 w-96">
        <p className="font-bold">Arrival Time</p>
        {timeOptions.map((option) => (
          <div key={option.value} className="flex items-center">
            <button
              className={`w-5 h-5 border-2 rounded-full ${
                selectedTime === option.value ? "bg-primary" : "bg-white"
              }`}
              onClick={() => setSelectedTime(option.value)}
            />
            <p className="ml-2">{option.label}</p>
          </div>
        ))}
      </div>

      {/* Stops */}
      <div className="flex flex-col gap-2.5 ">
        <p className="font-bold">Stops</p>
        {stopsOptions.map((option) => (
          <div key={option.value} className="flex items-center">
            <button
              className={`w-6 h-5 border-2 rounded-full ${
                selectedStops === option.value ? "bg-primary" : "bg-white"
              }`}
              onClick={() => setSelectedStops(option.value)}
            />
            <div className="flex justify-between ml-2 w-full">
              <p>{option.label}</p>
              <p className="text-right">{option.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Airlines Included */}
      <div className="flex flex-col gap-2.5 ">
        <p className="font-bold">Airlines Included</p>
        {airlinesOptions.map((option) => (
          <div key={option.value} className="flex items-center">
            <button
              className={`w-6 h-5 border-2 rounded-full ${
                selectedAirlines === option.value ? "bg-primary" : "bg-white"
              }`}
              onClick={() => setSelectedAirlines(option.value)}
            />
            <div className="flex justify-between ml-2 w-full">
              <p>{option.label}</p>
              <p className="text-right">{option.price}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Max Price */}
      <div className="flex flex-col gap-2.5 relative">
        <p className="font-bold">Max Price</p>
        <input
          placeholder="Set Max Price..."
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border rounded-md px-4 py-2"
        />
        <p className="absolute right-9 bottom-2">$</p>
      </div>

      <button className="bg-primary text-white hover:bg-purple-700 ease-in transition duration-200 py-2 rounded-md shadow-md">
        Filter Flights
      </button>
    </div>
  );
};

export default SortOptions;

import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import DropdownMenu from "../ui/DropDownMenu";

const FlightPageHeader = ({ airportNames, onFilterChange }) => {
  const [value, setValue] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState({
    dates: false,
    stops: false,
    airlines: false,
    times: false,
    airports: false,
  });
  const [selectedDate, setSelectedDate] = useState("");

  // Seçilen dropdown'u aç veya kapat
  const toggleDropdown = (key) => {
    setDropdownOpen((prev) => {
      const newState = {
        dates: false,
        stops: false,
        times: false,
        airports: false,
      };
      newState[key] = !prev[key];
      return newState;
    });
  };

  // Seçilen veriyi üst bileşene ilet
  const handleSelect = (option, type) => {
    console.log(`Selected ${type}:`, option);
    onFilterChange(option, type);
    toggleDropdown(type);
  };

  const dropdownOptions = {
    stops: ["Nonstop", "1 Stop", "2 Stops"],
    times: ["Morning", "Afternoon"],
    airports: airportNames,
  };

  return (
    <header className="flex flex-col md:flex-row justify-between items-center bg-white px-4 md:px-32 py-5">
      <div className="flex gap-2.5 md:gap-4 relative">
        <div className="relative">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              handleSelect(e.target.value, "date");
            }}
            className="border font-semibold rounded-md px-4 py-2"
          />
        </div>

        {Object.keys(dropdownOptions).map(
          (key) =>
            key !== "dates" && (
              <div key={key} className="relative">
                <button
                  onClick={() => toggleDropdown(key)}
                  className="border font-semibold rounded-md px-4 py-2 hover:bg-blue-600 hover:text-white transition duration-200"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
                {dropdownOpen[key] && (
                  <DropdownMenu
                    options={dropdownOptions[key]}
                    onSelect={(option) => handleSelect(option, key)}
                  />
                )}
              </div>
            )
        )}
      </div>
      <div className="mt-4 md:mt-0">
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </div>
    </header>
  );
};

export default FlightPageHeader;

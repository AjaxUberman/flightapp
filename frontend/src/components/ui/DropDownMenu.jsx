import React from "react";

const DropdownMenu = ({ options, onSelect }) => {
  return (
    <div className="absolute left-0 mt-1 w-24 bg-white border rounded-md shadow-lg z-10">
      <ul className="block">
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => onSelect(option)}
            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;

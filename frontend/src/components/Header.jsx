import React from "react";
import { Link } from "react-router-dom";
import { IoMdPricetags } from "react-icons/io";
import { TiWorld } from "react-icons/ti";
import mainLogo from "../assets/mainLogo.png";
import avatar from "../assets/avatar.jpg";

const Header = () => {
  return (
    <header className="flex items-center justify-between ">
      <div className="flex items-center gap-1">
        <img src={mainLogo} alt="Main Logo" className="w-10 h-10" />
        <p className="font-bold text-lg">PLANE SCAPE</p>
      </div>
      <div className="flex gap-6 items-center">
        <Link className="flex gap-1 items-center group">
          <IoMdPricetags className="text-primary text-xl" />
          <p className="text-gray-800 font-semibold group-hover:text-maintext ease-in transition duration-100">
            Deals
          </p>
        </Link>
        <Link className="flex gap-1 items-center group">
          <TiWorld className="text-primary text-xl" />
          <p className="text-gray-800 font-semibold group-hover:text-maintext ease-in transition duration-100">
            Discover
          </p>
        </Link>
        <Link className="flex gap-1 items-center group">
          <img
            src={avatar}
            alt="avatar"
            className="h-7 w-7 object-cover rounded-full shadow-md"
          />
          <p className="text-gray-800 font-semibold group-hover:text-maintext ease-in transition duration-100">
            Joane Smith
          </p>
        </Link>
      </div>
    </header>
  );
};

export default Header;

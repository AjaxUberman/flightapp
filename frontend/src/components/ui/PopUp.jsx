import React from "react";

const Modal = ({ isOpen, onClose, flight }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-md p-5">
        <h2 className="text-xl font-bold px-10 py-2 text-secondary">
          Flight Details
        </h2>
        <p>
          <strong>Flight Name:</strong> {flight.flightName}
        </p>
        <p>
          <strong>Flight Number:</strong> {flight.flightNumber}
        </p>
        <p>
          <strong>Airline Code:</strong> {flight.airlineCode}
        </p>
        <p>
          <strong>prefixIATA:</strong> {flight.prefixIATA}
        </p>
        <p>
          <strong>Terminal:</strong> 1
        </p>
        <button
          onClick={onClose}
          className="mt-4 text-white bg-secondary px-4 py-2 rounded-md shadow-ms hover:bg-blue-600 transition duration-100 ease-in"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;

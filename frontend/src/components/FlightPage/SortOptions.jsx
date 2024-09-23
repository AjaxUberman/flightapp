import React from "react";
import { CiCircleInfo } from "react-icons/ci";

const SortOptions = () => {
  return (
    <div className="my-4 flex justify-between items-center">
      <div>
        <p>
          Sort By: <strong>Recommended</strong>
        </p>
      </div>
      <div className="flex items-center gap-1">
        <CiCircleInfo className="text-secondary text-xl" />
        <p>
          Avg Fare: <strong>$225</strong>
        </p>
      </div>
    </div>
  );
};

export default SortOptions;

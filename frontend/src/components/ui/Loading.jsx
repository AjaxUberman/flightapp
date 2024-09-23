import React from "react";
import loadingGif from "../../assets/loading.gif";

const Loading = () => {
  return (
    <div>
      <img src={loadingGif} alt="loading-plane" className="w-20 h-20" />
    </div>
  );
};

export default Loading;

import React from "react";
import "./ImageGenerator.css";
import Default from "../Assets/Default.jpg";

const ImageGenerator = () => {
  return (
    <div className="generator">
      <div className="header">
        Ai image <span> generator</span>
      </div>
      <div className="img-loading">
        <div className="img">
          <img src={Default} alt=" " />
        </div>

      </div>
      <div className="search-box">
        <input type="text" className="search" placeholder="What you expect to see" />
        <div className="search-button">Generate</div>
      </div>
    </div>
  );
};

export default ImageGenerator;

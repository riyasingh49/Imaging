import React, { useRef, useState } from "react";
import "./ImageGenerator.css";
import Default from "../Assets/Default.jpg";
import camera from "../Assets/camera.png";
import gallery from '../Assets/gallery.png';
import "../Capture/Capture.jsx";
import Capture from "../Capture/Capture.jsx";

const ImageGenerator = ({capturePhoto}) => {

  const[image_url, setimage_url] = useState("/");
  let inputRef= useRef(null);

  // const ImageGenerator = async () => {
  //   if(inputRef.current.value === ""){
  //     return 0;
  //   }
  //   const response = await fetch()
    
  // }


  return (
    <div className="generator">
      <div className="header">
        Ai image <span> generator</span>
      </div>
      <div className="img-loading">
        <div className="img">
          <img src={image_url === "/" ? Default: image_url} alt=" " />
        </div>

      </div>
      <div className="search-box">
        {/* <img src={camera} onClick= {<Capture/>}className= "camera"  alt="" /> */}
        {/* <a href= {<Capture/>} target="_blank" rel = "noopener noreferrer" ><img src={camera} alt="" /></a> */}

        {/* <Capture/> */}
        {/* <img src={gallery} className= "gallery" alt="" /> */}
        <img
      src={camera}
      onClick={capturePhoto}
      className="camera"
      alt="camera"
      style={{ cursor: "pointer" }}
    />
        <input type="text" ref = {inputRef} className="search" placeholder="What you expect to see" />
        <div className="search-button">Generate</div>
      </div>
    </div>
  );
};

export default ImageGenerator;

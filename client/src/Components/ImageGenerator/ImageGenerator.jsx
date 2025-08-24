import React, { useRef, useState } from "react";
import "./ImageGenerator.css";
import Default from "../Assets/Default.jpg";
import camera from "../Assets/camera.png";
import gallery from "../Assets/gallery.png";

const ImageGenerator = () => {
  const [image_url, setImageUrl] = useState("/");
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Start camera
  const startCamera = async () => {
    try {
      setShowCamera(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Camera not accessible:", error);
    }
  };

  // Stop camera
  const stopCamera = () => {
    let stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setShowCamera(false);
  };

  // Capture photo
  const capturePhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.translate(canvasRef.current.width, 0); 
    context.scale(-1, 1); // Mirror effect for captured image
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const photoData = canvasRef.current.toDataURL("image/png");
    setImageUrl(photoData);
    stopCamera();
  };

  // Open gallery
  const openGallery = () => {
    fileInputRef.current.click();
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImageUrl(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="generator">
      <div className="header">
        Ai image <span> generator</span>
      </div>

      <div className="img-loading">
        <div className="img">
          <img src={image_url === "/" ? Default : image_url} alt="Preview" />
        </div>
      </div>

      <div className="search-box">
        <img src={camera} onClick={startCamera} className="camera" alt="camera" />
        <img src={gallery} onClick={openGallery} className="gallery" alt="gallery" />
        <input type="file" ref={fileInputRef} style={{ display: "none" }} accept="image/*" onChange={handleFileChange} />
        <input type="text" className="search" placeholder="What you expect to see" />
        <div className="search-button">Generate</div>
      </div>

      {showCamera && (
        <div className="camera-popup">
          <video ref={videoRef} autoPlay playsInline />
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={capturePhoto}>Capture</button>
            <button onClick={stopCamera}>Close</button>
          </div>
          <canvas ref={canvasRef} width={500} height={400} style={{ display: "none" }} />
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;

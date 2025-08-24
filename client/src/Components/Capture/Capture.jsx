import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";
import camera from "../Assets/camera.png";
import ImageGenerator from "../ImageGenerator/ImageGenerator";

const videoConstraints = {
  width: 540,
  facingMode: "environment",
};

const Capture = () => {
  const webcamRef = useRef(null);

  const [url, setUrl] = React.useState(null);

  const capturePhoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);
  }, [webcamRef]);

  const onUserMedia = (e) => {
    console.log(e);
  };

  return (
    <div>
      <Webcam
        ref={webcamRef}
        audio={true}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        onUserMedia={onUserMedia}
        mirrored={true}
      />
      <ImageGenerator capturePhoto={capturePhoto} />

      <button onClick={() => setUrl(null)}>Refresh</button>

      {url && (
        <div>
          <img src={url} alt="screenShot" />
        </div>
      )}
    </div>
  );
};

export default Capture;

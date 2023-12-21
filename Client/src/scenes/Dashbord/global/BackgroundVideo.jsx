import React, { useState, useEffect } from "react";
import "./style/video.css"; // Create a CSS file for your component styles

const BackgroundVideo = () => {
  const images = [
    "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://static.dezeen.com/uploads/2021/07/reframd-eyewear-sunglasses-black-design-afro_dezeen_2364_col_4.jpg",

    "https://images.unsplash.com/photo-1519882882460-966092a360d4?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://www.cgi-textures.com/media/cache/full_thumb/th/5d/7b/9c/5d7b9c7b3d6fd699411141.jpg",

    // Add more image paths as needed
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Increment the key to trigger a re-render and restart the animation
      setAnimationKey((prevKey) => prevKey + 1);

      // Increment the image index to show the next image in the slideshow
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  const title = "PERFECT GLASSES";

  return (
    <div className="your-component">
      {images.map((image, index) => (
        <div
          key={index}
          className={`background-image ${
            index === currentImageIndex ? "active" : ""
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
      <div className="animated-title play-once">
        {title.split(" ").map((letter, index) => (
          <span
            style={{ marginRight: "2rem", fontWeight: "50rem" }}
            key={index}
          >
            {letter}
          </span>
        ))}

        <span
          style={{
            fontWeight: "200",
            fontSize: "3rem",
            position: "absolute",
            top: "80%",
            left: "20%",
          }}
        >
          For Unique Style
        </span>
      </div>
    </div>
  );
};

export default BackgroundVideo;

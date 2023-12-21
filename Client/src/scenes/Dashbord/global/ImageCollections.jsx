import React, { useState } from "react";

const ImageCollection = () => {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    // gap: "3rem",
  };

  const imageContainerStyle = {
    width: "45%",
    height: "700px",
    position: "relative",
    boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.3)",
  };

  const initialButtonStyle = {
    position: "absolute",
    bottom: "20px",
    left: "40%",
    padding: "8px",
    backgroundColor: "black",
    borderRadius: "0px",
    transition: "transform 0.3s ease",
    zIndex: 1, // Ensure the buttons stay on top
    width: "140px",
    display: "flex",
    justifyContent: "center",
    fontSize: "20px",
    fontFamily: "Gruppo, sans-serif",
    fontWeight: 700,
    color: "white",
  };

  const [button1Style, setButton1Style] = useState(initialButtonStyle);
  const [button2Style, setButton2Style] = useState(initialButtonStyle);
  const [button3Style, setButton3Style] = useState(initialButtonStyle);

  const [hoveredButton, setHoveredButton] = useState(null);

  const handleHover1 = () => {
    setButton1Style({
      ...initialButtonStyle,
      backgroundColor: "rgba(128, 128, 128, 0.7)",
      color: "black",
    });
    setButton2Style(initialButtonStyle);
    setButton3Style(initialButtonStyle);
    setHoveredButton("MEN");
  };

  const handleLeave1 = () => {
    setButton1Style(initialButtonStyle);
    setHoveredButton(null);
  };

  const handleHover2 = () => {
    setButton2Style({
      ...initialButtonStyle,
      backgroundColor: "rgba(128, 128, 128, 0.7)",
      color: "black",
    });
    setButton1Style(initialButtonStyle);
    setButton3Style(initialButtonStyle);
    setHoveredButton("WOMEN");
  };

  const handleLeave2 = () => {
    setButton2Style(initialButtonStyle);
    setHoveredButton(null);
  };

  const handleHover3 = () => {
    setButton3Style({
      ...initialButtonStyle,
      backgroundColor: "rgba(128, 128, 128, 0.7)",
      color: "black",
    });
    setButton1Style(initialButtonStyle);
    setButton2Style(initialButtonStyle);
    setHoveredButton("KIDS");
  };

  const handleLeave3 = () => {
    setButton3Style(initialButtonStyle);
    setHoveredButton(null);
  };

  // ... (rest of the component remains the same)

  // ... (rest of the component remains the same)

  const getOverlayStyle = (buttonName) => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor:
      hoveredButton && hoveredButton !== buttonName
        ? "rgba(255, 255, 255, 0.3)"
        : "transparent", // Decreased opacity to 0.3
    zIndex: 0, // Place the overlay behind the button
    transition: "background-color 0.3s ease", // Add transition property
  });

  // ... (rest of the component remains the same)

  // ... (rest of the component remains the same)

  return (
    <>
      <div style={containerStyle}>
        <div style={imageContainerStyle}>
          <div
            style={{
              backgroundImage:
                'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)) , url("https://lnkobrand.com/cdn/shop/files/Capture_d_ecran_2023-08-22_a_13.08.03.png?v=1692706687&width=1000")',
              backgroundSize: "cover",
              height: "100%", // Set the desired height
              position: "relative",
            }}
          >
            <div style={getOverlayStyle("MEN")} />
          </div>
          <button
            style={button1Style}
            onMouseEnter={handleHover1}
            onMouseLeave={handleLeave1}
          >
            MEN
          </button>
        </div>

        <div style={imageContainerStyle}>
          <div
            style={{
              backgroundImage:
                'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url("https://lnkobrand.com/cdn/shop/files/Capture_d_ecran_2023-08-22_a_13.06.58.png?v=1692706693&width=700")',
              backgroundSize: "cover",
              height: "100%", // Set the desired height
              position: "relative",
            }}
          >
            <div style={getOverlayStyle("WOMEN")} />
          </div>
          <button
            style={button2Style}
            onMouseEnter={handleHover2}
            onMouseLeave={handleLeave2}
          >
            WOMEN
          </button>
        </div>

        <div style={imageContainerStyle}>
          <div
            style={{
              backgroundImage:
                'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("https://media.sunglasshut.com/cms/resource/image/742974/landscape_ratio960x626/1920/1252/8ba535740592a968c531f7a1f6f71866/882AB07D735E9EC42355A60800994CBA/sgh-plp-1.jpg")',
              backgroundSize: "cover",
              height: "100%", // Set the desired height
              position: "relative",
            }}
          >
            <div style={getOverlayStyle("KIDS")} />
          </div>
          <button
            style={button3Style}
            onMouseEnter={handleHover3}
            onMouseLeave={handleLeave3}
          >
            KIDS
          </button>
        </div>
      </div>
    </>
  );
};

export default ImageCollection;

import React, { useContext, useState } from "react";
import "../style/signUp.css"; // Create a CSS file for styling
import { CartContext } from "../../../../contexts/CartContext";

const ImageSignup = () => {
  const { openCart, setOpenCart } = useContext(CartContext);
  const initialButtonStyle = {
    position: "absolute",
    bottom: "90px",
    left: "7.7%",
    padding: "3px",
    backgroundColor: "white",

    borderRadius: "0px",
    transition: "transform 0.3s ease",
    zIndex: 1, // Ensure the buttons stay on top
    width: "200px",
    display: "flex",
    justifyContent: "center",
    fontSize: "20px",
    fontFamily: "Gruppo, sans-serif",
    fontWeight: 800,
    color: "black",
  };
  const [button1Style, setButton1Style] = useState(initialButtonStyle);

  const handleHover1 = () => {
    setButton1Style({
      ...initialButtonStyle,

      backgroundColor: "rgba(128, 128, 128, 0.7)",
      color: "black",
    });
  };
  const handleLeave1 = () => {
    setButton1Style(initialButtonStyle);
  };

  return (
    <div className="background-container">
      <div className="content">
        <label>
          Order now and get <br />
          30% discount
        </label>
        <p>
          <button
            style={button1Style}
            onMouseEnter={handleHover1}
            onMouseLeave={handleLeave1}
            onClick={() => setOpenCart(true)}
          >
            Order Now
          </button>
        </p>
      </div>
    </div>
  );
};

export default ImageSignup;

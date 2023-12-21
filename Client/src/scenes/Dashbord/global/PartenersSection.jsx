import React from "react";

const PartnersSection = () => {
  // Replace these URLs with the actual URLs of your partner logos
  const partnerLogos = [
    "https://1000logos.net/wp-content/uploads/2021/05/Vogue-logo-768x432.png",
    "https://logos-world.net/wp-content/uploads/2020/04/Ralph-Lauren-Symbol.png",
    "https://logos-world.net/wp-content/uploads/2020/09/Oakley-Logo.png",
    "https://peeperseyecare.co.uk/wp-content/uploads/sites/13/2017/07/rayban-logo.png",
  ];

  const partnersStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "30px",
  };

  const logoContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "90%",

    padding: "50px",
  };

  const logoStyle = {
    width: "200px", // Adjust the size of the logos as needed
    height: "200px",
    margin: "10px",
    // Add other styles as needed
  };

  return (
    <div style={partnersStyle}>
      <div style={logoContainerStyle}>
        {partnerLogos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`Partner Logo ${index + 1}`}
            style={logoStyle}
          />
        ))}
      </div>
    </div>
  );
};

export default PartnersSection;

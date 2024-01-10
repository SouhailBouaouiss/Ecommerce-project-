import React from "react";

const Footer = () => {
  const footerStyle = {
    display: "flex",
    justifyContent: "space-around",

    color: "black",
    padding: "70px",
  };

  const sectionStyle = {
    flex: 1,
  };

  const headingStyle = {
    fontSize: "1.6rem",
    marginBottom: "8px",
    color: "black",
    fontFamily: "Gruppo', sans-serif",
    textTransform: "uppercase",
    fontWeight: 700,
  };

  const linkStyle = {
    color: "black",
    textDecoration: "none",
    marginBottom: "5px",
    color: "gray",
  };

  const newsletterStyle = {
    flex: 1,
    textAlign: "right",
  };

  const newsletterInputStyle = {
    width: "20rem",
    padding: "8px",
  };

  const subscribeButtonStyle = {
    padding: "8px",
    backgroundColor: "black",
    color: "white",
    border: "none",
    cursor: "pointer",
  };

  return (
    <div className="container mx-auto">
      <footer style={footerStyle}>
        <div style={sectionStyle}>
          <h3 style={headingStyle}>About Us</h3>
          {/* Add your About Us content here */}
          <p>Our team is always happy to hear from you</p>
          <span>(+212) 661-547890</span>
          <p className="mt-5">contact@sunstyle.com</p>
          <p className="mt-5">SUNSTYLE</p>
          <div>
            <img
              src="https://worldofprintables.com/wp-content/uploads/2020/12/Social-Icons-01-Free-SVG.png.webp"
              alt=""
              style={{ height: "100px" }}
            />
          </div>
        </div>
        <div style={sectionStyle}>
          <h3 style={{ ...headingStyle, textAlign: "center" }}>Quick Links</h3>
          <div
            className="flex pl-3 text-center"
            style={{ flexDirection: "column" }}
          >
            <a href="#" style={linkStyle}>
              Orders and Shipping
            </a>
            <a href="#" style={linkStyle}>
              Contact us
            </a>
            <a href="#" style={linkStyle}>
              How to choose the prefect sunglasses for you!
            </a>
          </div>
          {/* Add more links as needed */}
        </div>
        <div style={newsletterStyle}>
          <h3 style={headingStyle}>Newsletter</h3>
          <p className="my-2">We send wonderfull emails, subscribe now 😍</p>
          <div className="flex justify-end ms-20 mt-5">
            <input
              type="email"
              placeholder="Enter your email"
              style={newsletterInputStyle}
            />
            <button style={subscribeButtonStyle}>OK</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

import React from "react";

const Footer = () => {
  const footerStyle = {
    display: "flex",
    justifyContent: "space-around",

    color: "black",
    padding: "20px",
  };

  const sectionStyle = {
    flex: 1,
    textAlign: "center",
  };

  const headingStyle = {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "8px",
    color: "black",
    fontFamily: "Gruppo', sans-serif",
    fontFamily: "Kanit, sans-serif",
    fontWeight: "2rem",
  };

  const linkStyle = {
    color: "black",
    textDecoration: "none",
    display: "block",
    marginBottom: "5px",
  };

  const newsletterStyle = {
    flex: 1,
    textAlign: "center",
  };

  const newsletterInputStyle = {
    width: "70%",
    padding: "8px",
    marginRight: "10px",
  };

  const subscribeButtonStyle = {
    padding: "8px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
  };

  return (
    <footer style={footerStyle}>
      <div style={sectionStyle}>
        <h3 style={headingStyle}>About Us</h3>
        {/* Add your About Us content here */}
        <p>Our team is always happy to hear from you</p>
        <span>(+212) 661-547890</span>

        <p className="mt-5">contact@sunstyle.com</p>
        <p className="mt-5">SUNSTYLE</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src="https://worldofprintables.com/wp-content/uploads/2020/12/Social-Icons-01-Free-SVG.png.webp"
            alt=""
            style={{ height: "100px" }}
          />
        </div>
      </div>
      <div style={sectionStyle}>
        <h3 style={headingStyle}>Quick Links</h3>
        <a href="#" style={linkStyle}>
          Link 1
        </a>
        <a href="#" style={linkStyle}>
          Link 2
        </a>
        <a href="#" style={linkStyle}>
          Link 3
        </a>
        {/* Add more links as needed */}
      </div>
      <div style={newsletterStyle}>
        <h3 style={headingStyle}>Newsletter</h3>
        <input
          type="email"
          placeholder="Enter your email"
          style={newsletterInputStyle}
        />
        <button style={subscribeButtonStyle}>Subscribe</button>
      </div>
    </footer>
  );
};

export default Footer;

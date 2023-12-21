import React from "react";
import UpBar from "../scenes/Dashbord/global/UpBar";
import BackgroundVideo from "../scenes/Dashbord/global/BackgroundVideo";
import ImageCollection from "../scenes/Dashbord/global/ImageCollections";
import ImageProducts from "../scenes/Dashbord/global/ImageProducts";
import ImageSignup from "../scenes/Dashbord/global/ImageSignup";
import PartnersSection from "../scenes/Dashbord/global/PartenersSection";
import Footer from "../scenes/Dashbord/global/Footer";

function LandingPage() {
  return (
    <>
      <UpBar />
      <BackgroundVideo />
      <div className="mt-20 w-full">
        <ImageCollection />
      </div>
      <div className="mt-20 w-full">
        <ImageProducts />
      </div>
      <div className="mt-20 w-full">
        <ImageSignup />
      </div>
      <div className="mt-20 w-full" style={{ backgroundColor: "#F2F2F2F2" }}>
        <PartnersSection />
      </div>
      <div className="mt-20 w-full" style={{ backgroundColor: "#F2F2F2F2" }}>
        <Footer />
      </div>
    </>
  );
}

export default LandingPage;

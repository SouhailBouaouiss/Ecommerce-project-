import React, { useContext } from "react";

import BackgroundVideo from "../scenes/Dashbord/global/ShopFront/BackgroundVideo";
import ImageCollection from "../scenes/Dashbord/global/ShopFront/ImageCollections";
import ImageProducts from "../scenes/Dashbord/global/ShopFront/ImageProducts";
import ImageSignup from "../scenes/Dashbord/global/ShopFront/ImageSignup";
import PartnersSection from "../scenes/Dashbord/global/ShopFront/PartenersSection";
import Footer from "../scenes/Dashbord/global/ShopFront/Footer";

function LandingPage() {
  return (
    <>
      <BackgroundVideo />
      <div className="mt-20 w-full">
        <ImageCollection />
      </div>
      <div className="mt-20 w-full">
        <ImageProducts />
      </div>
      <div className=" w-full" style={{ backgroundColor: "#F2F2F2F2" }}>
        <PartnersSection />
      </div>
      <div className=" w-full">
        <ImageSignup />
      </div>

      <div className=" w-full" style={{ backgroundColor: "#F2F2F2F2" }}>
        <Footer />
      </div>
    </>
  );
}

export default LandingPage;

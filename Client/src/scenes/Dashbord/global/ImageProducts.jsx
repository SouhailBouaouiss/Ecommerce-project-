import React, { useState } from "react";

const ProductCard = ({ name, price, initialImage, hoverImage }) => {
  const [image, setImage] = useState(initialImage);

  const cardStyle = {
    position: "relative",
    width: "340px",
    margin: "16px",
  };

  const imageStyle = {
    width: "100%",
    height: "350px",
    objectFit: "cover",
    marginBottom: "8px",
    borderRadius: "4px",
    boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.3)",
    transition: "filter 0.9s ease", // Change to filter property
    filter: image === hoverImage ? "brightness(90%)" : "brightness(100%)", // Adjust the filter value
  };
  const buttonStyle = {
    position: "absolute",
    bottom: "80px",
    right: "8px",
    backgroundColor: "white",
    padding: "5px",
    border: "solid 0.3px",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "1.5rem",
    height: "2rem",
    width: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
  };

  const handleHover = () => {
    setImage(hoverImage);
  };

  const handleLeave = () => {
    setImage(initialImage);
  };

  return (
    <div style={cardStyle}>
      <img
        src={image}
        alt={name}
        style={imageStyle}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      />
      <button style={buttonStyle}>+</button>
      <h3>{name}</h3>
      <span>{`$${price}`}</span>
    </div>
  );
};

const ImageProducts = () => {
  const productListStyle = {
    display: "flex",
    justifyContent: "center",
  };

  return (
    <>
      <strong>
        <h6
          style={{
            textAlign: "center",
            fontSize: "2rem",
            marginBottom: "8px",
            color: "black",
            fontFamily: "Gruppo', sans-serif",
            fontFamily: "Kanit, sans-serif",
            fontWeight: "1rem",
          }}
        >
          NEW ARRIVALS
        </h6>
      </strong>

      <div style={productListStyle}>
        <ProductCard
          name="Product 1"
          price={19.99}
          initialImage="https://lnkobrand.com/cdn/shop/files/cristal-palace-lunettes-de-vue-et-lunettes-de-soleil-au-39717306302720.jpg?v=1702638268&width=1080"
          hoverImage="https://lnkobrand.com/cdn/shop/files/cristal-palace-lunettes-de-vue-et-lunettes-de-soleil-au-39717306433792.jpg?v=1702638272&width=1080"
        />
        <ProductCard
          name="Product 2"
          price={29.99}
          initialImage="https://lnkobrand.com/cdn/shop/files/everton-lunettes-de-vue-et-lunettes-de-soleil-au-39717298503936.jpg?v=1702638087&width=1080"
          hoverImage="https://lnkobrand.com/cdn/shop/files/everton-lunettes-de-vue-et-lunettes-de-soleil-au-39717298438400.jpg?v=1702638091&width=1080"
        />
        <ProductCard
          name="Product 3"
          price={39.99}
          initialImage="https://lnkobrand.com/cdn/shop/files/seameet-lunettes-de-vue-et-lunettes-de-soleil-au-39500005441792.jpg?v=1699435529&width=1080"
          hoverImage="https://lnkobrand.com/cdn/shop/files/seameet-lunettes-de-vue-et-lunettes-de-soleil-au-39500005769472.jpg?v=1699435543&width=1080"
        />
        <ProductCard
          name="Product 4"
          price={49.99}
          initialImage="https://lnkobrand.com/cdn/shop/files/celeste-lunettes-de-vue-et-lunettes-de-soleil-au-39400802222336.jpg?v=1697751813&width=1080"
          hoverImage="https://lnkobrand.com/cdn/shop/files/celeste-lunettes-de-vue-et-lunettes-de-soleil-au-39400802353408.jpg?v=1697751810&width=1080"
        />
      </div>
      <div
        className="mt-5 flex justify-center "
        style={{
          color: "black",
          fontSize: "16px",
          textDecoration: "underline",
          fontFamily: "Gruppo, Kanit, Montserrat, sans-serif",
          wordSpacing: "0.3rem",
        }}
      >
        <a href="">SEE ALL COLLECTIONS</a>
      </div>
    </>
  );
};

export default ImageProducts;

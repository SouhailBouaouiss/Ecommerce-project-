import React, { useContext, useState } from "react";
import { CartContext } from "../../../../contexts/CartContext";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../../../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ name, price, initialImage, hoverImage, id }) => {
  const [image, setImage] = useState(initialImage);
  const { openCart, setOpenCart } = useContext(CartContext);
  const navigate = useNavigate();

  const cardStyle = {
    position: "relative",
    width: "340px",
    margin: "16px",
    color: "black",
    fontFamily: "Karla, sans-serif",
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
  const dispatch = useDispatch();
  const handleAddProduct = () => {
    dispatch(addProductToCart({ name, price, imgUrl: initialImage, id }));
    setOpenCart(true);
  };

  return (
    <div style={cardStyle}>
      <img
        src={image}
        alt={name}
        style={imageStyle}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        onClick={() => {
          navigate(`/product/${id}`);
        }}
      />
      <button style={buttonStyle} onClick={handleAddProduct}>
        +
      </button>
      <h3>{name}</h3>
      <span style={{ color: "green" }}>{`$${price}`}</span>
    </div>
  );
};

const ImageProducts = () => {
  const productListStyle = {
    display: "flex",
    justifyContent: "center",
    color: "black",
    fontFamily: "Karla, sans-serif",
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
            fontWeight: "1rem",
          }}
        >
          NEW ARRIVALS
        </h6>
      </strong>

      <div style={productListStyle}>
        <ProductCard
          name="Unbranded Plastic Sausages"
          price={57.0}
          id="659ffdad1b7ac08fbb8ea62f"
          initialImage="https://lnkobrand.com/cdn/shop/files/seameet-lunettes-de-vue-et-lunettes-de-soleil-au-39500005441792.jpg?v=1699435529&width=1080"
          hoverImage="https://lnkobrand.com/cdn/shop/files/seameet-lunettes-de-vue-et-lunettes-de-soleil-au-39500005441792.jpg?v=1699435529&width=1080"
        />
        <ProductCard
          name="Practical Concrete Pants"
          price={44.0}
          id="659ffdad1b7ac08fbb8ea637"
          initialImage="https://lnkobrand.com/cdn/shop/files/sleekcoast-lunettes-de-vue-et-lunettes-de-soleil-au-39753067168000.jpg?v=1703155408&width=1080"
          hoverImage="https://lnkobrand.com/cdn/shop/files/sleekcoast-lunettes-de-vue-et-lunettes-de-soleil-au-39753067168000.jpg?v=1703155408&width=1080"
        />
        <ProductCard
          name="Awesome Wooden Bike"
          price={75.0}
          id="659ffdad1b7ac08fbb8ea632"
          initialImage="https://lnkobrand.com/cdn/shop/files/cristal-palace-lunettes-de-vue-et-lunettes-de-soleil-au-39717306302720.jpg?v=1702638268&width=1080"
          hoverImage="https://lnkobrand.com/cdn/shop/files/cristal-palace-lunettes-de-vue-et-lunettes-de-soleil-au-39717306302720.jpg?v=1702638268&width=1080"
        />
        <ProductCard
          name="Incredible Cotton Car"
          price={19.0}
          id="659ffdad1b7ac08fbb8ea63b"
          initialImage="https://lnkobrand.com/cdn/shop/files/tarnstead-lunettes-de-vue-et-lunettes-de-soleil-au-39752887271680.jpg?v=1703153434&width=1080"
          hoverImage="https://lnkobrand.com/cdn/shop/files/tarnstead-lunettes-de-vue-et-lunettes-de-soleil-au-39752887271680.jpg?v=1703153434&width=1080"
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
export { ProductCard };

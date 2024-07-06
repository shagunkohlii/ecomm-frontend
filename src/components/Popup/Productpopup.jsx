import React, { useContext } from "react";
import "../Popup/Productpopup.css";
import { ShopContext } from "../../Context/ShopContext";

const Productpopup = ({ onClose, product }) => {
  const { addToCart, showPopup } = useContext(ShopContext);
  if (!product) return null;
  // console.log(product);
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark">x</i>
        </button>
        <div className="popup-content d-flex flex-column justify-content-between gap-4">
          <img
            src={product.image}
            alt={product.productName}
            className="productpopup-image"
          />
          <h2>{product.productName}</h2>
          <p className="product-description">{product.description}</p>
          <div className="product-price">Price: ${product.price}</div>
          <p className="product-category">Category: {product.category}</p>
          <button
            className="buy-now-btn"
            onClick={() => {
              addToCart(product._id);
              window.location.replace("/Cart")
            }}
          >
            Buy Now
          </button>
          {showPopup && <div className="popup">Successfully Order</div>}

          <button
            className="add-to-cart-btn"
            onClick={() => addToCart(product._id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Productpopup;

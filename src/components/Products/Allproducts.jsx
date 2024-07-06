import React, { useContext, useState } from "react";
import "./Allproducts.css";
import Productpopup from "../Popup/Productpopup";
import { ShopContext } from "../../Context/ShopContext";

const Allproducts = () => {
  const {
    // products,
    filteredProducts,
    filterProducts,
    activeCategory,
    addToCart,
    showPopup,
    popupMessage,
    showPopupWithMessage,
  } = useContext(ShopContext);

  // console.log(products);
  const [popup, setPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handlePopup = (product) => {
    setSelectedProduct(product);
    setPopup(!popup);
  };

  const handleAddToCart = () => {
    showPopupWithMessage("Successfully Added to Cart");
  };

  return (
    <div>
      <div className="category-buttons">
        <button
          onClick={() => filterProducts("all")}
          className={activeCategory === "all" ? "active" : ""}
        >
          All
        </button>
        <button
          onClick={() => filterProducts("MEN")}
          className={activeCategory === "men" ? "active" : ""}
        >
          Men
        </button>
        <button
          onClick={() => filterProducts("WOMEN")}
          className={activeCategory === "women" ? "active" : ""}
        >
          Women
        </button>
        <button
          onClick={() => filterProducts("KIDS")}
          className={activeCategory === "kids" ? "active" : ""}
        >
          Kids
        </button>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product._id} className="product-card">
            <img
              src={product.image}
              alt={product.productName}
              className="product-image"
              onClick={() => handlePopup(product)}
            />
            <div className="product-info">
              <h2 className="product-name">{product.productName}</h2>
              <div className="product-price">${product.price}</div>
              <p className="product-description">{product.description}</p>
              <button
                className="buy-now-btn"
                onClick={() => {
                  addToCart(product._id);
                  window.location.replace("/Cart");
                }}
              >
                Buy Now
              </button>
              <button
                className="add-to-cart-btn"
                onClick={() => {
                  handleAddToCart();
                  addToCart(product._id); // Pass the item.id here
                }}
              >
                Add to Cart
              </button>
              {showPopup && <div className="popup">{popupMessage}</div>}
            </div>
          </div>
        ))}
      </div>

      {popup && selectedProduct ? (
        <Productpopup
          onClose={() => handlePopup(null)}
          product={selectedProduct}
        />
      ) : null}
    </div>
  );
};

export default Allproducts;

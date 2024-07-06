import React, { useContext, useEffect } from "react";
import "./Cart.css";
import { ShopContext } from "../../Context/ShopContext";
// import toast from "react-hot-toast"
const Cart = () => {
  const { cartItems, updateQuantity, addToCart, removeItem, removeFromCart } =
    useContext(ShopContext);
  console.log(cartItems);

  const authUser = localStorage.getItem("token") || null;
  console.log(authUser);

  useEffect(() => {
    console.log("Cart Items:", cartItems);
    console.log("Cart Items Type:", typeof cartItems);
    if (typeof cartItems === "object") {
      console.log("Cart Items Keys:", Object.keys(cartItems));
    }
  }, [cartItems]);

  // Convert cartItems to array if it's an object
  const cartItemsArray = Array.isArray(cartItems)
    ? cartItems
    : Object.entries(cartItems).map(([id, quantity]) => ({
        _id: id,
        quantity,
      }));

  console.log("Cart Items Array:", cartItemsArray);

  const calculateTotal = () => {
    return cartItemsArray.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  };

  const total = calculateTotal();

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cartItemsArray.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItemsArray.map((item) => {
            console.log(item);
            return (
              <div key={item._id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.productName}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h2>{item.productName}</h2>
                  <p>Price: ${item.price}</p>
                  <div className="cart-item-actions">
                    <button onClick={() => addToCart(item._id)}>+</button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item._id, parseInt(e.target.value))
                      }
                      className="no-spinner"
                    />
                    <button onClick={() => removeFromCart(item._id)}>-</button>

                    <button onClick={() => removeItem(item._id)}>Remove</button>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="cart-summary">
            <h2>Total: ${total}</h2>
            <button className="checkout-button">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

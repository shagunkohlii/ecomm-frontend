import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ShopContext = createContext(null);

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [cartItems, setCartItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const removeItem = async (itemId) => {
    const token = localStorage.getItem("token");
    if (!token) return { success: false, message: "User not authenticated" };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/cart/removeItem`,
        { itemId },
        { headers: { token } }
      );

      if (response.data.success) {
        // Instead of updating the state directly, fetch the updated cart data
        await fetchUserCart();
        return { success: true, message: "Item removed from cart" };
      }
      throw new Error("Failed to remove item from cart");
    } catch (error) {
      console.error("Error removing item from cart:", error);
      return { success: false, message: error.message };
    }
  };

  const fetchUserCart = async () => {
    setIsLoading(true);
    setError(null);
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoading(false);
      setError("User not authenticated");
      return { success: false, message: "User not authenticated" };
    }

    try {
      const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/cart/getUserCart`,
        {
          headers: {
            token: token,
          },
        }
      );

      setCartItems(response.data.cartData);
      setIsLoading(false);
      return { success: true, cartData: response.data.cartData };
    } catch (error) {
      console.error("Error fetching user cart:", error);
      setError("Failed to fetch cart data");
      setIsLoading(false);
      return { success: false, message: "Failed to fetch cart data" };
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchUserCart();
    }
  }, []);

  const filterProducts = (category) => {
    setActiveCategory(category);
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = Array.isArray(prev) ? [...prev] : [];
      const existingItem = updatedCart.find((item) => item._id === itemId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        updatedCart.push({ _id: itemId, quantity: 1 });
      }

      console.log(updatedCart, itemId);
      return updatedCart;
    });

    if (localStorage.getItem("token")) {
      fetch(`${process.env.REACT_APP_BASE_URL}/api/cart/addToCart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          token: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      })
        .then((res) => res.json())
        .then((data) => {
          // Update the cart items based on the server response
          console.log(data.cartData);
          setCartItems(data.cartData);
        })
        .catch((error) => console.error("Error adding to cart:", error));
    }
  };

  const removeFromCart = async (itemId) => {
    if (localStorage.getItem("token")) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/cart/removeFromCart`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              token: localStorage.getItem("token"),
            },
            body: JSON.stringify({ itemId }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          // Update the local cart state
          setCartItems((prevItems) => {
            return prevItems
              .map((item) => {
                if (item._id === itemId) {
                  return {
                    ...item,
                    quantity: item.quantity > 1 ? item.quantity - 1 : 0,
                  };
                }
                return item;
              })
              .filter((item) => item.quantity > 0);
          });
        } else {
          console.error("Failed to remove from cart:", data.error);
        }
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    }
  };

  const updateQuantity = (itemId, quantity) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: quantity,
    }));
  };

  const showPopupWithMessage = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log(process.env.REACT_APP_BASE_URL)
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/product/getproducts`
        );
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // const getTotalCartItems = () => {
  //   let totalItem = 0;
  //   for (const item in cartItems) {
  //     if (cartItems[item] > 0) {
  //       totalItem += cartItems[item];
  //     }
  //   }
  //   console.log(totalItem);
  //   return totalItem;
  // };

  return (
    <ShopContext.Provider
      value={{
        removeFromCart,
        updateQuantity,
        addToCart,
        filterProducts,
        products,
        filteredProducts,
        activeCategory,
        cartItems,
        // total,
        showPopup,
        popupMessage,
        showPopupWithMessage,
        isLoading,
        error,
        fetchUserCart,
        removeItem,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

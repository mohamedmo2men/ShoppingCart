import React, { createContext, useContext, useEffect, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";

const ShoppingCartContext = createContext({});
const initialCartItems = localStorage.getItem("shopping-cart")
  ? JSON.parse(localStorage.getItem("shopping-cart"))
  : [];

const ShoppingCartProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [cartItems, setCartItems] = useState(initialCartItems);

  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => {
    setOpen(true);
  };

  const closeCart = () => {
    setOpen(false);
  };

  const ItemQuantity = (id) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const increaseQuantity = (id) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) === undefined) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseQuantity = (id) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeItemCart = (id) => {
    setCartItems((currItems) => currItems.filter((item) => item.id !== id));
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        ItemQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeItemCart,
        openCart,
        closeCart,
        cartQuantity,
        cartItems,
      }}
    >
      {children}
      <ShoppingCart open={open} />
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};
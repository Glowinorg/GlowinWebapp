import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("glowin_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  /* 🔁 SAVE TO LOCAL STORAGE */
  useEffect(() => {
    localStorage.setItem("glowin_cart", JSON.stringify(cart));
  }, [cart]);

  /* ➕ ADD TO CART */
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  /* ❌ REMOVE ITEM */
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  /* 🔢 UPDATE QUANTITY */
  const updateQty = (id, qty) => {
    if (qty < 1) return;

    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty } : item
      )
    );
  };

  /* 🧹 CLEAR CART */
  const clearCart = () => setCart([]);

  /* 💰 CALCULATIONS */
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        subtotal,
        gst,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/* 🪝 CUSTOM HOOK */
export const useCartContext = () => {
  return useContext(CartContext);
};

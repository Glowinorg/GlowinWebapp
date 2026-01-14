import { createContext, useContext, useEffect, useState } from "react";

/* CONTEXT */
const WishlistContext = createContext(null);

/* PROVIDER */
export const WishlistProvider = ({ children }) => {
  // ✅ store ONLY product IDs
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const saved = localStorage.getItem("glowin_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error("Wishlist load error:", err);
      return [];
    }
  });

  /* SAVE TO LOCALSTORAGE */
  useEffect(() => {
    localStorage.setItem(
      "glowin_wishlist",
      JSON.stringify(wishlistIds)
    );
  }, [wishlistIds]);

  /* ADD / REMOVE (TOGGLE) */
  const toggleWishlist = (product) => {
    if (!product?.id) return;

    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);

      if (exists) {
        return prev.filter((id) => id !== product.id);
      }

      return [...prev, product.id];
    });
  };

  /* REMOVE ONLY */
  const removeFromWishlist = (id) => {
    if (!id) return;
    setWishlistIds((prev) => prev.filter((pid) => pid !== id));
  };

  /* CHECK */
  const isInWishlist = (id) => {
    return wishlistIds.includes(id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        toggleWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

/* HOOK */
export const useWishlistContext = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error(
      "useWishlistContext must be used inside WishlistProvider"
    );
  }
  return context;
};

import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import ProductDetails from "./pages/ProductDetails";
import ProfilePage from "./pages/ProfilePage"; // ✅ ADDED

import CartSidebar from "./modals/CartSidebar";
import CheckoutModal from "./modals/CheckoutModal";
import AuthModal from "./modals/AuthModal";

function App() {
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [category, setCategory] = useState("All");

  /* ✅ Listen for "open-cart" event */
  useEffect(() => {
    const openCartListener = () => setShowCart(true);
    window.addEventListener("open-cart", openCartListener);

    return () => {
      window.removeEventListener("open-cart", openCartListener);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-bg font-body">
      {/* NAVBAR */}
      <Navbar
        openCart={() => setShowCart(true)}
        openAuth={() => setShowAuth(true)}
        onSearch={setSearchText}
        onSort={setSortOrder}
        onCategory={setCategory}
      />

      {/* ROUTES */}
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                openCheckout={() => setShowCheckout(true)}
                searchText={searchText}
                sortOrder={sortOrder}
                category={category}
              />
            }
          />

          <Route path="/wishlist" element={<Wishlist />} />

          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          {/* ✅ PROFILE PAGE ROUTE */}
          <Route
            path="/profile"
            element={<ProfilePage />}
          />
        </Routes>
      </main>

      {/* FOOTER */}
      <Footer />

      {/* 🛒 CART SIDEBAR */}
      <CartSidebar
        isOpen={showCart}
        onClose={() => setShowCart(false)}
      />

      {/* 💳 CHECKOUT MODAL */}
      {showCheckout && (
        <CheckoutModal close={() => setShowCheckout(false)} />
      )}

      {/* 👤 AUTH MODAL */}
      {showAuth && (
        <AuthModal close={() => setShowAuth(false)} />
      )}
    </div>
  );
}

export default App;

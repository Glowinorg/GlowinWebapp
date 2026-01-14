import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import products from "../data/products";

const Home = ({ searchText, sortOrder, category }) => {
  const navigate = useNavigate();

  /* ✅ HANDLE PRODUCT CLICK */
  const openDetail = (product) => {
    if (!product || !product.id) return;
    navigate(`/product/${product.id}`);
  };

  /* 🔍 FILTER + SORT PRODUCTS (LOGIC ONLY) */
  let filteredProducts = [...products];

  // SEARCH
  if (searchText.trim()) {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  // CATEGORY
  if (category && category !== "All") {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === category
    );
  }

  // SORT
  if (sortOrder === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sortOrder === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO SECTION (UNCHANGED) */}
      <Hero />

      {/* PRODUCTS GRID (UNCHANGED LOOK) */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <ProductGrid
          products={filteredProducts} // ✅ ONLY CHANGE
          openDetail={openDetail}
        />
      </div>
    </div>
  );
};

export default Home;

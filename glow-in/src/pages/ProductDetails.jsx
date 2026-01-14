import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useCartContext } from "../context/CartContext";
import { useWishlistContext } from "../context/WishlistContext";
import products from "../data/products"; // ✅ your products data

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { cart } = useCartContext();
  const { toggleWishlist, isInWishlist } = useWishlistContext();

  const from = location.state?.from || "home";
  const product = products.find((p) => String(p.id) === String(id));

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500 text-lg">Product not found</p>
    </div>
  );

  const isInCart = cart.some((item) => item.id === product.id);

  const handleBack = () => {
    if (from === "cart") {
      navigate(-1);
      setTimeout(() => window.dispatchEvent(new Event("open-cart")), 50); // reopen cart
    } else if (from === "wishlist") {
      navigate("/wishlist");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-6 grid md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[450px] object-cover rounded-xl"
          />
          <button
            onClick={() => toggleWishlist(product)}
            className="absolute top-4 right-4 bg-white p-3 rounded-full shadow"
          >
            <Heart
              size={22}
              className={isInWishlist(product.id) ? "fill-pink-600 text-pink-600" : "text-gray-400"}
            />
          </button>
        </div>

        {/* DETAILS */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-500 mt-2">Category: {product.category}</p>
          <p className="text-pink-600 text-2xl font-bold mt-4">₹{Number(product.price).toLocaleString()}</p>

          {product.description && (
            <p className="text-gray-700 mt-6 leading-relaxed">{product.description}</p>
          )}

          {isInCart && (
            <p className="mt-4 text-green-600 font-semibold">✔ Already added to cart</p>
          )}

          <button
            onClick={handleBack}
            className="mt-8 px-6 py-3 border rounded-full hover:bg-gray-100 transition"
          >
            {from === "cart" ? "Back to Cart" : from === "wishlist" ? "Back to Wishlist" : "Back to Home"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

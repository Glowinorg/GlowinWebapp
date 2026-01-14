import { Heart, ShoppingCart, Eye, Zap } from "lucide-react";
import { useCartContext } from "../context/CartContext";
import { useWishlistContext } from "../context/WishlistContext";

const ProductCard = ({ product, openDetail }) => {
  const { addToCart } = useCartContext();
  const { toggleWishlist, isInWishlist } = useWishlistContext();

  if (!product) return null;

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden relative">

      {/* IMAGE */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover cursor-pointer group-hover:scale-110 transition duration-500"
          onClick={() => openDetail?.(product)}
        />

        {/* HOVER ACTIONS */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">

          {/* VIEW */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              openDetail?.(product);
            }}
            className="bg-white p-3 rounded-full hover:bg-pink-600 hover:text-white transition"
          >
            <Eye size={18} />
          </button>

          {/* ADD TO CART */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="bg-white p-3 rounded-full hover:bg-pink-600 hover:text-white transition"
          >
            <ShoppingCart size={18} />
          </button>

          {/* BUY NOW (optional logic later) */}
          <button
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-3 rounded-full hover:bg-pink-600 hover:text-white transition"
          >
            <Zap size={18} />
          </button>
        </div>

        {/* WISHLIST */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:scale-110 transition z-20"
        >
          <Heart
            size={18}
            className={
              isInWishlist(product.id)
                ? "fill-pink-600 text-pink-600"
                : "text-gray-400"
            }
          />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-4 text-center">
        <h3 className="font-semibold text-sm text-gray-800 truncate">
          {product.name}
        </h3>

        <p className="text-pink-600 font-bold text-lg mt-2">
          ₹{Number(product.price || 0).toLocaleString()}
        </p>

        {/* ADD TO CART BUTTON */}
        <button
          onClick={() => addToCart(product)}
          className="mt-4 w-full bg-pink-600 text-white py-2 rounded-full text-sm font-medium hover:bg-pink-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

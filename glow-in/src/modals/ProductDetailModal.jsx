import { useState, useEffect } from "react";
import { X, Heart, Trash2 } from "lucide-react";
import { useCartContext } from "../context/CartContext";
import { useWishlistContext } from "../context/WishlistContext";

const ProductDetailModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCartContext();
  const { toggleWishlist, isInWishlist } = useWishlistContext();

  const [ratingInput, setRatingInput] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setRatingInput(0);
      setReviewText("");
    }
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    if (product.stock <= 0) return;
    addToCart(product);
    onClose();
  };

  const handlePostReview = () => {
    if (!reviewText.trim() || ratingInput === 0) return;

    const newReview = {
      id: Date.now(),
      rating: ratingInput,
      text: reviewText,
    };

    setReviews([newReview, ...reviews]);
    setRatingInput(0);
    setReviewText("");
  };

  const handleDeleteReview = (id) => {
    setReviews(reviews.filter((r) => r.id !== id));
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : product.rating?.toFixed(1) || "0.0";

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-white w-full max-w-4xl h-[85vh] rounded-xl flex overflow-hidden relative">

        {/* IMAGE */}
        <div className="w-2/5 bg-gray-100 relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />

          <button
            onClick={() => toggleWishlist(product)}
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow"
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

        {/* DETAILS */}
        <div className="w-3/5 p-6 overflow-y-auto relative">

          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50"
          >
            <X size={24} />
          </button>

          <p className="text-xs text-gray-500 uppercase">
            {product.category}
          </p>

          <h2 className="text-2xl font-semibold mt-1">
            {product.name}
          </h2>

          {/* STOCK */}
          <p
            className={`mt-1 text-sm font-medium ${
              product.stock > 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {product.stock > 0
              ? `Available: ${product.stock} in stock`
              : "Out of Stock"}
          </p>

          {/* RATING DISPLAY */}
          <div className="flex items-center mt-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className={`text-lg ${
                  i <= Math.round(averageRating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
            <span className="ml-2 text-sm text-gray-500">
              {averageRating} / 5
            </span>
          </div>

          {/* PRICE */}
          <p className="text-rose-600 text-xl font-bold mt-3">
            ₹{product.price.toLocaleString()}
          </p>

          <p className="text-gray-600 text-sm mt-3">
            {product.description}
          </p>

          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`w-full mt-5 py-2 rounded font-semibold ${
              product.stock > 0
                ? "bg-gray-900 text-white"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Add to Cart
          </button>

          {/* HOW TO USE */}
          <div className="mt-6 border-t pt-4">
            <h4 className="font-semibold text-sm text-rose-600">
              How to Use
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              {product.usage}
            </p>
          </div>

          {/* DETAILS */}
          <div className="mt-4">
            <h4 className="font-semibold text-sm text-rose-600">
              Details
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              {product.purpose}
            </p>
          </div>

          {/* FEEDBACK */}
          <div className="mt-6 border-t pt-4">
            <h4 className="font-semibold text-sm mb-2">
              Customer Feedback
            </h4>

            {/* STAR INPUT */}
            <div className="flex mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  onClick={() => setRatingInput(i)}
                  className={`text-xl mr-1 ${
                    i <= ratingInput
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>

            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review..."
              className="w-full border rounded p-2 text-sm"
            />

            <button
              onClick={handlePostReview}
              className="mt-2 bg-pink-600 text-white px-4 py-2 rounded text-sm"
            >
              Post Review
            </button>

            {/* REVIEW LIST */}
            <div className="mt-4 space-y-3">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="border rounded p-3 relative"
                >
                  <div className="flex mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span
                        key={i}
                        className={`text-sm ${
                          i <= r.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-gray-700">
                    {r.text}
                  </p>

                  <button
                    onClick={() => handleDeleteReview(r.id)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;

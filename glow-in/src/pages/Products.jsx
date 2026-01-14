const Products = () => {
  return (
    <section className="min-h-screen px-6 py-16 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-12">
        Our <span className="text-pink-600">Products</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-4"
          >
            <div className="h-56 bg-gray-200 rounded-lg mb-4" />

            <h3 className="text-lg font-semibold">Beauty Product {i + 1}</h3>
            <p className="text-gray-600 text-sm mt-1">
              Premium skincare & beauty product.
            </p>

            <button className="mt-4 w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-full text-sm">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;

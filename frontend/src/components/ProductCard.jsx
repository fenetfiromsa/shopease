import { useCartDispatch } from "../context/CartContext";

function ProductCard({ product }) {
  const dispatch = useCartDispatch();

  const handleAddToCart = () => {
    console.log("✅ Add to cart clicked:", product);
    dispatch({
      type: "ADD_ITEM",
      payload: {
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: 1,
        description: product.description,
      },
    });
  };

  return (
    <div className="border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 bg-white p-5 flex flex-col">
      {/* Product Image */}
      <div className="overflow-hidden rounded-xl mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover rounded-xl hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow">
        <h2 className="text-xl font-semibold text-gray-900 mb-1 truncate">
          {product.name}
        </h2>
        <p className="text-sm text-gray-600 leading-snug mb-3 line-clamp-2">
          {product.description?.slice(0, 80)}...
        </p>

        <div className="mt-auto">
          <p className="text-lg font-bold text-blue-600 mb-3">${product.price}</p>
          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 hover:shadow-md transition-colors duration-200"
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

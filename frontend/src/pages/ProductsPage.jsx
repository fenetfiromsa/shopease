import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axios";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";
import { useCartDispatch } from "../context/CartContext";

function ProductsPage() {
  const dispatch = useCartDispatch();

  const [page, setPage] = useState(1);
  const [pages] = useState(5);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState([]); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/products");
        setProducts(res.data.products || res.data);
      } catch (error) {
        toast.error("Error fetching products");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  
  const handleAddToCart = (product) => {
  const user = JSON.parse(localStorage.getItem("user")); 

  if (!user) {
    toast.error("Please login to add items to your cart 🛒");
    return;
  }

  toast.success(`✅ Added ${product.name} to cart`);

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

  setAddedToCart((prev) => [...prev, product._id]);
};


  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const name = product.name?.toLowerCase() || "";
      const prodCategory = product.category?.toLowerCase() || "";
      const matchesSearch = name.includes(search.toLowerCase());
      const matchesCategory =
        category === "All" ||
        prodCategory === category.toLowerCase() ||
        prodCategory.includes(category.toLowerCase());
      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-12 mt-14">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-3 tracking-tight">
            Discover Our Products
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
            Explore high-quality items curated just for you. Find what fits your
            lifestyle, style, and budget.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white/70 backdrop-blur-md p-5 rounded-2xl shadow-md mb-10 border border-gray-100">
          <FilterBar
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
          />
        </div>

        {/* Product Grid */}
        {loading ? (
          <p className="text-center text-gray-500 text-lg mt-10">
            Loading products...
          </p>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product) => {
              const isAdded = addedToCart.includes(product._id); // ✅ Check if added

              return (
                <div
                  key={product._id}
                  className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 flex flex-col"
                >
                  <div className="overflow-hidden rounded-t-2xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <div className="mb-4">
                      <h2 className="font-semibold text-lg sm:text-xl text-gray-900 truncate mb-1">
                        {product.name}
                      </h2>
                      <p className="text-sm text-gray-600 leading-snug line-clamp-2">
                        {product.description?.slice(0, 70)}...
                      </p>
                    </div>

                    <div className="mt-auto">
                      <p className="text-lg font-bold text-blue-600 mb-3">
                        ${product.price}
                      </p>

                    
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={isAdded}
                        className={`w-full py-2.5 rounded-lg font-medium transition-all shadow-md hover:shadow-lg 
                          ${
                            isAdded
                              ? "bg-green-500 cursor-not-allowed text-white"
                              : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
                          }`}
                      >
                        {isAdded ? "✅ Added to Cart" : "🛒 Add to Cart"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-10">
            No products match your filters.
          </p>
        )}

        {/* Pagination */}
        <div className="mt-14 flex justify-center">
          <Pagination page={page} pages={pages} onChange={setPage} />
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;

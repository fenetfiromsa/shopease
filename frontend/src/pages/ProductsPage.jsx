import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
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
  const [price, setPrice] = useState(1000);

  //  Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/products");
        setProducts(res.data.products || res.data);
      } catch (error) {
        toast.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  //  Handle Add to Cart
  const handleAddToCart = (product) => {
    toast.success("✅ Add to cart clicked:", product);
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

  //  Filtering logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      category === "All" || product.category === category;
    const matchesPrice = product.price <= price;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-6 mt-14">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-3 tracking-tight">
            Discover Our Products
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
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
            price={price}
            setPrice={setPrice}
          />
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300 flex flex-col"
              >
                <div className="overflow-hidden rounded-t-2xl">
                  <img
                    src={product.image || "https://via.placeholder.com/150"}
                    alt={product.name}
                    className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="mb-4">
                    <h2 className="font-semibold text-xl text-gray-900 truncate mb-1">
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
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                    >
                      🛒 Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
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

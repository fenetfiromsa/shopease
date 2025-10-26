import { useEffect, useState, useContext } from "react";
import axiosInstance from "../../utils/axios";
import { PlusCircle, Save, Edit, Trash2, ImagePlus } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
export default function AdminProducts() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: null, 
  });
  const [editId, setEditId] = useState(null);

  
  useEffect(() => {
    if (!user || !user.isAdmin) navigate("/login");
  }, [user, navigate]);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("/products");
      setProducts(res.data.products || res.data);
    } catch (error) {
      toast.error("Error fetching products:", error);
      toast.info("❌ Failed to fetch products. Login as admin.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) =>
    setForm({ ...form, image: e.target.files[0] });

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.category || !form.description || !form.stock) {
      return toast.info("❌ Please fill in all fields");
    }

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("stock", form.stock);
      formData.append("category", form.category);
      if (form.image) formData.append("image", form.image);

      if (editId) {
        await axiosInstance.put(`/products/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.info("✅ Product updated!");
      } else {
        await axiosInstance.post("/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.info("✅ Product added!");
      }

      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        image: null,
      });
      setEditId(null);
      fetchProducts();
    } catch (error) {
      toast.error("Error saving product:", error);
      toast.info(
        error.response?.status === 401
          ? "❌ Unauthorized. Login as admin."
          : "❌ Failed to save product"
      );
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category,
      image: null, 
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axiosInstance.delete(`/products/${id}`);
      fetchProducts();
      toast.info("🗑️ Product deleted successfully!");
    } catch (error) {
      toast.error("Error deleting product:", error);
      toast.info(
        error.response?.status === 401
          ? "❌ Unauthorized. Login as admin."
          : "❌ Failed to delete product"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          🛍️ Admin — Manage Products
        </h1>

        {/* Form */}
        <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg mb-12 max-w-2xl mx-auto border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            {editId ? (
              <>
                <Save className="text-yellow-500" /> Edit Product
              </>
            ) : (
              <>
                <PlusCircle className="text-blue-600" /> Add New Product
              </>
            )}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={form.name}
              onChange={handleChange}
              className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock Quantity"
              value={form.stock}
              onChange={handleChange}
              className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <textarea
              name="description"
              placeholder="Product Description"
              value={form.description}
              onChange={handleChange}
              className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none col-span-2"
            />
            <div className="flex flex-col gap-2">
              <label className="font-medium">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
          </div>

          {form.image && (
            <img
              src={URL.createObjectURL(form.image)}
              alt="Preview"
              className="mt-4 h-40 w-full object-cover rounded-xl border"
            />
          )}

          <button
            onClick={handleSubmit}
            className={`mt-6 w-full py-3 rounded-xl font-semibold text-white transition-all ${
              editId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {editId ? "Update Product" : "Add Product"}
          </button>
        </div>

        {/* Products */}
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
          📦 All Products
        </h2>

        {products.length === 0 ? (
          <p className="text-center text-gray-500 italic">
            No products found. Add your first product!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="group bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all p-4 hover:-translate-y-1"
              >
                <img
                  src={product.image || "https://via.placeholder.com/200"}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-xl mb-3 group-hover:opacity-90 transition-opacity"
                />
                <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
                <p className="text-sm text-gray-400 mb-3">{product.category}</p>

                <div className="flex justify-between">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex items-center gap-1 bg-yellow-400 text-white px-3 py-1 rounded-lg hover:bg-yellow-500 transition"
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

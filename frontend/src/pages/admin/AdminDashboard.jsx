import { Link } from "react-router-dom";
import { Package, ClipboardList, BarChart3 } from "lucide-react"; 

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6 mt-16" >
      {/* HEADER */}
      <div className="w-full max-w-4xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg p-8 mb-10 text-center">
        <h1 className="text-4xl font-bold mb-2">🛍️ Admin Dashboard</h1>
        <p className="text-blue-100 text-lg">
          Manage products, view orders, and track performance — all in one place.
        </p>
      </div>

      {/* DASHBOARD CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        {/* Products Card */}
        <Link
          to="/admin/products"
          className="group bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all p-6 flex flex-col items-center text-center"
        >
          <div className="bg-blue-100 text-blue-600 p-3 rounded-full mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Package size={32} />
          </div>
          <h2 className="text-xl font-semibold mb-2">Manage Products</h2>
          <p className="text-gray-600 text-sm">
            Add, edit, or delete products in your store.
          </p>
        </Link>

        {/* Orders Card */}
        <Link
          to="/admin/orders"
          className="group bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all p-6 flex flex-col items-center text-center"
        >
          <div className="bg-green-100 text-green-600 p-3 rounded-full mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
            <ClipboardList size={32} />
          </div>
          <h2 className="text-xl font-semibold mb-2">View Orders</h2>
          <p className="text-gray-600 text-sm">
            Track customer orders and update their status.
          </p>
        </Link>

      
        <Link
          to="/admin/analytics"
          className="group bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all p-6 flex flex-col items-center text-center"
        >
          <div className="bg-purple-100 text-purple-600 p-3 rounded-full mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
            <BarChart3 size={32} />
          </div>
          <h2 className="text-xl font-semibold mb-2">Analytics</h2>
          <p className="text-gray-600 text-sm">
            View total sales and performance insights.
          </p>
        </Link>
      </div>

      {/* FOOTER */}
      <footer className="mt-12 text-gray-400 text-sm">
        © {new Date().getFullYear()} MyShop Admin Panel
      </footer>
    </div>
  );
}


import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import toast from 'react-hot-toast';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { DollarSign, ShoppingBag, Users } from "lucide-react";

export default function AdminAnalytics() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
  });

  // Fetch orders & products
  const fetchData = async () => {
    try {
      const [ordersRes, productsRes] = await Promise.all([
        axiosInstance.get("/orders"),
        axiosInstance.get("/products"),
      ]);

   setOrders(Array.isArray(ordersRes.data) ? ordersRes.data : ordersRes.data.orders || []);
   setProducts(Array.isArray(productsRes.data) ? productsRes.data : productsRes.data.products || []);

      const totalRevenue = ordersRes.data.reduce(
        (sum, order) => sum + (order.totalPrice || 0),
        0
      );

      const uniqueCustomers = new Set(
        ordersRes.data.map((o) => o.user?._id)
      ).size;

      setStats({
        totalRevenue,
        totalOrders: ordersRes.data.length,
        totalCustomers: uniqueCustomers,
      });
    } catch (error) {
      toast.error("Error fetching analytics data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //  Prepare chart data
  const revenueData = orders.map((order) => ({
    date: new Date(order.createdAt).toLocaleDateString(),
    revenue: order.totalPrice,
  }));

  const categoryData = products.reduce((acc, product) => {
    const existing = acc.find((i) => i.name === product.category);
    if (existing) existing.value += 1;
    else acc.push({ name: product.category, value: 1 });
    return acc;
  }, []);

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-20">
      <div className="max-w-6xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          📊 Admin — Analytics Dashboard
        </h1>

        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-gray-500 text-sm uppercase font-semibold">
                Total Revenue
              </h2>
              <p className="text-3xl font-bold text-green-600">
                ${stats.totalRevenue.toFixed(2)}
              </p>
            </div>
            <DollarSign className="text-green-500 w-10 h-10" />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-gray-500 text-sm uppercase font-semibold">
                Total Orders
              </h2>
              <p className="text-3xl font-bold text-blue-600">
                {stats.totalOrders}
              </p>
            </div>
            <ShoppingBag className="text-blue-500 w-10 h-10" />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-gray-500 text-sm uppercase font-semibold">
                Total Customers
              </h2>
              <p className="text-3xl font-bold text-purple-600">
                {stats.totalCustomers}
              </p>
            </div>
            <Users className="text-purple-500 w-10 h-10" />
          </div>
        </div>

       
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            💰 Revenue Over Time
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            🏷️ Products by Category
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {categoryData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

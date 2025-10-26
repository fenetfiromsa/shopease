import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axiosInstance.get("/orders/admin");
      setOrders(res.data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-6 mt-20">
      <h1 className="text-2xl font-semibold mb-4">All Orders</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>ID</th><th>User</th><th>Total</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o._id}>
              <td>{o._id}</td>
              <td>{o.user?.email}</td>
              <td>${o.total}</td>
              <td>{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

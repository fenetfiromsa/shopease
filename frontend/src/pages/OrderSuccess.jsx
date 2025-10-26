import { useLocation, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function OrderSuccess() {
  const { state } = useLocation();
  const order = state?.order;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6">
      <CheckCircle className="text-green-500 w-20 h-20 mb-4" />
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Order Confirmed!</h1>
      <p className="text-gray-600 mb-6">
        Thank you for your purchase! Your order ID is <strong>{order?._id}</strong>.
      </p>
      <Link
        to="/products"
        className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-semibold"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

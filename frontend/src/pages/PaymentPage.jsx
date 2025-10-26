import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../utils/axios";
import { CreditCard, DollarSign, CheckCircle } from "lucide-react";
import toast from 'react-hot-toast';
export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state?.order; // from Checkout page
  const [method, setMethod] = useState("credit");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = async () => {
    if (!orderData) {
      toast.info("No order data found. Please go back to checkout.");
      return;
    }

    setLoading(true);
    try {
      
      const res = await axiosInstance.post("/orders", {
        ...orderData,
        paymentMethod: method,
      });

      console.log("Order saved:", res.data);
      setSuccess(true);

      setTimeout(() => navigate("/order-success", { state: { order: res.data } }), 2000);
    } catch (error) {
    
      toast.error("Payment failed:", error);
      toast.info("❌ Payment failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 mt-20">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          💳 Payment Page
        </h1>

        <p className="text-gray-500 mb-6 text-center">
          Complete your payment to confirm your order.
        </p>

        {/* ORDER SUMMARY */}
        {orderData && (
          <div className="mb-6 bg-gray-50 p-4 rounded-xl border">
            <h2 className="font-semibold text-lg mb-2">Order Summary</h2>
            {orderData.items?.map((item, i) => (
              <div key={i} className="flex justify-between text-gray-700 text-sm mb-1">
                <span>{item.name} x {item.qty}</span>
                <span>${item.price * item.qty}</span>
              </div>
            ))}
            <div className="border-t mt-2 pt-2 font-semibold text-gray-800 flex justify-between">
              <span>Total</span>
              <span>${orderData.totalPrice}</span>
            </div>
          </div>
        )}

        {/* PAYMENT METHOD */}
        <div className="space-y-3">
          <label className="flex items-center gap-3 border p-3 rounded-xl cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="method"
              value="credit"
              checked={method === "credit"}
              onChange={() => setMethod("credit")}
            />
            <CreditCard className="text-blue-500" />
            <span>Credit / Debit Card</span>
          </label>

          <label className="flex items-center gap-3 border p-3 rounded-xl cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="method"
              value="paypal"
              checked={method === "paypal"}
              onChange={() => setMethod("paypal")}
            />
            <DollarSign className="text-yellow-500" />
            <span>PayPal</span>
          </label>

          <label className="flex items-center gap-3 border p-3 rounded-xl cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="method"
              value="cod"
              checked={method === "cod"}
              onChange={() => setMethod("cod")}
            />
            <CheckCircle className="text-green-500" />
            <span>Cash on Delivery</span>
          </label>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="mt-6 w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
        >
          {loading ? "Processing..." : `Proceed with ${method.toUpperCase()}`}
        </button>

        {success && (
          <p className="text-green-600 font-medium mt-4 text-center">
            ✅ Payment Successful! Redirecting...
          </p>
        )}
      </div>
    </div>
  );
}

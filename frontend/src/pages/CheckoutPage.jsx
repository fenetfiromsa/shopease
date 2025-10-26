import toast from "react-hot-toast";
import { useCartState } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { items } = useCartState();
  const navigate = useNavigate();

  const handleProceedToPayment = () => {
    if (items.length === 0) {
      toast.info("Your cart is empty!");
      return;
    }

    const orderData = {
      items: items.map((i) => ({
        product: i.productId,
        name: i.name,
        qty: i.qty,
        price: i.price,
      })),
      totalPrice: items.reduce((sum, i) => sum + i.price * i.qty, 0),
    };

   
    navigate("/payment", { state: { order: orderData } });
  };

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="p-6 max-w-3xl mx-auto mt-24 bg-white rounded-2xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">🛒 Checkout</h1>

      {items.length === 0 ? (
        <p className="text-gray-600 text-center py-6">
          Your cart is empty. Add items to proceed.
        </p>
      ) : (
        <>
          {/* Order Items */}
          <ul className="divide-y divide-gray-200 mb-6">
            {items.map((i) => (
              <li key={i.productId} className="flex justify-between py-3 text-gray-700">
                <div>
                  <p className="font-medium">{i.name}</p>
                  <p className="text-sm text-gray-500">Qty: {i.qty}</p>
                </div>
                <span className="font-semibold">${i.price * i.qty}</span>
              </li>
            ))}
          </ul>

          {/* Order Summary */}
          <div className="border-t pt-4 flex justify-between text-lg font-semibold text-gray-800">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            onClick={handleProceedToPayment}
            className="w-full mt-6 py-3 bg-blue-600 text-white rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
          >
            Proceed to Payment
          </button>
        </>
      )}
    </div>
  );
}

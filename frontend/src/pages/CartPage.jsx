import React from "react";
import { useCartState, useCartDispatch } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import { ShoppingCart, ArrowRight } from "lucide-react";

export default function CartPage() {
  const { items } = useCartState();
  const dispatch = useCartDispatch();
  const navigate = useNavigate();

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  const setQty = (productId, qty) => {
    dispatch({ type: "SET_QTY", payload: { productId, qty } });
  };

  const remove = (productId) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId });
  };

  const proceedToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br mt-10 from-blue-50 via-white to-blue-100 py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-10 flex items-center gap-3">
          <ShoppingCart className="text-blue-600 w-8 h-8" />
          Your Cart
        </h1>

        {items.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-xl text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              Your cart is empty 🛒
            </h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven’t added anything yet.
            </p>
            <Link
              to="/products"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all shadow-md"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* CART ITEMS */}
            <div className="md:col-span-2 space-y-6">
              {items.map((it) => (
                <div
                  key={it.productId}
                  className="flex flex-col sm:flex-row items-center gap-5 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-5 hover:shadow-2xl transition-shadow duration-300"
                >
                  <img
                    src={it.image }
                    alt={it.name}
                    className="w-28 h-28 object-cover rounded-xl border border-gray-200"
                  />

                  <div className="flex-1 w-full">
                    <div className="font-semibold text-lg text-gray-800">{it.name}</div>
                    <div className="text-gray-500 mb-2">${it.price} each</div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQty(it.productId, Math.max(1, it.qty - 1))}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={it.qty}
                        min="1"
                        onChange={(e) =>
                          setQty(it.productId, Math.max(1, Number(e.target.value) || 1))
                        }
                        className="w-14 border rounded-lg px-2 py-1 text-center focus:outline-blue-400"
                      />
                      <button
                        onClick={() => setQty(it.productId, it.qty + 1)}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                      >
                        +
                      </button>
                      <button
                        onClick={() => remove(it.productId)}
                        className="ml-auto bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <aside className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 h-fit">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Order Summary
              </h2>
              <div className="flex justify-between text-gray-600 mb-2">
                <span>Items:</span>
                <span>{items.length}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-gray-800">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button
                onClick={proceedToCheckout}
                className="mt-6 w-full bg-green-600 text-white py-3 rounded-full flex items-center justify-center gap-2 hover:bg-green-700 transition-all shadow-md"
              >
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </button>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

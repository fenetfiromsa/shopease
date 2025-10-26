
import React from "react";
import { Link } from "react-router-dom";
import { useCartState } from "../context/CartContext";

export default function MiniCart() {
  const { items } = useCartState();
  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <Link to="/cart" className="px-3 py-2 rounded hover:bg-gray-100 bg-white">
      Cart ({count}) — ${total.toFixed(2)}
    </Link>
  );
}

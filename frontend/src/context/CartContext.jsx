import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const STORAGE_KEY = "cart_v1";

const initialState = {
  items: [], // 🧱 Always start empty for new sessions
};

function cartReducer(state, action) {
  console.log("🛠 Reducer called with:", action);

  switch (action.type) {
    case "LOAD_CART_FROM_STORAGE": {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return { ...state, items: stored };
    }

    case "ADD_ITEM": {
      const item = action.payload;
      const exists = state.items.find((i) => i.productId === item.productId);
      let newItems;
      if (exists) {
        newItems = state.items.map((i) =>
          i.productId === item.productId
            ? { ...i, qty: i.qty + (item.qty || 1) }
            : i
        );
      } else {
        newItems = [...state.items, { ...item, qty: item.qty || 1 }];
      }
      return { ...state, items: newItems };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.productId !== action.payload),
      };

    case "SET_QTY": {
      const { productId, qty } = action.payload;
      if (qty <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.productId !== productId),
        };
      }
      const newItems = state.items.map((i) =>
        i.productId === productId ? { ...i, qty } : i
      );
      return { ...state, items: newItems };
    }

    case "CLEAR_CART":
      localStorage.removeItem(STORAGE_KEY); // 🧹 Clear storage too
      return { ...state, items: [] };

    default:
      throw new Error("Unknown action: " + action.type);
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // 🪄 Load from localStorage only once on startup
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (stored.length > 0) {
      dispatch({ type: "LOAD_CART_FROM_STORAGE" });
    }
  }, []);

  // 🧠 Sync to localStorage on every change
  useEffect(() => {
    if (state.items.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } else {
      localStorage.removeItem(STORAGE_KEY); // clear if empty
    }
  }, [state.items]);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
}

export function useCartState() {
  const ctx = useContext(CartStateContext);
  if (ctx === undefined)
    throw new Error("useCartState must be used within CartProvider");
  return ctx;
}

export function useCartDispatch() {
  const ctx = useContext(CartDispatchContext);
  if (ctx === undefined)
    throw new Error("useCartDispatch must be used within CartProvider");
  return ctx;
}

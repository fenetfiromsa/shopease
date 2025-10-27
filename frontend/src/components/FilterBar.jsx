import React from "react";

function FilterBar({ search, setSearch, category, setCategory }) {
  const categories = [
    "All",
    "Fruits & Vegetables",
    "Meat, Fish & Poultry",
    "Dairy & Eggs",
    "Bakery",
    "Pantry / Grocery Staples",
    "Snacks & Confectionery",
    "Beverages",
    "Household & Cleaning",
    "Personal Care & Hygiene",
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-white/70 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-md border border-gray-100 gap-4">
      {/* Search Input */}
      <input
        type="text"
        placeholder="🔍 Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded-xl px-4 py-3 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-700 placeholder-gray-400"
      />

      {/* Category Dropdown */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border border-gray-300 rounded-xl px-4 py-3 w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white text-gray-700"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterBar;

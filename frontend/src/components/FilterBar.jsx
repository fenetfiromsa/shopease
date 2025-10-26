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
    "Personal Care & Hygiene"
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-gray-50 p-4 px-28 rounded-lg shadow mb-6 gap-4">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-400"
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

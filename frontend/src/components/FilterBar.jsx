import React from "react";

function FilterBar({ search, setSearch, category, setCategory, price, setPrice }) {
  const categories = ["All", "Foods", "Drinks", "Detergents", "Books"]; 

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-gray-50 p-4 rounded-lg shadow mb-6 gap-4">
      
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
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

      
      <div className="flex items-center w-full md:w-1/3">
        <label htmlFor="price" className="mr-2 text-sm font-medium text-gray-700">
          Max Price: ${price}
        </label>
        <input
          type="range"
          id="price"
          min="0"
          max="1000"
          step="10"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
}

export default FilterBar;

import React from "react";

const Pagination = ({ page, pages, onChange }) => {
  if (pages <= 1) return null; 

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pages && newPage !== page) {
      onChange(newPage);
    }
  };

  
  const visiblePages = [];
  for (let i = 1; i <= pages; i++) {
    if (i === 1 || i === pages || (i >= page - 2 && i <= page + 2)) {
      visiblePages.push(i);
    } else if (
      (i === page - 3 && page > 4) ||
      (i === page + 3 && page < pages - 3)
    ) {
      visiblePages.push("...");
    }
  }

  return (
    <div className="flex justify-center items-center mt-8 gap-2">
      
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className={`px-3 py-1 border rounded-md ${
          page === 1
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : "hover:bg-blue-100"
        }`}
      >
        Prev
      </button>

   
      {visiblePages.map((num, index) =>
        num === "..." ? (
          <span key={index} className="px-2 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={num}
            onClick={() => handlePageChange(num)}
            className={`px-3 py-1 border rounded-md ${
              num === page
                ? "bg-blue-600 text-white border-blue-600"
                : "hover:bg-blue-100"
            }`}
          >
            {num}
          </button>
        )
      )}

      
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === pages}
        className={`px-3 py-1 border rounded-md ${
          page === pages
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : "hover:bg-blue-100"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

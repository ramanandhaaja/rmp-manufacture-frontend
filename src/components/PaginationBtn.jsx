import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginationBtn = ({
  currentPage = 1,
  totalPages = 5,
  onPageChange,
  itemsPerPage = 10,
  onItemsPerPageChange,
}) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-end items-center mt-4">
      <div className="flex items-center gap-2">
        <button
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} className="text-gray-400" />
        </button>
        <div className="flex gap-1">
          {pageNumbers.map((num) => (
            <button
              key={num}
              className={`w-8 h-8 flex items-center justify-center rounded ${
                currentPage === num
                  ? "bg-indigo-900 text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
              onClick={() => onPageChange(num)}
            >
              {num}
            </button>
          ))}
        </div>
        <button
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={16} className="text-gray-400" />
        </button>
      </div>
      <div className="relative">
        <select
          className="appearance-none border border-gray-200 rounded-lg pl-3 pr-8 py-2 bg-white"
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        >
          <option value={10}>10 / Page</option>
          <option value={20}>20 / Page</option>
          <option value={50}>50 / Page</option>
        </select>
      </div>
    </div>
  );
};

export default PaginationBtn;

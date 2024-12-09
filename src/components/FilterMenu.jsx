import React, { useState, useRef, useEffect } from "react";

const FilterMenu = ({
  isOpen,
  onClose,
  onApply,
  anchorEl,
  filterOptions = [],
}) => {
  const [filters, setFilters] = useState({});
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !anchorEl?.contains(event.target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, anchorEl]);

  if (!isOpen || !anchorEl) return null;

  const handleCheckboxChange = (filterName) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  // Calculate position based on anchor element
  const rect = anchorEl.getBoundingClientRect();
  const menuStyle = {
    position: "fixed",
    top: `${rect.bottom + 8}px`,
    left: `${rect.left}px`,
  };

  return (
    <div
      ref={menuRef}
      className="bg-white rounded-lg shadow-lg w-64 border border-gray-200 z-50"
      style={menuStyle}
    >
      <div className="p-4">
        {filterOptions.map((section) => (
          <div key={section.title} className="mb-4">
            <h3 className="text-sm font-medium mb-2 text-gray-700">
              {section.title}
            </h3>
            <div className="space-y-2">
              {section.options.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters[option.value] || false}
                    onChange={() => handleCheckboxChange(option.value)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-600">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="flex space-x-2 mt-4">
          <button
            onClick={onClose}
            className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            onClick={handleApply}
            className="flex-1 px-3 py-1.5 bg-gray-700 text-white rounded-md text-sm hover:bg-gray-800"
          >
            Terapkan
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;

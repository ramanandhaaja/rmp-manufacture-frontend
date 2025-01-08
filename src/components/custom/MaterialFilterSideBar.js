import React, { useMemo } from "react";

const MaterialFilterSection = ({ title, count, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 text-base font-medium transition-colors rounded-lg mb-1
        ${
          isActive
            ? "border-2 border-indigo-500 bg-indigo-50 text-indigo-700"
            : "text-gray-700 hover:bg-gray-50"
        }`}
    >
      {title} ({count})
    </button>
  );
};

const MaterialFilterSidebar = ({ data, activeCategory, onCategoryChange }) => {
  // Calculate categories and their counts from the data
  const categories = useMemo(() => {
    const categoryMap = data.reduce((acc, item) => {
      const category = item.goods_category_name;
      if (!acc[category]) {
        acc[category] = {
          id: item.goods_category_id,
          count: 0,
        };
      }
      acc[category].count++;
      return acc;
    }, {});

    return Object.entries(categoryMap).map(([name, details]) => ({
      id: details.id,
      title: name,
      count: details.count,
    }));
  }, [data]);

  return (
    <div className="w-64 bg-white  p-4">
      {categories.map((category) => (
        <MaterialFilterSection
          key={category.id}
          title={category.title}
          count={category.count}
          isActive={activeCategory === category.id}
          onClick={() => onCategoryChange(category.id)}
        />
      ))}
    </div>
  );
};

export default MaterialFilterSidebar;

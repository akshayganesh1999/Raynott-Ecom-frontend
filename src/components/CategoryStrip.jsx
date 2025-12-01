import React from "react";

const categories = ["All", "Electronics", "Fashion", "Home", "Accessories", "Books", "Sports"];

const CategoryStrip = ({ active, onChange }) => {

    const getButtonClasses = (cat) => {
        const isActive = active === cat || (!active && cat === "All");

        const baseClasses = "text-sm font-medium py-2 px-4 rounded-full transition duration-150 whitespace-nowrap";

        if (isActive) {
            return `${baseClasses} bg-indigo-600 text-white shadow-md hover:bg-indigo-700`;
        } else {
            return `${baseClasses} bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-indigo-600`;
        }
    };

    return (
        <div className="flex space-x-3 overflow-x-auto py-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onChange(cat === "All" ? "" : cat)}
                    className={getButtonClasses(cat)}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
};

export default CategoryStrip;
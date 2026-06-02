const CATEGORIES = [
  "New Iphones",
  "Used Iphones",
  "New Android Phones",
  "Laptops",
  "Mobile Accessories",
  "Gaming Accessories",
  "Computer Accessories",
  "Perfumes",
  "Headset and Earpiece",
  "Wifi and Routers",
  "Other Electronics"
];

const ProductsFilters = ({
  search,
  setSearch,
  category,
  setCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  onApply, // ✅ NEW
}) => {

  const clearAll = () => {
    setSearch("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
  };

  const toggleCategory = (cat) => {
    if (category === cat) {
      setCategory(""); // ✅ DESELECT
    } else {
      setCategory(cat);
    }
  };

  return (
    <div className="bg-white border rounded-xl md:rounded-2xl p-4 md:p-6 space-y-6 md:space-y-8 flex flex-col h-full">

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search products..."
        className="w-full border rounded-lg px-4 py-2 text-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* CATEGORIES */}
      <div className="space-y-2">
        <h3 className="font-semibold text-sm md:text-base">Categories</h3>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs md:text-sm border transition ${category === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* PRICE */}
      <div className="space-y-2">
        <h3 className="font-semibold text-sm md:text-base">Price</h3>

        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            className="w-full border rounded-lg px-3 py-2 text-sm"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />

          <input
            type="number"
            placeholder="Max"
            className="w-full border rounded-lg px-3 py-2 text-sm"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-auto flex gap-3 pt-4 border-t">

        {/* CLEAR */}
        <button
          onClick={clearAll}
          className="flex-1 py-2 border rounded-lg text-sm hover:bg-gray-50"
        >
          Clear All
        </button>

        {/* APPLY (only works on mobile drawer) */}
        {onApply && (
          <button
            onClick={onApply}
            className="flex-1 py-2 bg-black text-white rounded-lg text-sm hover:opacity-90"
          >
            Apply
          </button>
        )}
      </div>

    </div>
  );
};

export default ProductsFilters;
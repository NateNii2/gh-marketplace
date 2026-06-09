import { useNavigate } from "react-router-dom";

const CategoryHighlights = ({ products }) => {
  const navigate = useNavigate();

  const categories = [...new Set(products.map(p => p.category))];

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 space-y-5 md:space-y-8">

      <h2 className="text-xl md:text-2xl font-semibold">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6">

        {categories.map(cat => (
          <div
            key={cat}
            onClick={() =>
              navigate(`/products?category=${encodeURIComponent(cat)}`)
            }
            className="
              group cursor-pointer rounded-xl md:rounded-2xl
              p-4 md:p-6 text-center font-medium text-sm md:text-base
              bg-gray-100 md:bg-white border border-gray-200
              transition-all duration-300
              hover:bg-black hover:text-white hover:scale-105
              active:scale-95
            "
          >
            <p className="group-hover:tracking-wide transition-all">
              {cat}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default CategoryHighlights;
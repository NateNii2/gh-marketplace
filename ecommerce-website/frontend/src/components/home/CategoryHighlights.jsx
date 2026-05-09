import { useNavigate } from "react-router-dom";

const CategoryHighlights = ({ products }) => {
  const navigate = useNavigate();

  const categories = [...new Set(products.map(p => p.category))];

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 space-y-4 md:space-y-6">

      <h2 className="text-xl md:text-2xl font-semibold">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6">

        {categories.map(cat => (
          <div
            key={cat}
            onClick={() => navigate(`/products?category=${encodeURIComponent(cat)}`)}
            className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md cursor-pointer transition text-center active:scale-95"
          >
            <p className="font-medium text-sm md:text-base">{cat}</p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default CategoryHighlights;
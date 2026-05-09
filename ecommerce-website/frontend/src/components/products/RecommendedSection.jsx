import { Link } from "react-router-dom";

const RecommendedSection = ({ products }) => {
  const recommended = products.slice(0, 6);

  if (!recommended.length) return null;

  return (
    <section className="pt-12 md:pt-24 space-y-6 md:space-y-8">

  <div className="text-center space-y-1">
    <h2 className="text-xl md:text-2xl font-semibold">
      Recommended for You
    </h2>
    <p className="text-gray-500 text-sm md:text-base">
      Popular picks our customers love right now
    </p>
  </div>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6">
    {recommended.map((p) => (
      <Link
        key={p._id}
        to={`/product/${p._id}`}
        className="group rounded-xl bg-white border hover:shadow-lg transition overflow-hidden"
      >
        <div className="h-24 md:h-32 bg-gray-100 overflow-hidden">
          {p.image ? (
            <img
              src={p.image}
              alt={p.name}
              className="h-full w-full object-cover group-hover:scale-105 transition"
            />
          ) : (
            <div className="h-full flex items-center justify-center text-xs text-gray-400">
              No image
            </div>
          )}
        </div>

        <div className="p-2 md:p-3">
          <p className="text-xs md:text-sm font-medium truncate">{p.name}</p>
          <p className="text-xs text-gray-500 mt-1">
            GHS {p.price}
          </p>
        </div>
      </Link>
    ))}
  </div>

</section>
  );
};

export default RecommendedSection;

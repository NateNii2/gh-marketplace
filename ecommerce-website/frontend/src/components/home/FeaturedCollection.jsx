import ProductCard from "../shared/ProductCard";

const FeaturedCollection = ({ products }) => {

  // group by category
  const grouped = products.reduce((acc, product) => {
    const cat = product.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(product);
    return acc;
  }, {});

  // take 3 per category
  const featured = Object.values(grouped)
    .flatMap(items => items.slice(-3));

  if (!featured.length) return null;

  return (
    <section className="px-4 md:px-6 max-w-7xl mx-auto space-y-6 md:space-y-8">
      <h2 className="text-xl md:text-2xl font-semibold">
        Featured Products
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {featured.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedCollection;
import ProductCard from "../shared/ProductCard";

const FeaturedCollection = ({ products }) => {
  const recommended = products.slice(-4);
  if (!recommended.length) return null;

  return (
    <section className="px-4 md:px-6 max-w-7xl mx-auto space-y-6 md:space-y-8">
  <h2 className="text-xl md:text-2xl font-semibold">Recommended</h2>

  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
    {recommended.map(product => (
      <ProductCard key={product._id} product={product} />
    ))}
  </div>
</section>
  );
};

export default FeaturedCollection;

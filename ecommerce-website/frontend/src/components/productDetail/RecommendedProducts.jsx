import ProductCard from "../shared/ProductCard";

const RecommendedProducts = ({ products }) => {
  if (!products.length) return null;

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">
          You May Also Like
        </h2>
        <p className="text-gray-600 text-sm">
          Handpicked recommendations just for you.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RecommendedProducts;

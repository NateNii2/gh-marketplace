import ProductCard from "../shared/ProductCard";

const ProductsGrid = ({ products, loading }) => {

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="h-52 md:h-72 rounded-xl bg-gray-100 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
      {products.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
};

export default ProductsGrid;
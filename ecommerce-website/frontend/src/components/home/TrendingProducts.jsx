import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../shared/ProductCard";

const TrendingProducts = ({ products, loading }) => {
  const scrollRef = useRef(null);

  if (loading) return null;

  const trending = products.slice(0, 10);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 320;

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 space-y-4 md:space-y-6 overflow-hidden">

  <div className="flex justify-between items-center">
    <h2 className="text-xl md:text-2xl font-semibold">
      Trending Products
    </h2>

    <div className="hidden md:flex gap-2">
      <button
        onClick={() => scroll("left")}
        className="p-2 rounded-full border hover:bg-gray-100"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={() => scroll("right")}
        className="p-2 rounded-full border hover:bg-gray-100"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  </div>

  <div
    ref={scrollRef}
    className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
  >
    {trending.map((product) => (
      <div
        key={product._id}
        className="min-w-[75%] sm:min-w-[45%] md:min-w-[260px] snap-start"
      >
        <ProductCard product={product} />
      </div>
    ))}
  </div>

</section>
  );
};

export default TrendingProducts;
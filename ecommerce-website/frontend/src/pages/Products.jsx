import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../api/productApi";
import { SlidersHorizontal, X } from "lucide-react";
import { motion } from "framer-motion";

import SkeletonCard from "../components/SkeletonCard";
import ProductsFilters from "../components/products/ProductsFilters";
import ProductsGrid from "../components/products/ProductsGrid";
import RecommendedSection from "../components/products/RecommendedSection";

const Products = () => {
  const [searchParams] = useSearchParams();

  const urlCategory = searchParams.get("category");
  const urlSearch = searchParams.get("search"); // ✅ ADD THIS

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(urlSearch || ""); // ✅ INIT FROM URL
  const [category, setCategory] = useState(urlCategory || "");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  const [showFilters, setShowFilters] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts({
        search: search || undefined,
        category: category || undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        sort: sort || undefined,
      });

      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIX: sync URL search → state when page opens or URL changes
  useEffect(() => {
    setSearch(urlSearch || "");
  }, [urlSearch]);

  useEffect(() => {
    loadProducts();
  }, [search, category, minPrice, maxPrice, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 md:pt-10 space-y-6 md:space-y-10 overflow-x-hidden">

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-r from-black to-gray-800 text-white"
      >
        <div className="grid md:grid-cols-2 items-center">

          <div className="p-6 md:p-10 space-y-4 z-10">
            <h1 className="text-2xl md:text-4xl font-bold leading-tight">
              Explore Our Premium Tech & Lifestyle Collection
            </h1>

            <p className="text-gray-300 text-sm md:text-base">
              Discover iPhones, Androids, Laptops, Accessories, Perfumes &
              PlayStation gear — all in one place.
            </p>

            <button
              onClick={() =>
                window.scrollTo({ top: 400, behavior: "smooth" })
              }
              className="mt-2 bg-yellow-400 text-black px-6 py-3 rounded-full text-sm md:text-base font-medium hover:bg-yellow-500 transition"
            >
              Browse Products
            </button>
          </div>

          <div className="relative h-[220px] md:h-[320px]">
            <img
              src="https://i.pinimg.com/736x/d5/55/50/d55550d1d6e24af6b56d49769659d7ff.jpg"
              alt="Tech products"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        </div>
      </motion.div>

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl md:text-3xl font-semibold">All Products</h2>
        <p className="text-gray-500 text-sm md:text-base">
          {products.length} products
        </p>
      </div>

      {/* FILTER BUTTON */}
      <button
        onClick={() => setShowFilters(true)}
        className="lg:hidden flex items-center gap-2 px-4 py-2 border rounded-lg"
      >
        <SlidersHorizontal size={18} />
        Filters
      </button>

      <div className="flex gap-8">

        <aside className="w-[260px] hidden lg:block">
          <ProductsFilters
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
        </aside>

        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
              {[...Array(8)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <ProductsGrid products={products} loading={loading} />
          )}
        </div>
      </div>

      {showFilters && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-end">
          <div className="w-[85%] max-w-sm bg-white h-full p-5 overflow-y-auto flex flex-col">

            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Filters</h2>
              <button onClick={() => setShowFilters(false)}>
                <X />
              </button>
            </div>

            <ProductsFilters
              search={search}
              setSearch={setSearch}
              category={category}
              setCategory={setCategory}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              onApply={() => setShowFilters(false)}
            />
          </div>
        </div>
      )}

      <RecommendedSection products={products} />
    </div>
  );
};

export default Products;
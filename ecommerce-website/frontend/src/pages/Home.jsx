import { useEffect, useState } from "react";
import { fetchProducts } from "../api/productApi";

import SkeletonCard from "../components/SkeletonCard";
import HeroSection from "../components/home/HeroSection";
import CategoryHighlights from "../components/home/CategoryHighlights";
import TrendingProducts from "../components/home/TrendingProducts";
import FeaturedCollection from "../components/home/FeaturedCollection";
import TrustSection from "../components/home/TrustSection";
import NewsletterCTA from "../components/home/NewsletterCTA";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

   return (
    <div className="space-y-16 md:space-y-24 overflow-x-hidden">
      <HeroSection />

      <CategoryHighlights products={products} />

      {loading ? (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-5 px-4 md:px-8">
    {[...Array(4)].map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
) : (
  <TrendingProducts products={products} loading={loading} />
)}

      <FeaturedCollection products={products} />

      <TrustSection />
      <NewsletterCTA />
    </div>
  );
};

export default Home;

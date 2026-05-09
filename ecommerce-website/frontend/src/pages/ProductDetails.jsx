import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById, fetchProducts } from "../api/productApi";

import ProductGallery from "../components/productDetail/ProductGallery";
import ProductInfo from "../components/productDetail/ProductInfo";
import RecommendedProducts from "../components/productDetail/RecommendedProducts";

const ProductDetailPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ FIX: scroll to top when switching products
    window.scrollTo(0, 0);

    const loadProduct = async () => {
      setLoading(true);

      try {
        const productData = await fetchProductById(id);
        setProduct(productData);

        const all = await fetchProducts();

        const allProducts = Array.isArray(all)
          ? all
          : all.products || [];

        const related = allProducts.filter(
          (p) =>
            p.category === productData.category &&
            p._id !== productData._id
        );

        setRecommended(related.slice(0, 6));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading)
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 animate-pulse">

      <div className="h-4 bg-gray-200 rounded w-48 mb-8" />

      <div className="grid md:grid-cols-2 gap-10">

        <div className="h-[450px] bg-gray-200 rounded-2xl" />

        <div className="space-y-4">

          <div className="h-8 bg-gray-200 rounded w-3/4" />

          <div className="h-6 bg-gray-200 rounded w-1/4" />

          <div className="h-32 bg-gray-200 rounded" />

          <div className="h-12 bg-gray-200 rounded-xl" />

        </div>

      </div>
    </div>
  );

  if (!product)
    return (
      <p className="text-center mt-20">
        Product not found
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-12 md:space-y-20">

      {/* BREADCRUMB */}
      <p className="text-sm text-gray-500">
        Home / {product.category} / {product.name}
      </p>

      {/* PRODUCT SECTION */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-14">

        {/* ✅ FIX: key forces gallery to reset */}
        <ProductGallery key={product._id} product={product} />

        <ProductInfo product={product} />

      </div>

      {/* RECOMMENDED */}
      <RecommendedProducts products={recommended} />

    </div>
  );
};

export default ProductDetailPage;
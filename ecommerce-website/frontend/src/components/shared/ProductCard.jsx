import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="group rounded-2xl bg-white border hover:shadow-xl transition overflow-hidden"
    >
      {/* IMAGE */}
      <div className="h-52 bg-gray-100 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover group-hover:scale-105 transition"
          />
        ) : (
          <span className="text-sm text-gray-400">No image</span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-2">
        <p className="font-medium truncate">{product.name}</p>

        <p className="text-sm text-gray-500">
          GHS {product.price}
        </p>

        <button
          className="mt-2 flex items-center justify-center gap-2 w-full
                     bg-black text-white text-sm py-2 rounded-lg
                     opacity-0 group-hover:opacity-100 transition"
        >
          <ShoppingCart size={16} />
          View Product
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;

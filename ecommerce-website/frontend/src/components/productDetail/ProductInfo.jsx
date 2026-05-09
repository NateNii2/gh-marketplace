import { useState } from "react";
import { useCart } from "../../context/CartContext";

const ProductInfo = ({ product }) => {
  const { addToCart } = useCart();

  const [qty, setQty] = useState(1);

  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.length ? product.variants[0] : null
  );

  const price = selectedVariant ? selectedVariant.price : product.price;

  const handleAdd = () => {
    addToCart(
      {
        ...product,
        price,
        variant: selectedVariant?.label || null,
      },
      qty
    );
  };

  return (
    <div className="space-y-6">

      {/* TITLE */}

      <h1 className="text-3xl font-semibold">
        {product.name}
      </h1>

      {/* PRICE */}

      <div className="flex items-center gap-4">
        <p className="text-3xl font-bold text-black">
          GHS {price}
        </p>

        {product.oldPrice && (
          <p className="text-gray-400 line-through">
            GHS {product.oldPrice}
          </p>
        )}
      </div>

      {/* VARIANTS */}

      {product.variants?.length > 0 && (
        <div className="space-y-2">

          <p className="font-medium">
            Storage Options
          </p>

          <div className="flex flex-wrap gap-2">

            {product.variants.map((v, i) => (
              <button
                key={i}
                onClick={() => setSelectedVariant(v)}
                className={`px-4 py-2 rounded-lg border transition
                ${
                  selectedVariant?.label === v.label
                    ? "bg-black text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {v.label}
              </button>
            ))}

          </div>

        </div>
      )}

      {/* FEATURES */}

      <ul className="space-y-2 text-gray-600">
        <li>✓ 100% Authentic Product</li>
        <li>✓ Exclusive Deals & Discounts</li>
        <li>✓ Fast & Secure Shipping</li>
      </ul>

      {/* QUANTITY */}

      <div className="flex items-center gap-4">

        <div className="flex border rounded-lg overflow-hidden">

          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-4 py-2"
          >
            -
          </button>

          <span className="px-6 py-2 border-x">
            {qty}
          </span>

          <button
            onClick={() => setQty((q) => q + 1)}
            className="px-4 py-2"
          >
            +
          </button>

        </div>

      </div>

      {/* ADD TO CART */}

      <button
        onClick={handleAdd}
        className="w-full py-4 rounded-xl bg-yellow-400 hover:bg-yellow-500 font-semibold text-lg"
      >
        Add to Cart
      </button>

      {/* DESCRIPTION */}

      <div className="pt-6 border-t">

        <h3 className="text-xl font-semibold mb-2">
          Description
        </h3>

        <p className="text-gray-600">
          {product.description}
        </p>

      </div>

    </div>
  );
};

export default ProductInfo;
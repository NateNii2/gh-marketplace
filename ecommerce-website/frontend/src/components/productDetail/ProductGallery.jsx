import { useState } from "react";

const ProductGallery = ({ product }) => {
  const images = product.images?.length
    ? product.images
    : [product.image];

  const [selected, setSelected] = useState(images[0]);

  return (
    <div className="space-y-4">

      {/* MAIN IMAGE */}

      <div className="rounded-2xl border bg-white p-6">
        <div className="aspect-square overflow-hidden rounded-xl">
          <img
            src={selected}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* THUMBNAILS */}

      <div className="flex gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(img)}
            className={`w-20 h-20 border rounded-lg overflow-hidden ${
              selected === img ? "border-black" : ""
            }`}
          >
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

    </div>
  );
};

export default ProductGallery;
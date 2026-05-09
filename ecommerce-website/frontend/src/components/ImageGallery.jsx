import { useState } from "react";

export default function ImageGallery({ images }) {
  const [active, setActive] = useState(images[0]);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square rounded-2xl bg-[#f3f3f3] overflow-hidden">
        <img
          src={active}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(img)}
            className={`h-16 w-16 rounded-xl overflow-hidden border 
              ${active === img ? "border-black" : "border-black/10"}`}
          >
            <img
              src={img}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

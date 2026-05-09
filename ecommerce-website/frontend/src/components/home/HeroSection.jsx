import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    id: 1,
    title: "Discover the \nLatest Tech Deals",
    desc: "Shop top brand electronics at unbeatable prices.",
    image:
      "https://i.pinimg.com/736x/9b/4c/40/9b4c407e7afff0f81999df852afa60d1.jpg",
    cta: "Shop Now",
    action: "shop",
    duration: 6000, // 6 seconds
  },
  {
    id: 2,
    title: "Sell or Swap Your Phone",
    desc: "Looking to sell or swap your phone? Contact us on WhatsApp or call 0547476365 for a fast and reliable deal.",
    image:
      "https://i.pinimg.com/736x/7c/a6/97/7ca697fabf5883eba3809535fbd98812.jpg",
    cta: "Contact Us",
    action: "contact",
    duration: 15000, // 15 seconds
  },
];

const HeroSection = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, slides[current].duration);

    return () => clearTimeout(timer);
  }, [current]);

  const slide = slides[current];

  const handleClick = () => {
    if (slide.action === "shop") {
      navigate("/products");
    } else {
      window.location.href = "https://wa.me/233547476365"; // WhatsApp link
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 mt-4 overflow-hidden">

      <div className="relative bg-gradient-to-r from-blue-100 to-indigo-50 rounded-2xl md:rounded-3xl p-6 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-700">

        {/* TEXT */}
        <div className="max-w-xl space-y-4 text-center md:text-left animate-fadeIn">

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-gray-800 whitespace-pre-line">
            {slide.title}
          </h1>

          <p className="text-gray-600 text-sm md:text-lg">
            {slide.desc}
          </p>

          <button
            onClick={handleClick}
            className="bg-yellow-400 px-6 py-3 rounded-full text-sm md:text-base hover:bg-yellow-500 transition"
          >
            {slide.cta}
          </button>

        </div>

        {/* IMAGE */}
        <img
          key={slide.image}
          src={slide.image}
          alt="hero"
          className="w-full max-w-[220px] sm:max-w-[260px] md:max-w-[380px] rounded-2xl shadow-lg object-cover animate-fadeIn"
        />

      </div>

      {/* DOT INDICATORS */}
      <div className="flex justify-center mt-4 gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full ${
              current === i ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* ANIMATIONS */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-in-out;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

    </section>
  );
};

export default HeroSection;
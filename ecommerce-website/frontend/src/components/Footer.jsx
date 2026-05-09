import { Link } from "react-router-dom";

export default function Footer() {
  return (
   <footer className="bg-gray-900 text-gray-300 mt-16 md:mt-24">

  <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">

    <div>
      <h3 className="text-white text-base md:text-lg font-semibold mb-2">
        GH Marketplace
      </h3>
      <p className="text-xs md:text-sm opacity-80">
        Discover the best tech products in Ghana.
      </p>
    </div>

    <div>
      <h4 className="text-white mb-2 text-sm md:text-base">Shop</h4>
      <ul className="space-y-1 text-xs md:text-sm">
        <li><Link to="/products">All Products</Link></li>
        <li>Deals</li>
        <li>Accessories</li>
      </ul>
    </div>

    <div>
      <h4 className="text-white mb-2 text-sm md:text-base">Support</h4>
      <ul className="space-y-1 text-xs md:text-sm">
        <li>Help Center</li>
        <li>Shipping</li>
        <li>Returns</li>
      </ul>
    </div>

    <div>
      <h4 className="text-white mb-2 text-sm md:text-base">Legal</h4>
      <p className="text-xs md:text-sm">
        © {new Date().getFullYear()} GH Marketplace
      </p>
    </div>

  </div>

</footer>
  );
}
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const navItemClass = ({ isActive }) =>
    `transition ${
      isActive
        ? "text-black"
        : "text-gray-500 hover:text-black"
    }`;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="text-xl font-semibold tracking-wide"
        >
          GH Marketplace
        </Link>

        {/* Main Nav */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
          <NavLink to="/" className={navItemClass}>
            Home
          </NavLink>
          <NavLink to="/" className={navItemClass}>
            Phones
          </NavLink>
          <NavLink to="/" className={navItemClass}>
            Laptops
          </NavLink>
          <NavLink to="/" className={navItemClass}>
            Accessories
          </NavLink>
          <NavLink to="/" className={navItemClass}>
            Perfumes
          </NavLink>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link
            to="/"
            className="text-gray-500 hover:text-black transition"
          >
            Account
          </Link>

          <Link
            to="/"
            className="relative text-gray-500 hover:text-black transition"
          >
            Cart
            <span className="absolute -top-2 -right-3 text-[10px] bg-black text-white rounded-full px-1.5 py-0.5">
              0
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

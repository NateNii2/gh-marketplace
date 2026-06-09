import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  ShoppingCart,
  User,
  Menu,
  X,
  Search,
  Home,
  LayoutGrid,
  LogOut,
} from "lucide-react";

import {
  useAuth,
} from "../context/AuthContext";

import {
  useCart,
} from "../context/CartContext";

import {
  useState,
} from "react";

import logo from "../assets/gh-marketplace-logo.png.jpeg";

const Navbar = () => {

  const {
    user,
    isAdmin,
    logout,
  } = useAuth();

  const {
    cartItems,
    cartPulse,
  } = useCart();

  const navigate =
    useNavigate();

  const [open, setOpen] =
    useState(false);

  const [
    desktopSearch,
    setDesktopSearch,
  ] = useState("");

  const [
    mobileSearch,
    setMobileSearch,
  ] = useState("");

  const handleSearch = (
    query
  ) => {

    if (!query.trim()) return;

    navigate(
      `/products?search=${encodeURIComponent(
        query
      )}`
    );

    setOpen(false);
  };

  return (

    <nav className="sticky top-0 z-50 bg-white border-b">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">

        {/* LOGO */}

        <Link
          to="/"
          className="flex items-center"
        >
          <img
            src={logo}
            alt="GH Marketplace"
            className="h-15 sm:h-15 md:h-16 w-20 object-contain"
          />
        </Link>

        {/* DESKTOP SEARCH */}

        <div className="hidden md:flex flex-1 max-w-xl mx-6 items-center bg-gray-100 rounded-full px-4 py-2">

          <Search
            size={18}
            className="text-gray-500"
          />

          <input
            value={desktopSearch}
            onChange={(e) =>
              setDesktopSearch(
                e.target.value
              )
            }
            onKeyDown={(e) =>
              e.key === "Enter" &&
              handleSearch(
                desktopSearch
              )
            }
            placeholder="Search products..."
            className="bg-transparent outline-none px-3 w-full text-sm"
          />

          <button
            onClick={() =>
              handleSearch(
                desktopSearch
              )
            }
            className="ml-2 bg-black text-white px-4 py-1 rounded-full text-xs hover:opacity-90"
          >
            Search
          </button>
        </div>

        {/* DESKTOP RIGHT */}
        <div className="hidden md:flex items-center gap-5">

          <Link to="/products" className="text-sm font-medium">
            Shop
          </Link>

          <Link
            to="/cart"
            className={`relative transition duration-300 ${
              cartPulse ? "scale-125" : "scale-100"
            }`}
          >
            <ShoppingCart size={22} />

            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>

          {user && (
            <Link to="/account">
              <User size={22} />
            </Link>
          )}

          {isAdmin && (
            <Link
              className="px-3 py-1 bg-black text-white rounded-full text-sm"
              to="/admin"
            >
              Admin
            </Link>
          )}

          {user ? (
            <button onClick={logout} className="text-sm">
              Logout
            </button>
          ) : (
            <Link to="/login">
              Login
            </Link>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden"
          onClick={() => setOpen(true)}
        >
          <Menu size={26} />
        </button>
      </div>

      {/* MOBILE MENU (UNCHANGED) */}
      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-xl p-5 flex flex-col gap-6 animate-slideIn">

            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg">Menu</h2>
              <button onClick={() => setOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
              <Search size={18} className="text-gray-500" />
              <input
                value={mobileSearch}
                onChange={(e) => setMobileSearch(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleSearch(mobileSearch)
                }
                placeholder="Search products..."
                className="bg-transparent outline-none px-2 w-full text-sm"
              />
            </div>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
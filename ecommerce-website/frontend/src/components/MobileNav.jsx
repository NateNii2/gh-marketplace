import { Link } from "react-router-dom";

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 md:hidden backdrop-blur-glass bg-glass border-t border-white/20">
      <div className="flex justify-around py-3 text-sm">
        <Link to="/" className="hover:text-accent">Store</Link>
        <Link to="/orders" className="hover:text-accent">Orders</Link>
        <Link to="/cart" className="hover:text-accent">Cart</Link>
        <Link to="/login" className="hover:text-accent">Account</Link>
      </div>
    </nav>
  );
}

import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPopup({ close }) {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="absolute right-2 md:right-6 mt-2 w-[90vw] max-w-sm bg-white shadow-xl border rounded-xl p-4 z-50">

      <h3 className="font-semibold mb-3">Your Cart</h3>

      {cartItems.length === 0 && (
        <p className="text-sm text-gray-500">
          Cart is empty
        </p>
      )}

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center text-sm"
          >
            <div className="truncate">
              <p className="truncate">{item.name}</p>
              <p className="text-gray-500 text-xs">
                ₵{item.price}
              </p>
            </div>

            <button
              onClick={() => removeFromCart(item._id)}
              className="text-red-500"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {cartItems.length > 0 && (
        <>
          <Link
            to="/cart"
            onClick={close}
            className="block text-center mt-4 bg-black text-white py-2 rounded-lg text-sm"
          >
            View Cart
          </Link>

          <Link
            to="/checkout"
            onClick={close}
            className="block text-center mt-2 border py-2 rounded-lg text-sm"
          >
            Checkout
          </Link>
        </>
      )}
    </div>
  );
}
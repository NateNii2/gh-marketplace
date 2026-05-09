import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartModal({ onClose }) {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">

      <div className="w-full max-w-sm h-full bg-white p-5 overflow-y-auto">

        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Your Cart</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-sm text-gray-500">
            Cart is empty
          </p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between text-sm">

                <div className="pr-2">
                  <p className="truncate">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    ₵ {item.price} × {item.qty}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 text-xs"
                >
                  Remove
                </button>

              </div>
            ))}
          </div>
        )}

        <Link
          to="/cart"
          onClick={onClose}
          className="block mt-6 text-center border rounded-lg py-2 text-sm"
        >
          View Full Cart
        </Link>

      </div>
    </div>
  );
}
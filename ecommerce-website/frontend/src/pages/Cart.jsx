import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

const Cart = () => {
  const { cartItems, updateQty, removeFromCart, subtotal } = useCart();
  const navigate = useNavigate();

  /* EMPTY */
  if (!cartItems.length) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-5">
        <ShoppingBag size={40} className="mx-auto text-gray-400" />

        <h2 className="text-xl md:text-3xl font-semibold">
          Your cart is empty
        </h2>

        <p className="text-gray-500 text-sm md:text-base">
          Looks like you haven’t added anything yet.
        </p>

        <button
          onClick={() => navigate("/products")}
          className="px-6 py-3 bg-black text-white rounded-lg"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12 space-y-8 md:space-y-12 overflow-x-hidden">

      {/* HEADER */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-4xl font-semibold">
          Your Cart
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Review your items before checkout
        </p>
      </div>

      {/* CONTENT */}
      <div className="grid lg:grid-cols-3 gap-6 md:gap-12">

        {/* ITEMS */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">

          {cartItems.map(item => (
            <div
              key={item._id + item.variant}
              className="flex flex-col sm:flex-row gap-4 p-4 md:p-6 rounded-xl border bg-white shadow-sm"
            >
              {/* IMAGE */}
              <div className="w-full sm:w-28 h-40 sm:h-28 rounded-lg bg-gray-100 overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                    No image
                  </div>
                )}
              </div>

              {/* DETAILS */}
              <div className="flex-1 space-y-2">

                <h3 className="font-medium text-sm md:text-lg">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500">
                  GHS {item.price}
                </p>

                {/* CONTROLS */}
                <div className="flex items-center justify-between mt-3 flex-wrap gap-3">

                  {/* QTY */}
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQty(item._id, item.variant, item.qty - 1)}
                      className="px-3 py-2"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="px-3 text-sm">
                      {item.qty}
                    </span>

                    <button
                      onClick={() => updateQty(item._id, item.variant, item.qty + 1)}
                      className="px-3 py-2"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() => removeFromCart(item._id, item.variant)}
                    className="flex items-center gap-1 text-xs text-red-500"
                  >
                    <Trash2 size={14} />
                    Remove
                  </button>

                  {/* TOTAL (mobile position) */}
                  <div className="font-medium text-sm sm:hidden">
                    GHS {(item.price * item.qty).toFixed(2)}
                  </div>
                </div>
              </div>

              {/* TOTAL (desktop) */}
              <div className="hidden sm:block font-medium">
                GHS {(item.price * item.qty).toFixed(2)}
              </div>
            </div>
          ))}

        </div>

        {/* SUMMARY */}
        <div className="rounded-xl border p-4 md:p-6 h-fit bg-white shadow-sm space-y-5">

          <h2 className="text-lg md:text-xl font-semibold">
            Order Summary
          </h2>

          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span>GHS {subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-semibold text-base md:text-lg border-t pt-3">
            <span>Total</span>
            <span>GHS {subtotal.toFixed(2)}</span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full py-3 bg-black text-white rounded-lg"
          >
            Checkout
          </button>

          <button
            onClick={() => navigate("/products")}
            className="w-full py-2 border rounded-lg text-sm"
          >
            Continue Shopping
          </button>

        </div>

      </div>
    </div>
  );
};

export default Cart;
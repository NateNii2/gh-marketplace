import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyPayment } from "../api/orderApi";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Success = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const { user } = useAuth();
  const { clearCart } = useCart();

  const hasVerified = useRef(false);

  const [loading, setLoading] = useState(true);

  const [orderData, setOrderData] = useState(null);

  const [message, setMessage] = useState(
    "Verifying payment..."
  );

  useEffect(() => {
    // ✅ PREVENT DOUBLE EXECUTION
    if (hasVerified.current) return;

    hasVerified.current = true;

    const cod = params.get("cod");
    const pickup = params.get("pickup");
    const reference = params.get("reference");

    /* =========================
       PICKUP / COD
    ========================= */

    if (pickup === "true" || cod === "true") {
      clearCart();

      const savedOrder = localStorage.getItem(
        "latestOrder"
      );

      if (savedOrder) {
        setOrderData(JSON.parse(savedOrder));
      }

      setMessage("Order placed successfully ✅");

      setLoading(false);

      return;
    }

    /* =========================
       INVALID
    ========================= */

    if (!reference) {
      setMessage("Invalid payment reference ❌");

      setLoading(false);

      setTimeout(() => {
        navigate("/failed");
      }, 2500);

      return;
    }

    /* =========================
       VERIFY
    ========================= */

    const verify = async () => {
      try {
        if (!user?.token) {
          setMessage("Authentication error ❌");
          setLoading(false);
          return;
        }

        const data = await verifyPayment(
          reference,
          user.token
        );

        // ✅ SAVE ORDER
        setOrderData(data);

        // ✅ CLEAR CART
        clearCart();

        // ✅ REMOVE SAVED CART
        localStorage.removeItem("cart");

        setMessage("Payment successful ✅");

        setLoading(false);

      } catch (err) {
        console.error(
          "VERIFY FRONTEND ERROR:",
          err
        );

        setMessage(
          err?.message ||
            "Payment verification failed ❌"
        );

        setLoading(false);

        setTimeout(() => {
          navigate("/failed");
        }, 2500);
      }
    };

    verify();

  }, [params, user, navigate, clearCart]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-lg overflow-hidden">

        {/* TOP */}
        <div className="p-8 border-b text-center">

          <div className="text-5xl mb-4">
            {loading ? "⏳" : "✅"}
          </div>

          <h1 className="text-2xl font-bold">
            {message}
          </h1>

          {!loading && (
            <p className="text-gray-500 mt-2 text-sm">
              Thank you for shopping with us.
            </p>
          )}

        </div>

        {/* ORDER SUMMARY */}
        {orderData && (
  <div className="p-6 space-y-6">

    {/* STATUS */}
    <div className="grid md:grid-cols-3 gap-4">

      <div className="border rounded-2xl p-4">
        <p className="text-sm text-gray-500">
          Payment Status
        </p>

        <p
          className={`font-semibold mt-1 ${
            orderData.isPaid
              ? "text-green-600"
              : "text-yellow-600"
          }`}
        >
          {orderData.isPaid
            ? "Paid"
            : "Not Paid"}
        </p>
      </div>

      <div className="border rounded-2xl p-4">
        <p className="text-sm text-gray-500">
          Payment Method
        </p>

        <p className="font-semibold mt-1 uppercase">
          {orderData.deliveryMethod === "pickup"
            ? "Pickup"
            : orderData.paymentMethod}
        </p>
      </div>

      <div className="border rounded-2xl p-4">
        <p className="text-sm text-gray-500">
          Total Amount
        </p>

        <p className="font-semibold mt-1">
          ₵
          {Number(
            orderData.totalPrice
          ).toFixed(2)}
        </p>
      </div>

    </div>

    {/* PICKUP NOTICE */}
    {orderData.deliveryMethod === "pickup" && (

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 space-y-3">

        <h2 className="font-semibold text-blue-800">
          Pickup Information
        </h2>

        <p className="text-sm text-blue-700 leading-relaxed">
          Your order has been successfully placed for pickup.
        </p>

        <p className="text-sm text-blue-700 leading-relaxed">
          Our pickup location is at <strong>Awoshie Station</strong>.
        </p>

        <p className="text-sm text-blue-700 leading-relaxed">
          Please call or WhatsApp{" "}
          <strong>0547476365</strong> for
          directions or assistance before arrival.
        </p>

        <p className="text-sm text-blue-700 leading-relaxed">
          Kindly have your order details available
          when coming for pickup.
        </p>

      </div>

    )}

    {/* DELIVERY DETAILS */}
    {orderData.deliveryMethod !== "pickup" && (
      <div className="border rounded-2xl p-5 space-y-2">

        <h2 className="font-semibold text-lg">
          Delivery Details
        </h2>

        <p className="text-sm">
          <strong>Name:</strong>{" "}
          {
            orderData.shippingAddress
              ?.fullName
          }
        </p>

        <p className="text-sm">
          <strong>Phone:</strong>{" "}
          {
            orderData.shippingAddress
              ?.phone
          }
        </p>

        <p className="text-sm">
          <strong>Region:</strong>{" "}
          {
            orderData.shippingAddress
              ?.region
          }
        </p>

        <p className="text-sm">
          <strong>Location:</strong>{" "}
          {
            orderData.shippingAddress
              ?.location
          }
        </p>

      </div>
    )}

    {/* ITEMS */}
    <div className="border rounded-2xl p-5">

      <h2 className="font-semibold text-lg mb-4">
        Order Items
      </h2>

      <div className="space-y-4">

        {orderData.orderItems?.map(
          (item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b pb-3 last:border-0"
            >
              <div>
                <p className="font-medium">
                  {item.name}
                </p>

                <p className="text-sm text-gray-500">
                  Qty: {item.qty}
                </p>
              </div>

              <p className="font-semibold">
                ₵
                {(
                  item.price *
                  item.qty
                ).toFixed(2)}
              </p>
            </div>
          )
        )}

      </div>

    </div>

    {/* BUTTONS */}
    <div>

      <button
        onClick={() => navigate("/")}
        className="w-full bg-black text-white py-3 rounded-2xl hover:opacity-90 transition"
      >
        Back to Homepage
      </button>

    </div>

  </div>
)}

      </div>

    </div>
  );
};

export default Success;
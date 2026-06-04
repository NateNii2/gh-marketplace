import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  const [message, setMessage] = useState("Verifying payment...");
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    if (hasVerified.current) return;
    hasVerified.current = true;

    const offline = params.get("offline");

    // COD / pickup flow
    if (offline === "true") {
      clearCart();
      localStorage.removeItem("cart");
      setMessage("Order placed successfully ✅");
      setLoading(false);
      return;
    }

    const reference = params.get("reference");
    const trxref = params.get("trxref");
    const paymentReference = reference || trxref;

    if (!paymentReference) {
      setMessage("Payment was cancelled ❌");
      setLoading(false);
      setTimeout(() => navigate("/failed"), 2000);
      return;
    }

    // WAIT FOR AUTH SAFELY
    if (!user?.token) {
      hasVerified.current = false;
      return;
    }

    const verify = async () => {
      try {
        const data = await verifyPayment(paymentReference, user.token);

        setOrderData(data);
        clearCart();
        localStorage.removeItem("cart");
        setMessage("Payment successful ✅");
      } catch (err) {
        console.error(err);
        setMessage("Payment verification failed ❌");
        setTimeout(() => navigate("/failed"), 2500);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [params, user, navigate, clearCart]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-2xl overflow-hidden">

        <div className="p-8 text-center border-b">
          <div className="text-5xl mb-4">
            {loading ? "⏳" : "✅"}
          </div>

          <h1 className="text-2xl font-bold">{message}</h1>
        </div>

        {orderData && (
          <div className="p-6 space-y-6">

            <div className="border rounded-2xl p-5">
              <h2 className="font-semibold text-lg mb-4">Order Items</h2>

              <div className="space-y-3">
                {orderData.orderItems?.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span>
                      {item.name} × {item.qty}
                    </span>

                    <span>
                      ₵{(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigate("/")}
              className="w-full bg-black text-white py-3 rounded-2xl"
            >
              Back to Homepage
            </button>

          </div>
        )}

        {!loading && !orderData && (
          <div className="p-6">
            <button
              onClick={() => navigate("/")}
              className="w-full bg-black text-white py-3 rounded-2xl"
            >
              Back to Homepage
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Success;
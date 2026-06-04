import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { initPayment } from "../api/orderApi";

const REGIONS = {
  "Greater Accra": [
    "Accra",
    "Tema",
    "Madina",
    "Adenta",
    "Kasoa",
    "East Legon",
    "Spintex",
  ],
  Ashanti: ["Kumasi", "Obuasi", "Ejisu", "Mampong"],
  Central: ["Cape Coast", "Winneba", "Kasoa"],
  Eastern: ["Koforidua", "Nsawam", "Akosombo"],
  Western: ["Takoradi", "Tarkwa"],
  Volta: ["Ho", "Hohoe"],
  Oti: ["Dambai"],
  Northern: ["Tamale", "Yendi"],
  Savannah: ["Damongo"],
  "Upper East": ["Bolgatanga", "Navrongo"],
  "Upper West": ["Wa", "Lawra"],
  "North East": ["Nalerigu"],
  Bono: ["Sunyani", "Berekum"],
  "Bono East": ["Techiman"],
  Ahafo: ["Goaso"],
  "Western North": ["Sefwi Wiawso"],
};

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    altPhone: "",
    region: "",
    city: "",
    exactLocation: "",
    deliveryMethod: "delivery",
    paymentMethod: "paystack",
  });

  const isAccra = form.region === "Greater Accra";
  const isPickup = form.deliveryMethod === "pickup";
  const isCOD = form.paymentMethod === "cod";

  const cities = useMemo(() => {
    return REGIONS[form.region] || [];
  }, [form.region]);

  const totalPrice = useMemo(
    () => cartItems.reduce((s, i) => s + i.price * i.qty, 0),
    [cartItems]
  );

  /* =========================
     SUBMIT ORDER
  ========================= */

  const handleSubmit = async () => {
    if (loading) return;
    if (!user?.token) return;
    if (cartItems.length === 0) return;

    setLoading(true);

    try {
      let paymentMethod = "paystack";

      if (isAccra && form.paymentMethod === "cod") {
        paymentMethod = "cod";
      }

      // ✅ FIXED ORDER PAYLOAD (INCLUDES VARIANT)
      const orderPayload = {
        orderItems: cartItems.map((i) => ({
          product: i._id,
          name: i.name,
          qty: i.qty,
          price: i.price,
          variant: i.variant || null, // ✅ IMPORTANT FIX
        })),

        shippingAddress: {
          fullName: form.fullName,
          phone: form.phone,
          altPhone: form.altPhone,
          region: form.region,
          city: form.city,
          exactLocation: form.exactLocation,
        },

        deliveryMethod: form.deliveryMethod,
        paymentMethod,
        totalPrice,
      };

      const orderRes = await fetch(
        `${import.meta.env.VITE_API_URL}/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(orderPayload),
        }
      );

      const createdOrder = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error(createdOrder.message || "Order creation failed");
      }

      // OFFLINE FLOW
      if (isPickup || paymentMethod === "cod") {
        clearCart();
        navigate("/success?offline=true");
        return;
      }

      // PAYSTACK INIT
      const payment = await initPayment(
        {
          email: user.email,
          amount: totalPrice,
          orderId: createdOrder._id,
        },
        user.token
      );

      window.location.href = payment.data.authorization_url;

    } catch (err) {
      console.error(err);
      navigate("/failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 md:py-14">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 px-4 md:px-6">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          <div className="bg-white p-6 rounded-2xl shadow">
            <h1 className="text-xl font-semibold">Almost there 👋</h1>
            <p className="text-gray-600 mt-1">
              Complete your details to finalize your order.
            </p>
          </div>

          {/* CONTACT */}
          <div className="bg-white p-6 rounded-2xl shadow space-y-3">
            <input className="input" placeholder="Full Name"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />

            <input className="input" placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <input className="input" placeholder="Alt Phone"
              value={form.altPhone}
              onChange={(e) => setForm({ ...form, altPhone: e.target.value })}
            />
          </div>

          {/* LOCATION */}
          <div className="bg-white p-6 rounded-2xl shadow space-y-3">

            <select
              className="input"
              value={form.region}
              onChange={(e) =>
                setForm({
                  ...form,
                  region: e.target.value,
                  city: "",
                  exactLocation: "",
                })
              }
            >
              <option value="">Select Region</option>
              {Object.keys(REGIONS).map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>

            <select
              className="input"
              value={form.city}
              onChange={(e) =>
                setForm({ ...form, city: e.target.value })
              }
              disabled={!form.region}
            >
              <option value="">Select City</option>
              {cities.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <textarea
              className="input min-h-[120px]"
              placeholder="Exact Location"
              value={form.exactLocation}
              onChange={(e) =>
                setForm({ ...form, exactLocation: e.target.value })
              }
            />
          </div>

          {/* DELIVERY */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <select
              className="input"
              value={form.deliveryMethod}
              onChange={(e) =>
                setForm({ ...form, deliveryMethod: e.target.value })
              }
            >
              <option value="delivery">Delivery</option>
              {isAccra && <option value="pickup">Pickup</option>}
            </select>
          </div>

        </div>

        {/* RIGHT */}
        <div className="bg-white p-6 rounded-2xl shadow space-y-4">

          <h3 className="font-semibold">Order Summary</h3>

          {cartItems.map((i) => (
            <div key={i._id} className="flex justify-between text-sm">
              <span>
                {i.name} {i.variant ? `(${i.variant})` : ""} × {i.qty}
              </span>
              <span>₵{(i.price * i.qty).toFixed(2)}</span>
            </div>
          ))}

          <div className="border-t pt-3 flex justify-between font-semibold">
            <span>Total</span>
            <span>₵{totalPrice.toFixed(2)}</span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-yellow-400 py-3 rounded-xl font-semibold"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
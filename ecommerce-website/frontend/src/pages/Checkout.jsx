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

  const isAccra =
    form.region === "Greater Accra";

  const isPickup =
    form.deliveryMethod === "pickup";

  const isCOD =
    form.paymentMethod === "cod";

  const cities = useMemo(() => {
    return REGIONS[form.region] || [];
  }, [form.region]);

  const totalPrice = useMemo(
    () =>
      cartItems.reduce(
        (s, i) =>
          s + i.price * i.qty,
        0
      ),
    [cartItems]
  );

  /* =========================
     SUBMIT
  ========================= */

 const handleSubmit = async () => {

  if (loading) return;

  if (!user?.token) return;

  if (cartItems.length === 0) return;

  setLoading(true);

  try {

    let paymentMethod =
      "paystack";

    if (
      isAccra &&
      form.paymentMethod === "cod"
    ) {
      paymentMethod = "cod";
    }

    /* =========================
       CREATE ORDER PAYLOAD
    ========================= */

    const orderPayload = {

      orderItems:
        cartItems.map((i) => ({
          product: i._id,
          name: i.name,
          qty: i.qty,
          price: i.price,
        })),

      shippingAddress: {
        fullName:
          form.fullName,
        phone:
          form.phone,
        altPhone:
          form.altPhone,
        region:
          form.region,
        city:
          form.city,
        exactLocation:
          form.exactLocation,
      },

      deliveryMethod:
        form.deliveryMethod,

      paymentMethod,

      totalPrice,
    };

    /* =========================
       CREATE ORDER FIRST
    ========================= */

    const orderRes =
      await fetch(
        `${
          import.meta.env
            .VITE_API_URL
        }/api/orders`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization: `Bearer ${user.token}`,
          },

          body: JSON.stringify(
            orderPayload
          ),
        }
      );

    const createdOrder =
      await orderRes.json();

    if (!orderRes.ok) {
      throw new Error(
        createdOrder.message ||
          "Order creation failed"
      );
    }

    /* =========================
       OFFLINE PAYMENTS
    ========================= */

    if (
      isPickup ||
      paymentMethod === "cod"
    ) {

      clearCart();

      navigate(
        "/success?offline=true"
      );

      return;
    }

    /* =========================
       PAYSTACK INIT
    ========================= */

    const payment =
      await initPayment(
        {
          email:
            user.email,

          amount:
            totalPrice,

          orderId:
            createdOrder._id,
        },

        user.token
      );

    window.location.href =
      payment.data
        .authorization_url;

  } catch (err) {

    console.error(err);

    navigate("/failed");

  } finally {

    setLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-gray-50 py-10 md:py-14">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 md:gap-10 px-4 md:px-6">

        {/* LEFT */}

        <div className="lg:col-span-2 space-y-6 md:space-y-8">

          <div className="bg-white p-6 md:p-8 rounded-2xl shadow">

            <h1 className="text-xl md:text-2xl font-semibold">
              Almost there 👋
            </h1>

            <p className="text-gray-600 mt-1 text-sm md:text-base">
              Kindly complete your details below to finalize your order.
            </p>

          </div>

          {/* CONTACT */}

          <div className="bg-white p-6 md:p-8 rounded-2xl shadow space-y-4">

            <h2 className="font-semibold">
              Contact Information
            </h2>

            <input
              className="input"
              placeholder="Full Name"
              value={form.fullName}
              onChange={(e) =>
                setForm({
                  ...form,
                  fullName:
                    e.target.value,
                })
              }
            />

            <input
              className="input"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone:
                    e.target.value,
                })
              }
            />

            <input
              className="input"
              placeholder="Alternate Phone Number"
              value={form.altPhone}
              onChange={(e) =>
                setForm({
                  ...form,
                  altPhone:
                    e.target.value,
                })
              }
            />
          </div>

          {/* LOCATION */}

          <div className="bg-white p-6 md:p-8 rounded-2xl shadow space-y-4">

            <h2 className="font-semibold">
              Shipping Location
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <select
                className="input"
                value={form.region}
                onChange={(e) =>
                  setForm({
                    ...form,
                    region:
                      e.target.value,
                    city: "",
                    exactLocation:
                      "",
                    deliveryMethod:
                      "delivery",
                    paymentMethod:
                      "paystack",
                  })
                }
              >

                <option value="">
                  Select Region
                </option>

                {Object.keys(
                  REGIONS
                ).map((r) => (
                  <option key={r}>
                    {r}
                  </option>
                ))}
              </select>

              <select
                className="input"
                value={form.city}
                onChange={(e) =>
                  setForm({
                    ...form,
                    city:
                      e.target.value,
                  })
                }
                disabled={!form.region}
              >

                <option value="">
                  Select City
                </option>

                {cities.map((c) => (
                  <option key={c}>
                    {c}
                  </option>
                ))}
              </select>

            </div>

            <textarea
              className="input min-h-[120px] resize-none"
              placeholder="Enter your exact location..."
              value={
                form.exactLocation
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  exactLocation:
                    e.target.value,
                })
              }
            />

          </div>

          {/* DELIVERY */}

          <div className="bg-white p-6 md:p-8 rounded-2xl shadow space-y-4">

            <h2 className="font-semibold">
              Delivery Method
            </h2>

            <select
              className="input"
              value={
                form.deliveryMethod
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  deliveryMethod:
                    e.target.value,
                  paymentMethod:
                    "paystack",
                })
              }
            >

              <option value="delivery">
                Delivery
              </option>

              {isAccra && (
                <option value="pickup">
                  Pickup
                </option>
              )}
            </select>

          </div>

          {/* PAYMENT */}

          {!isPickup && (
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow space-y-4">

              <h2 className="font-semibold">
                Payment Method
              </h2>

              <select
                className="input"
                value={
                  form.paymentMethod
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    paymentMethod:
                      e.target.value,
                  })
                }
              >

                <option value="paystack">
                  Mobile Money (MOMO)
                </option>

                {isAccra && (
                  <option value="cod">
                    Payment on Delivery
                  </option>
                )}
              </select>

            </div>
          )}
        </div>

        {/* SUMMARY */}

        <div className="bg-white p-5 md:p-6 rounded-2xl shadow space-y-5 h-fit">

          <h3 className="font-semibold">
            Order Summary
          </h3>

          {cartItems.map((i) => (
            <div
              key={i._id}
              className="flex justify-between text-sm"
            >
              <span>
                {i.name} × {i.qty}
              </span>

              <span>
                ₵
                {(
                  i.price * i.qty
                ).toFixed(2)}
              </span>
            </div>
          ))}

          <div className="border-t pt-4 flex justify-between font-semibold">

            <span>Total</span>

            <span>
              ₵
              {totalPrice.toFixed(2)}
            </span>

          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-400 hover:opacity-90"
            }`}
          >

            {loading
              ? "Processing..."
              : isPickup || isCOD
              ? "Place Order"
              : "Pay with Mobile Money"}

          </button>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
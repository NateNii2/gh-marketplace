import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { X } from "lucide-react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState(null);

  const token = localStorage.getItem("token");

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });

    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const loadOrders = async () => {
    try {
      const { data } = await axios.get("/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(data);

    } catch (err) {
      console.error(err);

      showMessage(
        "Failed to load orders",
        "error"
      );
    }
  };

  useEffect(() => {
    if (token) {
      loadOrders();
    }
  }, [token]);

  const markDelivered = async (id) => {
    try {
      await axios.put(
        `/admin/orders/${id}/deliver`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showMessage(
        "Order marked as delivered"
      );

      loadOrders();

    } catch {
      showMessage(
        "Failed to update order",
        "error"
      );
    }
  };

  const deleteOrder = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this order?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      showMessage("Order deleted");

      setSelected(null);

      loadOrders();

    } catch {
      showMessage(
        "Delete failed",
        "error"
      );
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">

      {/* HEADER */}

      <div>
        <h1 className="text-2xl md:text-3xl font-semibold">
          Orders
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          {orders.length} total orders
        </p>
      </div>

      {/* MESSAGE */}

      {message && (
        <div
          className={`p-3 rounded-lg text-sm ${
            message.type === "error"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* ORDERS */}

      <div className="bg-white border rounded-2xl overflow-hidden">

        {orders.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No orders found
          </div>
        )}

        {orders.map((o) => (

          <div
            key={o._id}
            className="p-5 border-b last:border-b-0 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5"
          >

            {/* LEFT */}

            <div className="space-y-2">

              <p className="font-semibold">
                {o.orderItems.length} item(s)
              </p>

              <p className="text-sm text-gray-500">
                GHS {o.totalPrice}
              </p>

              <p className="text-xs text-gray-400">
                {new Date(
                  o.createdAt
                ).toDateString()}
              </p>

            </div>

            {/* STATUS */}

            <div className="flex flex-wrap gap-2">

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  o.isPaid
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {o.isPaid
                  ? "Paid"
                  : "Not Paid"}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  o.isDelivered
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {o.isDelivered
                  ? "Delivered"
                  : "Pending"}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  o.deliveryMethod === "pickup"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-purple-100 text-purple-700"
                }`}
              >
                {o.deliveryMethod}
              </span>

            </div>

            {/* ACTION */}

            <button
              onClick={() => setSelected(o)}
              className="px-4 py-2 border rounded-xl text-sm hover:bg-gray-50 transition"
            >
              View Details
            </button>

          </div>
        ))}

      </div>

      {/* MODAL */}

      {selected && (

        <div className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center justify-center p-4">

          <div className="bg-white w-full md:max-w-2xl rounded-2xl p-6 space-y-6 max-h-[90vh] overflow-y-auto">

            {/* HEADER */}

            <div className="flex justify-between items-center">

              <h2 className="text-xl font-semibold">
                Order Details
              </h2>

              <button
                onClick={() =>
                  setSelected(null)
                }
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>

            </div>

            {/* CUSTOMER */}

            <div className="border rounded-2xl p-4 space-y-2">

              <h3 className="font-semibold">
                Customer Information
              </h3>

              <p className="text-sm">
                <strong>Name:</strong>{" "}
                {
                  selected
                    .shippingAddress
                    ?.fullName
                }
              </p>

              <p className="text-sm">
                <strong>Phone:</strong>{" "}
                {
                  selected
                    .shippingAddress
                    ?.phone
                }
              </p>

              <p className="text-sm">
                <strong>
                  Alt Phone:
                </strong>{" "}
                {
                  selected
                    .shippingAddress
                    ?.altPhone
                }
              </p>

              <p className="text-sm">
                <strong>
                  Region:
                </strong>{" "}
                {
                  selected
                    .shippingAddress
                    ?.region
                }
              </p>

              <p className="text-sm">
  <strong>Location:</strong>{" "}
  {
    selected
      .shippingAddress
      ?.location
  }
</p>
            </div>

            {/* PAYMENT */}

            <div className="border rounded-2xl p-4 space-y-2">

              <h3 className="font-semibold">
                Payment Information
              </h3>

              <p className="text-sm">
                <strong>
                  Payment Method:
                </strong>{" "}
                {selected.paymentMethod}
              </p>

              <p className="text-sm">
                <strong>Status:</strong>{" "}
                {selected.isPaid
                  ? "Paid"
                  : "Not Paid"}
              </p>

              <p className="text-sm">
                <strong>
                  Delivery Method:
                </strong>{" "}
                {
                  selected.deliveryMethod
                }
              </p>

              <p className="text-sm">
                <strong>Total:</strong>{" "}
                GHS {selected.totalPrice}
              </p>

            </div>

            {/* ITEMS */}

            <div>

              <h3 className="font-semibold mb-3">
                Order Items
              </h3>

              <div className="space-y-3">

                {selected.orderItems.map(
                  (item, i) => (

                    <div
                      key={i}
                      className="border rounded-xl p-4 flex justify-between items-center text-sm"
                    >

                      <div>
                        <p className="font-medium">
                          {item.name}
                        </p>

                        <p className="text-gray-500">
                          Qty: {item.qty}
                        </p>
                      </div>

                      <p>
                        GHS {item.price}
                      </p>

                    </div>
                  )
                )}

              </div>

            </div>

            {/* ACTIONS */}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">

              {!selected.isDelivered && (

                <button
                  onClick={() => {
                    markDelivered(
                      selected._id
                    );

                    setSelected(null);
                  }}
                  className="flex-1 py-3 bg-yellow-500 text-white rounded-xl hover:opacity-90 transition"
                >
                  Mark as Delivered
                </button>

              )}

              {selected.isDelivered && (

                <button
                  onClick={() => {
                    deleteOrder(
                      selected._id
                    );
                  }}
                  className="flex-1 py-3 bg-red-600 text-white rounded-xl hover:opacity-90 transition"
                >
                  Delete Order
                </button>

              )}

              <button
                onClick={() =>
                  setSelected(null)
                }
                className="flex-1 py-3 border rounded-xl hover:bg-gray-50 transition"
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default AdminOrders;
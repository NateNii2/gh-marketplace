const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderItems: [
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: String,
    qty: Number,
    price: Number,
    variant: String, // ✅ ADD THIS
  },
],
    deliveryMethod: {
      type: String,
      enum: ["pickup", "delivery"],
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["paystack", "cod"],
      required: true,
    },

    shippingAddress: {
      fullName: String,
      phone: String,
      altPhone: String,

      region: String,
      city: String,

      exactLocation: String,
    },

    totalPrice: Number,

    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: Date,

    paymentResult: {
      reference: String,
      status: String,
    },

    isDelivered: {
      type: Boolean,
      default: false,
    },

    deliveredAt: Date,
  },

  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Order || mongoose.model("Order", orderSchema);
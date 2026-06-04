const Order = require("../models/Order");
const Product = require("../models/Product");
const axios = require("axios");

/* ==================================================
   CREATE ORDER
================================================== */

exports.createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      deliveryMethod,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({
        message: "No order items",
      });
    }

    let totalPrice = 0;

    const validatedItems = [];

    for (const item of orderItems) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      let finalPrice = product.price;

      // ✅ VARIANT PRICE LOGIC
      if (item.variant) {
        const match = product.variants?.find(
          (v) => v.label === item.variant
        );

        if (match) {
          finalPrice = match.price;
        }
      }

      validatedItems.push({
        product: product._id,
        name: product.name,
        qty: item.qty,
        price: finalPrice,
        variant: item.variant || null,
      });

      totalPrice += finalPrice * item.qty;
    }

    const isPickup =
      deliveryMethod === "pickup";

    const isCOD =
      paymentMethod === "cod";

    const order = await Order.create({
      user: req.user._id,

      orderItems: validatedItems,

      shippingAddress: {
        fullName:
          shippingAddress?.fullName || "",

        phone:
          shippingAddress?.phone || "",

        altPhone:
          shippingAddress?.altPhone || "",

        region:
          shippingAddress?.region || "",

        city:
          shippingAddress?.city || "",

        exactLocation:
          shippingAddress?.exactLocation || "",
      },

      paymentMethod,

      deliveryMethod,

      totalPrice,

      isPaid: false,

      paidAt: null,

      paymentResult:
        isPickup
          ? {
            reference:
              "PICKUP_ORDER",

            status: "pickup",
          }
          : isCOD
            ? {
              reference:
                "COD_ORDER",

              status: "cod",
            }
            : {},
    });

    res.status(201).json(order);

  } catch (err) {

    console.error(
      "CREATE ORDER ERROR:",
      err
    );

    res.status(500).json({
      message:
        "Failed to create order",
    });
  }
};

/* ==================================================
   GET MY ORDERS
================================================== */

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {
    console.error("GET MY ORDERS ERROR:", err);
    res.status(500).json({
      message: "Failed to fetch your orders",
    });
  }
};

/* ==================================================
   ADMIN: GET ALL ORDERS
================================================== */

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {
    console.error("GET ALL ORDERS ERROR:", err);
    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
};

/* ==================================================
   ADMIN: DELETE ORDER
================================================== */

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    await order.deleteOne();

    res.json({
      message: "Order deleted",
    });

  } catch (err) {
    console.error("DELETE ORDER ERROR:", err);
    res.status(500).json({
      message: "Failed to delete order",
    });
  }
};

/* ==================================================
   ADMIN: MARK DELIVERED
================================================== */

exports.markDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    await order.save();

    res.json(order);

  } catch (err) {
    console.error("MARK DELIVERED ERROR:", err);
    res.status(500).json({
      message: "Failed to update order",
    });
  }
};

/* ==================================================
   INIT PAYSTACK
================================================== */

exports.initPaystackPayment =
  async (req, res) => {
    try {
      const {
        email,
        amount,
        orderId,
      } = req.body;

      console.log(
        "INIT PAYMENT:",
        {
          email,
          amount,
          orderId,
        }
      );

      if (
        !email ||
        !amount ||
        !orderId
      ) {
        return res.status(400).json({
          message:
            "Missing payment fields",
        });
      }

      const cleanEmail =
        email
          ?.trim()
          ?.toLowerCase();

      const callbackUrl = `${process.env.FRONTEND_URL}/success`;

      const response =
        await axios.post(
          "https://api.paystack.co/transaction/initialize",
          {
            email: cleanEmail,

            amount: Math.round(
              amount * 100
            ),

            currency: "GHS",

            metadata: {
              orderId,
            },

            callback_url:
              callbackUrl,
          },

          {
            headers: {
              Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,

              "Content-Type":
                "application/json",
            },
          }
        );

      console.log(
        "PAYSTACK INIT RESPONSE:",
        response.data
      );

      res.json({
        success: true,

        data: response.data.data,
      });

    } catch (err) {
      console.error(
        "PAYSTACK INIT ERROR:",
        err.response?.data ||
        err.message
      );

      res.status(500).json({
        message:
          "Payment initialization failed",
      });
    }
  };

/* ==================================================
   VERIFY PAYSTACK
================================================== */

exports.verifyPaystack = async (req, res) => {
  try {
    const { reference } = req.params;

    console.log("VERIFY REQUEST RECEIVED:", reference);

    if (!reference) {
      return res.status(400).json({
        message: "Missing payment reference",
      });
    }

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const payment = response.data.data;

    console.log("PAYSTACK RESPONSE:", payment);

    if (payment.status !== "success") {
      return res.status(400).json({
        message: "Payment not successful",
      });
    }

    /* =========================
       SAFE ORDER ID EXTRACTION
    ========================= */

    const orderId =
      payment.metadata?.orderId ||
      payment.metadata?.custom_fields?.find(
        (f) => f.variable_name === "orderId"
      )?.value;

    console.log("ORDER ID:", orderId);

    if (!orderId) {
      return res.status(400).json({
        message: "Order reference missing",
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    /* =========================
       ALREADY PAID SAFETY
    ========================= */

    if (order.isPaid) {
      console.log("ORDER ALREADY PAID");
      return res.json(order);
    }

    /* =========================
       FIXED AMOUNT VALIDATION
    ========================= */

    const paidAmount = payment.amount / 100;
    const orderAmount = Number(order.totalPrice);

    console.log("PAID:", paidAmount);
    console.log("ORDER:", orderAmount);

    // Allow small rounding tolerance (VERY IMPORTANT)
    const difference = Math.abs(paidAmount - orderAmount);

    if (difference > 0.5) {
      console.log("AMOUNT MISMATCH:", difference);

      return res.status(400).json({
        message: "Payment amount mismatch",
      });
    }

    /* =========================
       MARK AS PAID
    ========================= */

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      reference: payment.reference,
      status: payment.status,
      amount: paidAmount,
    };

    await order.save();

    console.log("PAYMENT VERIFIED SUCCESSFULLY");

    res.json(order);

  } catch (err) {
    console.error("VERIFY ERROR:", err.response?.data || err.message);

    res.status(400).json({
      message:
        err.response?.data?.message ||
        "Payment verification failed",
    });
  }
};
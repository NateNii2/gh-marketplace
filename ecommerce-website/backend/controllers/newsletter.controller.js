const Subscriber = require("../models/subscriber.model");
const sendSMS = require("../services/sms.service");

/* =========================
   SUBSCRIBE USER
========================= */
exports.subscribe = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "Phone number required" });
    }

    const exists = await Subscriber.findOne({ phone });

    if (exists) {
      return res.json({ message: "Already subscribed" });
    }

    await Subscriber.create({ phone });

    // ✅ Send welcome SMS
    await sendSMS(
      phone,
      "Welcome to GH Marketplace 🎉 You will now receive updates on deals and new products."
    );

    res.json({ message: "Subscribed successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Subscription failed" });
  }
};

/* =========================
   SEND CAMPAIGN
========================= */
exports.sendCampaign = async (message) => {
  const subscribers = await Subscriber.find();

  for (const sub of subscribers) {
    try {
      await sendSMS(sub.phone, message);
    } catch (err) {
      console.error("Campaign SMS failed:", sub.phone);
    }
  }
};
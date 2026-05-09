const axios = require("axios");

const sendSMS = async (to, message) => {
  try {
    const res = await axios.get("https://sms.arkesel.com/sms/api", {
      params: {
        action: "send-sms",
        api_key: process.env.ARKESEL_API_KEY,
        to,
        from: "GHMarket",
        sms: message,
      },
    });

    console.log("SMS SENT:", res.data);
    return res.data;

  } catch (err) {
    console.error("SMS ERROR:", err.response?.data || err.message);
    throw err;
  }
};

module.exports = sendSMS;
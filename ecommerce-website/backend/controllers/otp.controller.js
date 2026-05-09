const Otp = require("../models/Otp");
const sendSMS = require("../services/sms.service");

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.sendOtp = async (req, res) => {

  const { phone } = req.body;

  const otp = generateOTP();

  await Otp.create({
    phone,
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000
  });

  await sendSMS(
    phone,
    `Your GH Marketplace OTP is ${otp}`
  );

  res.json({ message: "OTP sent" });

};

exports.verifyOtp = async (req, res) => {

  const { phone, otp } = req.body;

  const record = await Otp.findOne({ phone, otp });

  if (!record) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  if (record.expiresAt < Date.now()) {
    return res.status(400).json({ message: "OTP expired" });
  }

  await Otp.deleteMany({ phone });

  res.json({ message: "OTP verified" });

};
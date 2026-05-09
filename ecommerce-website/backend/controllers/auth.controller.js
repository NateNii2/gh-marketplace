const jwt = require("jsonwebtoken");

const User = require("../models/User");

const Otp = require("../models/Otp");

const sendSMS = require("../services/sms.service");

/* ==================================================
   TOKEN
================================================== */

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

/* ==================================================
   OTP
================================================== */

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/* ==================================================
   PHONE FORMAT
================================================== */

const formatPhone = (phone) => {

  if (!phone) return "";

  const clean = phone.replace(/\s/g, "");

  if (clean.startsWith("0")) {
    return "233" + clean.slice(1);
  }

  if (clean.startsWith("+233")) {
    return clean.slice(1);
  }

  return clean;
};

/* ==================================================
   VALIDATE EMAIL
================================================== */

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/* ==================================================
   REGISTER
================================================== */

exports.registerUser = async (req, res) => {

  try {

    let { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    name = name.trim();

    email = email.trim().toLowerCase();

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }

    const formattedPhone = formatPhone(phone);

    const existingUser = await User.findOne({
      $or: [
        { email },
        { phone: formattedPhone },
      ],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    /* NEVER AUTO CREATE ADMINS */

    const user = await User.create({
      name,
      email,
      password,
      phone: formattedPhone,
      role: "user",
      isVerified: false,
    });

    const otp = generateOTP();

    await Otp.create({
      phone: formattedPhone,
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    try {

      await sendSMS(
        formattedPhone,
        `Your verification code is ${otp}`
      );

    } catch (err) {

      console.error("SMS ERROR:", err.message);
    }

    res.status(201).json({
      message: "Account created. Verify your phone.",
      phone: formattedPhone,
    });

  } catch (err) {

    console.error(err.message);

    res.status(500).json({
      message: "Registration failed",
    });
  }
};

/* ==================================================
   VERIFY PHONE
================================================== */

exports.verifyPhone = async (req, res) => {

  try {

    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        message: "Phone and OTP required",
      });
    }

    const formattedPhone = formatPhone(phone);

    const record = await Otp.findOne({
      phone: formattedPhone,
    }).sort({ createdAt: -1 });

    if (!record) {
      return res.status(400).json({
        message: "OTP not found",
      });
    }

    if (record.expiresAt < Date.now()) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    if (record.otp !== otp.toString()) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    const user = await User.findOne({
      phone: formattedPhone,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.isVerified = true;

    await user.save();

    await Otp.deleteMany({
      phone: formattedPhone,
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });

  } catch (err) {

    console.error(err.message);

    res.status(500).json({
      message: "Verification failed",
    });
  }
};

/* ==================================================
   LOGIN
================================================== */

exports.loginUser = async (req, res) => {

  try {

    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    email = email.trim().toLowerCase();

    const user = await User.findOne({ email });

    /* ================================
       USER NOT FOUND
    ================================= */

    if (!user) {
      return res.status(401).json({
        message: "Account not found",
      });
    }

    /* ================================
       ACCOUNT LOCKED
    ================================= */

    if (user.lockUntil && user.lockUntil > Date.now()) {

      const remainingMs =
        new Date(user.lockUntil).getTime() - Date.now();

      const remainingMinutes =
        Math.ceil(remainingMs / 60000);

      return res.status(429).json({
        message:
          `Account temporarily locked. Try again in ${remainingMinutes} minute(s).`,
      });
    }

    /* ================================
       PHONE NOT VERIFIED
    ================================= */

    if (!user.isVerified) {
      return res.status(401).json({
        message: "Verify phone first",
      });
    }

    /* ================================
       CHECK PASSWORD
    ================================= */

    const valid = await user.matchPassword(password);

    /* ================================
       WRONG PASSWORD
    ================================= */

    if (!valid) {

      user.loginAttempts += 1;

      const attemptsLeft = 5 - user.loginAttempts;

      /* LOCK ACCOUNT */

      if (user.loginAttempts >= 5) {

        user.lockUntil =
          new Date(Date.now() + 15 * 60 * 1000);

        await user.save();

        return res.status(429).json({
          message:
            "Too many failed attempts. Account locked for 15 minutes.",
        });
      }

      await user.save();

      return res.status(401).json({
        message:
          `Invalid password. ${attemptsLeft} attempt(s) remaining.`,
      });
    }

    /* ================================
       SUCCESS LOGIN
    ================================= */

    user.loginAttempts = 0;

    user.lockUntil = null;

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });

  } catch (err) {

    console.error(err.message);

    res.status(500).json({
      message: "Login failed",
    });
  }
};

/* ==================================================
   PROFILE
================================================== */

exports.getProfile = async (req, res) => {

  res.json(req.user);
};
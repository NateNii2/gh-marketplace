const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const adminDashboardRoutes = require("./routes/adminDashboard.routes");

require("dotenv").config();

const connectDB = require("./config/db");

connectDB();

const app = express();

/* ==================================================
   TRUST PROXY
================================================== */

app.set("trust proxy", 1);

/* ==================================================
   SECURITY HEADERS
================================================== */

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

/* ==================================================
   BODY LIMIT
================================================== */

app.use(express.json({ limit: "10kb" }));

/* ==================================================
   SANITIZE AGAINST NOSQL INJECTION
================================================== */

app.use(mongoSanitize());

/* ==================================================
   PREVENT PARAMETER POLLUTION
================================================== */

app.use(hpp());

/* ==================================================
   GLOBAL RATE LIMIT
================================================== */

// app.use(
//   "/api/admin/dashboard",
//   adminDashboardRoutes
// );

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: {
    message: "Too many requests. Try again later.",
  },
});

app.use(limiter);

/* ==================================================
   CORS
================================================== */

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {

      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },

    credentials: true,

    methods: ["GET", "POST", "PUT", "DELETE"],

    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

/* ==================================================
   ROUTES
================================================== */

app.use("/api/product", require("./routes/product.routes"));

app.use("/api/orders", require("./routes/order.routes"));

app.use("/api/auth", require("./routes/auth.routes"));

app.use("/api/newsletter", require("./routes/newsletter.routes"));

app.use("/api/admin", require("./routes/admin.routes"));

app.use("/api/admin/dashboard", require("./routes/adminDashboard.routes"));

app.use("/api/upload", require("./routes/upload.routes"));

require("./cron/smsCampaign");

/* ==================================================
   HEALTH CHECK
================================================== */

app.get("/ping", (req, res) => {
  res.send("SERVER OK");
});

/* ==================================================
   404
================================================== */

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

/* ==================================================
   ERROR HANDLER
================================================== */

app.use((err, req, res, next) => {

  console.error(err.stack);

  res.status(500).json({
    message: "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
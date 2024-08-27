import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import helmet from "helmet"; // Import helmet for security
import rateLimit from "express-rate-limit"; // Import express-rate-limit for rate limiting


dotenv.config()
const app = express();
const PORT = process.env.PORT || 8080;


const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.PRODUCTION_FRONTEND_URL,
];



// Set up CORS
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Add security headers using Helmet
app.use(helmet());

// Set Content Security Policy (CSP)
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://js.stripe.com", "https://pay.google.com", "'unsafe-eval'"], // Adjust as needed
      imgSrc: ["'self'", "https://example-cdn.com"], // Example: Allow images from a CDN
      styleSrc: ["'self'", "https://fonts.googleapis.com"], // Example: Allow styles from Google Fonts
      fontSrc: ["'self'", "https://fonts.gstatic.com"], // Example: Allow fonts from Google Fonts
      connectSrc: ["'self'", "https://api.stripe.com", "https://www.google.com/pay"], // Example: Allow API calls to Stripe
      frameSrc: ["'self'", "https://js.stripe.com"], // Example: Allow Stripe iframes
    },
  })
);


const limiter = rateLimit({
  windowMs: 55 * 60 * 1000, 
  max: 1000, 
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api", userRoute);


// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error handler:", err.stack);
  if (err instanceof mongoose.Error) {
    return res.status(400).json({ message: 'Database error occurred' });
  }
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ message: 'CORS error: Access not allowed from this origin' });
  }
  res.status(500).json({ message: 'Something went wrong' });
});

// Database connection and server start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error:", error.message);
  });

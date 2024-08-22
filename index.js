import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import authToken from "./middleware/authToken.js"; // Import authentication middleware

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.PRODUCTION_FRONTEND_URL,
];

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

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());



app.use("/api", userRoute);


app.use((err, req, res, next) => {
  console.error("Global error handler:", err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

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

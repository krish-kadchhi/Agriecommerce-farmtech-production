const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require("mongoose");
const Item = require("./models/item.js");
const Cart = require("./models/cart.js");
const User = require("./models/user.js");
const Order = require("./models/order.js");
const ejsMate = require("ejs-mate");
const path = require("path");
const { render, cookie } = require("express/lib/response.js");
const cors = require("cors");
const bodyparser = require("body-parser");
const { name } = require("ejs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
// CORS configuration for production
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL_HTTPS
].filter(Boolean); // Remove undefined values
app.use(
  cors({
     origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }, // Or an array of allowed origins
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "UPDATE"], // This allows cookies to be sent with requests.
  })
);

app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(morgan("dev"));
app.use(bodyparser.urlencoded({ extended: true }));
//database url
const MONGO_URL = process.env.MONGODB_URI;
if (!MONGO_URL) {
  console.error("MONGODB_URI environment variable is required");
  process.exit(1);
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.use(express.static("public")); // Serve static files

const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");
const cartRoutes = require("./routes/cartRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/auth", authRoutes);
app.use("/item", itemRoutes);
app.use("/cart", cartRoutes);
app.use("/payment", paymentRoutes);
app.use("/orders", orderRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection:', err);
  process.exit(1);
});

module.exports = app;

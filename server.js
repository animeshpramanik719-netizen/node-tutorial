const express = require("express");
const app = express();

const connectDB = require("./db");
require("dotenv").config();

const bodyParser = require("body-parser");
const passport = require("./auth");

// Connect DB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());

// Logger Middleware
const logrequest = (req, res, next) => {
  console.log(`${new Date().toLocaleString()} Request made to: ${req.originalUrl}`);
  next();
};

app.use(logrequest);

// Auth Middleware
const localAuthMiddleware = passport.authenticate("local", { session: false });

// Home Route
app.get("/", localAuthMiddleware, (req, res) => {
  res.send("Welcome to my hotel... How can I help you?");
});

// Routers
const personRouter = require("./personRoutes"); // FIXED
const menuItemRoutes = require("./MenuItemsRoutes");

app.use("/person", personRouter);
app.use("/menuItem", menuItemRoutes);

// Server
const PORT = process.env.PORT || 6969;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
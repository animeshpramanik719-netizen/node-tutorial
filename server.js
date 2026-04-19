const express = require("express");
const app = express();

const connectDB = require("./db");
require("dotenv").config();

const bodyParser = require("body-parser");
const Person = require("./person");
const passport = require("./auth");

// Connect Database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());

// Logger Middleware
const logrequest = (req, res, next) => {
  console.log(`${new Date().toLocaleString()} Request Made to: ${req.originalUrl}`);
  next();
};

app.use(logrequest);

// Auth Middleware
const localAuthMiddleware = passport.authenticate('local', { session: false });

// Home Route (Protected)
app.get("/", localAuthMiddleware, (req, res) => {
  res.send("Welcome to my hotel... How can I help you?");
});

// POST Route Create Person
app.post("/person", async (req, res) => {
  try {
    const data = req.body;

    const newPerson = new Person(data);

    const response = await newPerson.save();

    console.log("Data Saved");

    res.status(200).json(response);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Routers
const personRouter = require("./personRoutes,");
const menuItemRoutes = require("./MenuItemsRoutes");

app.use("/person", personRouter);
app.use("/menuItem", menuItemRoutes);

// Server Start
const PORT = process.env.PORT || 6969;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
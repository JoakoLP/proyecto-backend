const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
require("dotenv").config();
const connect = require("./db/db");

// Routes import
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const superRouter = require("./routes/super");

app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/super", superRouter);

connect();

module.exports = app;

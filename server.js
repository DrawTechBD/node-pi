const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const cors = require("cors");

const app = express();

// ENV variable config
if(process.env.NODE_ENV !== "production") require("dotenv").config();

const PORT = process.env.PORT || 5000;

// configure body parser for ajax requests
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
// Passport
// app.use(passport.initialize());
// require("./config/auth.config")(passport);

// Database configuration
const db = process.env.MONGO_DB;

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => console.log("MongoDB Connected..."))
.catch((err) => console.error(err));

// routes
app.use("/api/iot", require("./api/iot.routes"));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} in ${process.env.NODE_ENV === "production" ? "production" : "dev"} mode...`);
})

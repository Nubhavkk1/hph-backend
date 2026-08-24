const dotenv = require('dotenv').config();
const express = require('express');
const dbConnect = require("./DB/db.Connect.js");
const authRoutes = require("./Routes/authRoutes");

const app = require("./app.js")
const port = process.env.PORT || 3000;

dbConnect();


app.listen(port, () => {
  console.log(`Server is successfully running on port ${port}`);
});


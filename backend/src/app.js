const express = require("express");
const cors = require("cors");
const studentsRoutes = require("./routes/students");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/students", studentsRoutes);

module.exports = app;
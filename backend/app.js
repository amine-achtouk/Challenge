const express = require("express");
const cors = require("cors");
const summaryRoute = require("./routes/summaryRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", summaryRoute);

module.exports = app;
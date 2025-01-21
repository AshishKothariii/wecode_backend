const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const corsConfig = require("./middleware/corsconfig");
const errorHandler = require("./middleware/errorHandler");
const routes = require("./routes");
const cookieParser = require("cookie-parser");

const app = express();
app.use(helmet());
app.use(cookieParser());
app.use(corsConfig);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});
app.use(errorHandler);

module.exports = app;

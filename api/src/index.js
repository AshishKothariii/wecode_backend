const app = require("./app");
const connectDB = require("./db/db");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3000;
connectDB();
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

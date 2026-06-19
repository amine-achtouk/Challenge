require("dotenv").config();
console.log("Loaded KEY:", process.env.OPENROUTER_API_KEY);
const app = require("./app");
const connectDB = require("./config/db");

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log(process.env);
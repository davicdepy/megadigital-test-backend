const cors = require("cors");
const express = require("express");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API de Reservas." });
});

require("./app/routes/index.routes.js")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API de Reservas is running on port ${PORT}.`);
});

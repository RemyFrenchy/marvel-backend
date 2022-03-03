const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(formidable());
require("dotenv").config();

app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

const userRoutes = require("./routes/user");
app.use(userRoutes);

const charactersRoutes = require("./routes/characters");
app.use(charactersRoutes);

const comicsRoutes = require("./routes/comics");
app.use(comicsRoutes);

const favoriteRoutes = require("./routes/favorite");
app.use(favoriteRoutes);

app.get("/", (req, res) => {
  res.json("Bienvenue sur l'API Marvel");
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page inexistante" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server Started on port: ${process.env.PORT}`);
});

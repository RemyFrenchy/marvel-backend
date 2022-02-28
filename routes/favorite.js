const express = require("express");
const formidable = require("express-formidable");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express.Router();
const Favorite = require("../models/Favorite");
const User = require("../models/User");

router.post("/favorite/addCharacters", isAuthenticated, async (req, res) => {
  try {
    const { name, description, image } = req.fields;
    const favorite = await Favorite.findOne({ name: name });

    if (!favorite) {
      const newFavorite = new Favorite({
        name: name,
        description: description,
        image: image,
        owner: req.user,
      });
      await newFavorite.save();
      res.status(200).json({ newFavorite });
    } else {
      res.status(409).json({ message: "Personnage déjà ajouté aux favoris" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/favorite/addComics", isAuthenticated, async (req, res) => {
  try {
    const { title, description, image } = req.fields;
    const favorite = await Favorite.findOne({ image: image });

    if (!favorite) {
      const newFavorite = new Favorite({
        title: title,
        description: description,
        image: image,
        owner: req.user,
      });
      await newFavorite.save();
      res.status(200).json({ newFavorite });
    } else {
      res.status(409).json({ message: "Comics déjà ajouté aux favoris" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;

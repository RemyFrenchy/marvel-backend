const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/comics", async (req, res) => {
  try {
    let title = "";

    let page = req.query.page;

    if (req.query.title) {
      title = req.query.title;
    } else {
      title = "";
    }
    if (req.query.page > 1) {
      skip = page * 100 - 100;
    } else {
      skip = 0;
    }

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}&title=${title}&skip=${skip}&page=${page}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/comics/:characters", async (req, res) => {
  try {
    const characters = req.params.characters;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characters}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.status(200).json(response.data.title);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/comic/:comicId", async (req, res) => {
  try {
    const comicId = req.params.comicId;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${comicId}?&apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.status(200).json(response.data);
    console.log(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

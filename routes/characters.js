const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/characters", async (req, res) => {
  try {
    let name = "";

    let page = req.query.page;

    if (req.query.name) {
      name = req.query.name;
    }
    if (req.query.page > 1) {
      skip = page * 100 - 100;
    } else {
      skip = 0;
    }

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}&name=${name}&skip=${skip}&page=${page}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/character/:characterId", async (req, res) => {
  try {
    const characterId = req.params.characterId;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?&apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.status(200).json(response.data);
    console.log(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encbase64 = require("crypto-js/enc-base64");

const User = require("../models/User");

router.post("/user/signup", async (req, res) => {
  try {
    const email = req.fields.email;
    const password = req.fields.password;

    if (email) {
      const user = await User.findOne({ email: email });
      if (!user) {
        const salt = uid2(64);
        const hash = SHA256(password + salt).toString(encbase64);
        const token = uid2(64);

        const newUser = new User({
          email: email,
          token: token,
          salt: salt,
          hash: hash,
        });
        await newUser.save();
        res.status(200).json({
          _id: newUser._id,
          email: newUser.email,
          token: newUser.token,
        });
      } else {
        res
          .status(409)
          .json({ message: "un compte avec cet email existe déjà" });
      }
    } else {
      res.status(400).json({ message: "email ou mot de passe manquant" });
    }
  } catch (error) {
    ({ message: error.message });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.fields.email });
    if (user) {
      const newHash = SHA256(req.fields.password + user.salt).toString(
        encbase64
      );

      if (newHash === user.hash) {
        res
          .status(200)
          .json({ _id: user._id, token: user.token, email: user.email });
      } else {
        res.status(401).json({ message: "Accés non autorisé" });
      }
    } else {
      res.status(401).json({ message: "Accés non autorisé" });
    }
  } catch (error) {
    ({
      message: error.message,
    });
  }
});

module.exports = router;

const mongoose = require("mongoose");
const Favorite = mongoose.model("Favorite", {
  name: String,
  title: String,
  description: String,
  image: { type: mongoose.Schema.Types.Mixed, default: {} },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Favorite;

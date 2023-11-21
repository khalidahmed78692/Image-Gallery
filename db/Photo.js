const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  images: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = new mongoose.model("photos", photoSchema);

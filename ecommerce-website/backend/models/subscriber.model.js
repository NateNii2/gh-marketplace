const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema({

  phone: {
    type: String,
    required: true,
    unique: true
  }

});

module.exports = mongoose.model("Subscriber", subscriberSchema);
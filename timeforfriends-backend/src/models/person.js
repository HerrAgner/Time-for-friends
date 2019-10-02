const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let personSchema = new Schema({
  name: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    }
  },
  phoneNumber: {
    type: [String],
    required: true
  },
  email: {
    type: [String],
    required: true
  },
  location: {
      country: {
          type: String,
          required: true
      },
      city: {
          type: String,
          required: true
      },
      timeZone: {
          type: String,
          required: true
      }
  }
});

module.exports = mongoose.model("person", personSchema);

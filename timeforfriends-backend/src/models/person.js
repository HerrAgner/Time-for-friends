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
    type: String,
    required: true
  },
  email: {
    type: String,
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

// class personClass {
//   // getName() {
//   //   return `My name is ${this.name}. I am ${this.age} years old. I live in ${
//   //     this.town
//   //   }`;
//   // }
//   //
//   // sayBye() {
//   //   return `${this.name} says 'Bye, bye'!`;
//   // }
// }
//
// personSchema.loadClass(personClass);
// export the mongoose model as our module
module.exports = mongoose.model("person", personSchema);

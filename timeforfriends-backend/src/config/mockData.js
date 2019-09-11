const dbData = require("../MOCK_DATA");
const Person = require("../models/person")
const mongoose = require("mongoose")

printAll = (e) => {
  console.log(dbData);
};

postAll = () => {
    db.dropCollection('people')
    mongoose.model("person").create(dbData).then(console.log("Database collection dumped and updated."))
}

module.exports = {printAll, postAll};

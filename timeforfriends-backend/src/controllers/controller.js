const mongoose = require("mongoose");

const getAllFromCollection = (req, res) => {
  try {
    mongoose
      .model(req.params.collection)
      .find()
      .then(item => {
        res.json(item);
      });
  } catch (e) {
    res.status(404).json("Could not find collection: ", req.params.collection);
  }
};

const getOneFromCollection = (req, res) => {
  mongoose
    .model(req.params.collection)
    .findOne({ _id: req.params.id })
    .then(item => {
      res.json(item);
    })
    .catch(err => {
      console.error(err);
      err.reason = "person not found";
      res.status(404).json(err);
    });
};

const getOneAndUpdate = (req, res) => {
  mongoose
    .model(req.params.collection)
    .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(item => {
      res.json(item);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
};

const postOneToCollection = (req, res) => {
  mongoose
    .model(req.params.collection)
    .create(req.body)
    .then(item => {
      res.json(item);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
};

const deleteOneFromCollection = (req, res) => {
  mongoose
    .model(req.params.collection)
    .deleteOne({ _id: req.params.id })
    .then(item => {
      item.n > 0
        ? res.json(item)
        : res.json("No matches. Light a fire with something else.");
    })
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
};

const findOneAndPopulate = (req, res) => {
  let firstName = req.query.firstName;
  let lastName = req.query.lastName;
  let populate;
  if (req.query.populate) {
    populate = req.query.populate;
    if (populate[0] === null) {
      populate[0] = "";
    }
  }
  mongoose
    .model(req.params.collection)
    .findOne({ "name.firstName": firstName, "name.lastName": lastName })
    .populate(populate)
    .then(item => {
      res.json(item);
    })
    .catch(err => {
      console.error(err);
      err.reason = "person not found";
      res.status(404).json(err);
    });
};

module.exports = {
  getAllFromCollection,
  getOneFromCollection,
  getOneAndUpdate,
  postOneToCollection,
  deleteOneFromCollection,
  findOneAndPopulate

};

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// const Person = require("../models/Person");

router.get("/api", (req, res) => {
    res.json("hehe")
});

router.get("/api/:collection", (req, res) => {
    mongoose
        .model(req.params.collection)
        .find()
        .lean()
        // .populate("pets", "name age")
        .then(item => {
            res.json(item);
            // console.log(item);
        });
});

router.get("/api/:collection/:id", (req, res) => {
    mongoose
        .model(req.params.collection)
        .findOne({ _id: req.params.id })
        // .populate("pets", "name age")
        .then(item => {
            res.json(item);
            // console.log(item);
        })
        .catch(err => {
            console.error(err);
            err.reason = "person not found";
            res.status(404).json(err);
        });
});

router.get("/search/:collection/", (req, res) => {
    console.log(req.query);
    let name = JSON.parse(decodeURIComponent(req.query.name));
    let populate;
    if (req.query.populate) {
        populate = JSON.parse(decodeURIComponent(req.query.populate));
        if (populate[0] === null) {
            populate[0] = "";
        }
    }
    mongoose
        .model(req.params.collection)
        .findOne(name)
        .populate(populate)
        .then(item => {
            res.json(item);
            // console.log(item);
        })
        .catch(err => {
            console.error(err);
            err.reason = "person not found";
            res.status(404).json(err);
        });
});

router.put("/api/:collection/:id", (req, res) => {
    mongoose
        .model(req.params.collection)
        .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(item => {
            res.json(item);
            console.log(item);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
});

router.post("/api/:collection", (req, res) => {
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
});

router.delete("/api/:collection/:id", (req, res) => {
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
});
module.exports = router;
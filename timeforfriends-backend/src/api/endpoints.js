const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// const dotenv = require("dotenv").config()
// const axios = require("axios")


// router.get("/api/map", async (req, res) => {
//         // let url = `https://geocoder.api.here.com/6.2/geocode.json?app_id=${process.env.HERE_API_ID}&app_code=${process.env.HERE_API_CODE}&searchtext=${req.query.search}`
//         // const request = axios.get(url)
//         // return request.then(response => res.json(response.data.Response.View[0].Result[0].Location))
//         await res.json(process.env.REACT_APP_API_KEY)
// });

router.get("/api/search/:collection/", (req, res) => {
    console.log(Object.keys(req.query)[0]);
    // let name = JSON.parse(decodeURIComponent(req.query.name));
    let firstName = req.query.firstName
    let lastName = req.query.lastName
    let populate;
    if (req.query.populate) {
        // populate = JSON.parse(decodeURIComponent(req.query.populate));
        populate = req.query.populate
        if (populate[0] === null) {
            populate[0] = "";
        }
    }
    mongoose
        .model(req.params.collection)
        .findOne({'name.firstName': firstName})
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

router.get("/api/:collection", (req, res) => {
    try {
        mongoose
            .model(req.params.collection)
            .find()
            .then(item => {
                res.json(item);
                // console.log(item);
            })
    } catch(e) {
        res.status(404).json("error yoyo");
    }
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
console.log(req.body);
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
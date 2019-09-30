const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

// Get all
router.get("/api/:collection", (req, res) => controller.getAllFromCollection(req,res));

// Get one
router.get("/api/:collection/:id", (req, res) => controller.getOneFromCollection(req, res));

// Update one
router.put("/api/:collection/:id", (req, res) => controller.getOneAndUpdate(req, res));

// Post new item to collection
router.post("/api/:collection", (req, res) => controller.postOneToCollection(req, res));

// Delete from collection
router.delete("/api/:collection/:id", (req, res) => controller.deleteOneFromCollection(req, res));

// Not used at the moment. Can be used for searching and populating.
router.get("/api/search/:collection/", (req, res) => controller.findOneAndPopulate(req, res));

module.exports = router;
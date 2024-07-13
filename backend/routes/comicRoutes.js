const express = require("express");
const comicController = require("../controllers/comicController");

const router = express.Router();

router.post("/generate", comicController.generateComic);

module.exports = router;

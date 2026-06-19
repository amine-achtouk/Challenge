const express = require("express");
const router = express.Router()
const { summarizeText } = require('../controllers/summaryController')

router.post("/summarize", summarizeText);

module.exports = router;
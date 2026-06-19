const mongoose = require('mongoose')

const summarySchema = new mongoose.Schema({
    originalText: { type: String, required: true },
    summaryText : [String]
}, {timestamps : true})

module.exports = mongoose.model('Summary', summarySchema)
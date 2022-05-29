const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const schema = new Schema({
    title: String,
    image: String,
    institution: String,
    address: String,
    timeline: String,
    description: String,
    activities: String,
    user: String,
    graduation: String,
    achievement: String,
    url: String,
    role: String,
}, {timestamps: true, versionKey: false, collection: 'organization'});

module.exports = mongoose.model('organization', schema);
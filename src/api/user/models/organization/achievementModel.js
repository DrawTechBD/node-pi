const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const schema = new Schema({
    title: String,
    logo: String,
    images: String,
    institution: String,
    address: String,
    timeline: String,
    description: String,
    activities: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    achievement: String,

}, {timestamps: true, versionKey: false, collection: 'achievement'});

module.exports = mongoose.model('achievement', schema);
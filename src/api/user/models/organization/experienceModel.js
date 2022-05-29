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
    role: String,

}, {timestamps: true, versionKey: false, collection: 'experience'});

module.exports = mongoose.model('experience', schema);
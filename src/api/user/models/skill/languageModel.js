const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const schema = new Schema({
    title: String,
    image: String,
    fluency: String,
    description: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, {timestamps: true, versionKey: false, collection: 'language'});

module.exports = mongoose.model('language', schema);
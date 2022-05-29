const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const schema = new Schema({
    title: String,
    image: String,
    fluency: String,
    description: String,
    language: {
        type: Schema.Types.ObjectId,
        ref: 'language',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, {timestamps: true, versionKey: false, collection: 'framework'});

module.exports = mongoose.model('framework', schema);
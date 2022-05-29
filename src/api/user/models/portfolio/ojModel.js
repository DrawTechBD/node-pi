const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const schema = new Schema({
    title: String,
    icon: String,
    progress: String,
    url: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, {timestamps: true, versionKey: false, collection: 'o_j'});

module.exports = mongoose.model('o_j', schema);
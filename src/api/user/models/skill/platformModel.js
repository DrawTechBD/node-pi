const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const schema = new Schema({
    title: String,
    image: String,
    fluency: String,
    description: String,
    frameworks: [{
        type: Schema.Types.ObjectId,
        ref: 'framework',
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, {timestamps: true, versionKey: false, collection: 'platform'});

module.exports = mongoose.model('platform', schema);
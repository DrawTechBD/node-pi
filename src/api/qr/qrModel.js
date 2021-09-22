const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const enums = require('../../helper/enums');

const LOG = "CHAT_INFO_MODEL";

const chatRequestSchema = new Schema({
  'owner': {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
}, {timestamps: true, toJSON: {virtuals: true}, versionKey: false });

module.exports = mongoose.model('qr', chatRequestSchema);

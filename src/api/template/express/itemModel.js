const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const itemModel = new Schema({

},{timestamps : true});

module.exports = mongoose.model('item', itemModel);


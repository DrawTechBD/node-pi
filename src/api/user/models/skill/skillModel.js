const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const skillSchema = new Schema({
	title : {
		type: String,
		required: true
	},
	percentage : {
		type: Number,
		default: 0,
	},
	description: String,
},{timestamps: true, versionKey: false});

module.exports = mongoose.model('userSkill', skillSchema);


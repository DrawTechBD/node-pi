const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const experienceSchema = new Schema({
	institution : {
		type: String,
		default: "",
	},
	address: {
		type: String,
		default: "",
	},
	role : {
		type: String,
		default: "",
	},
	start: {
		type: String,
		default: null,
	},
	end: {
		type: String,
		default: null,
	},
	description: {
		type: String,
		default: "",
	},
	activities : {
		type: String,
		default: "",
	}
},{timestamps: true, versionKey: false});

module.exports = mongoose.model('userExperience', experienceSchema);


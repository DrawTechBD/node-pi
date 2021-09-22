const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const volunteeringSchema = new Schema({
	institution : {
		type: String,
		default: '',
	},
	address : {
		type: String,
		default: '',
	},
	role : {
		type: String,
		default: '',
	},
	start : {
		type: String,
		default: '',
	},
	end : {
		type: String,
		default: '',
	},
	description : {
		type: String,
		default: '',
	},
	activities : {
		type: String,
		default: '',
	}
},{timestamps: true, versionKey: false});

module.exports = mongoose.model('userVolunteering', volunteeringSchema);


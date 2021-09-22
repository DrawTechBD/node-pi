const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const educationSchema = new Schema({
	title : {
		type: String,
		required: true,
	},
	institution: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		default: '',
	},
	start: {
		type: String,
		default: null,
	},
	end: {
		type: String,
		default: null,
	},
	description : {
		type: String,
		default: '',
	},
	activities: {
		type: String,
		default: ''
	}
},{timestamps: true, versionKey: false});

module.exports = mongoose.model('userEducation', educationSchema);


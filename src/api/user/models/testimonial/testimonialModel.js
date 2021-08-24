const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const testimonialSchema = new Schema({
	name : {
		type: String,
		required: true,
	},
	title : {
		type: String,
		default: '',
	},
	avatar : {
		type: String,
		default: '',
	},
	message : {
		type: String,
		default: '',
	},
	approved : {
		type: Boolean,
		default: false,
	}
},{timestamps: true, versionKey: false});

module.exports = mongoose.model('userTestimonial', testimonialSchema);


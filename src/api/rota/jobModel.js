const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const jobSchema = new Schema({
	company: {
		type: String,
		required: true
	},
	salary: {
		type: Number,
	},
	role: {
		type: String,
	},
}, {timestamps: true});

module.exports = mongoose.model('job', jobSchema);

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const portfolioSchema = new Schema({
	title : {
		type: String,
		required: true,
	},
	images : [{
		type: String,
		default: []
	}],
	description : {
		type: String,
		default: '',
	},
	keywords : [{
		type: String,
		default: []
	}],
	link : {
		type: String,
		default: '',
	}
},{timestamps: true, versionKey: false});

module.exports = mongoose.model('userPortfolio', portfolioSchema);


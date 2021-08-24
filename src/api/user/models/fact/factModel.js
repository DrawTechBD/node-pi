const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const factSchema = new Schema({
	quantity : {
		type: String,
		default: '',
	},
	title : {
		type: String,
		required: true,
	},
	subtitle : {
		type: String,
	}
},{timestamps: true, versionKey: false});

module.exports = mongoose.model('userFact', factSchema);


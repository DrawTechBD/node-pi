const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const socialSchema = new Schema({
	name : {
		type: String,
		required: true,
	},
	link : {
		type: String,
		required: true,
	},
	icon : {
		type: String,
		default: null,
	}
},{timestamps: true, versionKey: false});

module.exports = mongoose.model('userSocial', socialSchema);


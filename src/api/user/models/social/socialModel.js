const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const socialSchema = new Schema({
	name : {
		type: String,
		required: true,
	},
	url : {
		type: String,
		required: true,
	},
	icon : {
		type: Number,
		default: null,
	},
	user: {type: Schema.Types.ObjectId, ref: 'user'}
},{timestamps: true, versionKey: false, collection: 'social'});

module.exports = mongoose.model('social', socialSchema);


const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const rotaSchema = new Schema({
	'job' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'job'
	},
	'start_date' : Date,
	'week_no' : Number,
	'start' : Number,
	'end' : Number,
	'end_type' : String,
	'shift_start' : Number,
	'shift_end' : Number
}, {timestamps: true});

module.exports = mongoose.model('rota', rotaSchema);

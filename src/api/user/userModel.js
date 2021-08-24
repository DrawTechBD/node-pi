const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const bcrypt = require('bcryptjs');
const bcryptSalt = process.env.BCRYPT_SALT;

const userSchema = new Schema({
	name: {
		type: String,
		default: "",
	},
	phone: {
		type: String,
		default: "",
	},
	email: {
		type: String,
		// Figure out how to replace being unique
		// unique: true,
	},
	messenger: {
		type: String,
		default: "",
	},
	password: {
		type:String,
		select: false,
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	active: {
		type: Boolean,
		default: false,
	},
	lastActive: {
		type: Date,
		default: Date.now,
	},
	avatar: String,
	cover: String,
	token: String,
	expiresIn: Date,
	location: {
		latitude: Number,
		longitude: Number,
		address: {
			type: String,
		},
	},
	about: {
		type: String,
		default: "",
	},
	dob: {
		type: Date,
		default: null,
	},
	title: {
		type: String,
		default: "",
	},
	educations: [
		{
			type: Schema.Types.ObjectId,
			ref: "userEducation",
		}
	],
	experiences: [
		{
			type: Schema.Types.ObjectId,
			ref: "userExperience",
		}
	],
	facts: [
		{
			type: Schema.Types.ObjectId,
			ref: "userFact",
		}
	],
	portfolios: [
		{
			type: Schema.Types.ObjectId,
			ref: "userPortfolio",
		}
	],
	skills: [
		{
			type: Schema.Types.ObjectId,
			ref: "userSkill",
		}
	],
	socials: [
		{
			type: Schema.Types.ObjectId,
			ref: "userSocial",
		}
	],
	testimonials: [
		{
			type: Schema.Types.ObjectId,
			ref: "userTestimonial",
		}
	],
	volunteerings: [
		{
			type: Schema.Types.ObjectId,
			ref: "userVolunteering",
		}
	],
}, {timestamps: true, versionKey: false});

// TODO: Replace the hash from other places to here
userSchema.pre('save', async function(next) {
	if(!this.isModified('password')){
		return next();
	}
	this.password = await bcrypt.hash(this.password, Number(bcryptSalt));
	next();
});

module.exports = mongoose.model('user', userSchema);

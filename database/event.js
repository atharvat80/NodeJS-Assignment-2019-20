const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	date:{
		type: String,
		required: true
	},
	time:{
		type: String,
		required: true
	},
	location:{
		type: String,
		required: true
	},
	createdBy:{
		type: String,
		default: 'Unknown'
	},
	details:{
		type: String,
		default: 'No details provided'
	},
	attending:{
		type: String,
	}	
});

module.exports = mongoose.model("event", EventSchema);
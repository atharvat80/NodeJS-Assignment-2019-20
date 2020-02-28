const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	dateTime:{
		type: Date,
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
		required: true
	}
});

module.exports = mongoose.model("event", EventSchema);
const Event = require("./event");

exports.listAllEvents = (req, res) => {
	var today = new Date().toISOString().split("T")[0];
	Event.find({date: {$gt: today}}, null, {sort: {date: 1}}, (err, event) => {
	if (err) {
		res.status(500).send(err);
	}
		res.status(200).json(event);
	});
};

exports.createNewEvent = (req, res) => {
	let newEventInfo = {
		name: req.body.nameInp,
		date: req.body.dateInp,
		time: req.body.timeInp.slice(0,5),
		location: req.body.locInp,
		createdBy: req.body.createdBy,
		details: req.body.detailsInp,
		attending: req.body.createdBy
	}
	let newEvent = new Event(newEventInfo);
	newEvent.save((err, event) => {
	if (err) {
		res.status(500).send(err);
	}
	res.status(201).send('Your event has been created!');
	});
};

exports.updateEvent = (req, res) => {
	Event.findByIdAndUpdate(
		{ _id: req.body._id},
		{
			name: req.body.name,
			date: req.body.date,
			time: req.body.time,
			location: req.body.location,
			createdBy: req.body.createdBy,
			details: req.body.details,
			attending: req.body.attending+','+req.body.currentUser,
		},
		function(err, result) {
			if (err) {
				res.send(err);
			} else {
				res.send('Your attendance has been recorded.');
			}
		}
	);
};
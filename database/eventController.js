const Event = require("./event");

exports.listAllEvents = (req, res) => {
	var today = new Date().toISOString().split("T")[0];
	Event.find({date: {$gt: today}}, (err, event) => {
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
	}
	let newEvent = new Event(newEventInfo);
	newEvent.save((err, event) => {
	if (err) {
		res.status(500).send(err);
	}
	res.status(201).send('Your event has been created!');
	});
};

exports.findEvent = (req, res) => {
	console.log('search request')
	// var field = req.body.criteria;
	// if (field === 'location'){
	// 	Event.find({name: req.body.key}, (err, event) => {
	// 		if (err) {
	// 			res.status(500).send(err);
	// 		}
	// 			res.status(200).json(event);
	// 	});	
	// }
};

// exports.updateEvent = (req, res) => {
// 	Event.findOneAndUpdate(
// 	{ _id: req.params.eventid },
// 	req.body,
// 	{ new: true },
// 	(err, event) => {
// 		if (err) {
// 		res.status(500).send(err);
// 		}
// 		res.status(200).json(event);
// 	}
// 	);
// };

// exports.deleteEvent = (req, res) => {
// 	Event.remove({ _id: req.params.eventid }, (err, event) => {
// 	if (err) {
// 		res.status(404).send(err);
// 	}
// 	res.status(200).json({ message: "Event successfully deleted" });
// 	});
// };
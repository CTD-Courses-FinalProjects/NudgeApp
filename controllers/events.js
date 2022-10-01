const Event = require("../models/Event");
// const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");


const render_dashboard = (req, res) => {
  res.render("pages/dashboard");
};
const render_addEvent = (req, res) => {
  res.render("pages/addEvent");
};

const render_myEvents = async (req, res) => {
  try{
  const events = await Event.find({ createdBy: req.user._id }).sort("eventDate");
  if(events) {
    res.render("pages/myEvents", {events});
  }else {
    req.flash("error_msg", "There are no events. Please add some.");
    res.render("pages/myEvents", { events: [] });
  }
  
  } catch (err) {
    req.flash("error", "Something went wrong rendering myEvents page.");
    res.render("pages/myEvents", { events: [] });
  }
};

const searchedEvents = async(req, res) => {
  try{
  const searchedField = req.query.dsearch;
  const events = await Event.find({title:{'$regex':searchedField, $options: "i"}});
  if(events) {
    res.render("pages/myEvents", {events});
  }else {
    req.flash("error_msg", "No matching results found.");
     res.render("pages/myEvents", { events: [] });
  }
  } catch (err) {
    req.flash("error", "Something went wrong rendering myEvents page."); 
  }
};


const createEvent = async (req, res, next) => {
  const data = req.body;
  data.createdBy = req.user._id;
  console.log(data, "Cre event")
  try {
    if (data.eventDate) {
      req.body.eventDate = new Date(data.eventDate);
    }
    await Event.create(req.body);
    req.flash("success_msg", "Your event was created.");
    res.redirect("/api/v1/events/myEvents");
  } catch (err) {
    console.log("Error has occured")
    return next(err);
  }
};

const getEvent = async (req, res, next) => {
  try {
    const {
      user: {_id: userId},
      params: { id: eventId },
    } = req;
    const event = await Event.findOne({
      _id: eventId,
      createdBy: userId,
    });

    if (!event) {
      throw new NotFoundError(`Couldn't find event with id ${eventId}`);
    } else{
    res.render("pages/editEvent", { event });
    }
  } catch (err) {
    res.locals.message = "Something went wrong in getting single event.";
    return next(err);
  }
};

const updateEvent = async (req, res, next) => {
  console.log(req.body)
  try {
  const {
    body:{title, eventType, eventDate},
    user: { _id: userId },
    params: { id: eventId },
  } = req;

  if (title === "" || eventType === "" || eventDate === "") {
    throw new BadRequestError("Data fields cannot be empty");
  }

  const updatedEvent = await Event.findByIdAndUpdate(
    { _id: eventId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedEvent) {
    throw new NotFoundError(`No job with id ${eventId}`);
  }
  req.flash("success_msg", `Event: ${title}, was updated.`);
  res.redirect("/api/v1/events/myEvents");
}catch (err) {
  console.log("Error has occured")
  req.flash("error_msg", "Event was not updated. Something went wrong");
  return next(err);
}
};

const deleteEvent = async (req, res, next) => {
try{
  const {
    user: {_id: userId},
    params: { id: eventId },
  } = req;

  const event = await Event.findByIdAndRemove({
    _id: eventId,
    createdBy: userId,
  });

  if (!event) {
    throw new NotFoundError(`No job with id ${eventId}`);
  }
  req.flash("success_msg", "The entry was deleted.");
  // res.status(StatusCodes.OK).json({msg: "The entry was deleted."})
  res.redirect("/api/v1/events/myEvents");
}catch (err) {
    console.log("Error has occured")
    return next(err);
  }
};

module.exports = {
  render_dashboard,
  render_addEvent,
  render_myEvents,
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
  searchedEvents
};

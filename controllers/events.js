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
  res.render("pages/myEvents", {events});
  } catch (err) {
    req.flash("locals.errors", "Something went wrong rendering myEvents page.");
    res.render("pages/myEvents", { events: [] });
  }
};

const createEvent = async (req, res, next) => {
  const data = req.body;
  data.createdBy = req.user._id;
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
  console.log(userId, eventId)
    const event = await Event.findOne({
      _id: eventId,
      createdBy: userId,
    });
    console.log("Event: ", event)
    if (!event) {
      throw new NotFoundError(`Couldn't find event with id ${eventId}`);
    } else{
      console.log(event.eventDate.toDateString(), "date")
    res.render("pages/editEvent", { event });
    }
  } catch (err) {
    res.locals.message = "Something went wrong.";
    return next(err);
  }
};

const updateEvent = async (req, res, next) => {
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
};

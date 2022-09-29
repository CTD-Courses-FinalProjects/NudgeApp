const Event = require("../models/Event");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const render_restricted = (req, res) => {
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
    req.flash("locals.errors", "Something went wrong.");
    res.render("pages/myEvents", { events: [] });
  }
};

const createEvent = async (req, res, next) => {
  const data = req.body;
  console.log(data)
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

const getEvent = async (req, res) => {
  try {
    const tasks = await Event.find();
    res.render("pages/tasks", { tasks });
  } catch (err) {
    res.locals.message = "Something went wrong.";
    res.render("pages/tasks", { tasks: [] });
  }
};

const updateEvent = async (req, res) => {
  const {
    body: {company, product},
    user: { userId },
    params: { id: eventid },
  } = req;

  if (company === "" || position === " ") {
    throw new BadRequestError("Company or Position fields cannot be empty");
  }

  const job = await Event.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ job });
};

const deleteEvent = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Event.findByIdAndRemove({
    _id: jobId,
    createdBy: userId,
  });

  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ msg: "The entry was deleted." });
};

module.exports = {
  render_restricted,
  render_addEvent,
  render_myEvents,
  createEvent,
  getEvent,
  deleteEvent,
};

// const Event = require("../models/Event");
// const { StatusCodes } = require("http-status-codes");
// //const { BadRequestError, NotFoundError } = require("../errors");

// const getEvents = async (req, res) => {
//     const jobs = await Event.find({ createdBy: req.user.userId }).sort("createdAt");
//     res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
//   };

//   const createEvent = async (req, res) => {
//     req.body.createdBy = req.user.userId;
//     const job = await Event.create(req.body);
//     res.status(StatusCodes.CREATED).json({ job });
//   };

//   module.exports = {
//     getEvents,
//     createEvent,    
//   };
const express = require("express");
const router = express.Router();
const {
  render_dashboard,
  render_addEvent,
  render_myEvents,
  getEvent,
  updateEvent,
  createEvent,
  deleteEvent,
  searchedEvents
  
} = require("../controllers/events");

router.route("/dashboard").get(render_dashboard);
router.route("/myEvents").get(render_myEvents);
router.route("/addEvent").get(render_addEvent).post(createEvent);
router.route("/editEvent/:id").get(getEvent).post(updateEvent)
router.route("/deleteEvent/:id").get(deleteEvent);
router.route("/search").get(searchedEvents);

module.exports = router;

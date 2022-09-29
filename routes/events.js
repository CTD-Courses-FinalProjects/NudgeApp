const express = require("express");
const router = express.Router();
const {
  render_restricted,
  render_addEvent,
  render_myEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  
} = require("../controllers/events");

router.route("/dashboard").get(render_restricted);
router.route("/myEvents").get(render_myEvents)
router.route("/addEvent").get(render_addEvent).post(createEvent);
router
  .route("/event/:id")
  .get(getEvent)
  .patch(updateEvent)
  .delete(deleteEvent);

module.exports = router;

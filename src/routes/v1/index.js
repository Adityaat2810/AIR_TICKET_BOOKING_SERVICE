const express = require("express");
const {BookingController} = require('../../controllers/index')
// const { createChannel } = require('../../utils/messageQueue')

// const channel =await createChannel()

const bookingController = new BookingController()
const router = express.Router();

router.post('/bookings',bookingController.create)
// sample publisher of message for demo 
router.post('/publish',bookingController.sendMessageToQueue)

module.exports = router;

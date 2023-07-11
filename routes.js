const express = require('express');
const moment = require('moment'); // Import the Moment library for date/time manipulation
const { meetingRooms, users } = require('./rooms');

const router = express.Router();

// http://localhost:3000/book
// Endpoint to book a room
router.post('/book', (req, res) => {
  const { user, room, date } = req.body;

  // Checks if user is valid
  if (!users.includes(user)) {
    res.status(400).json({ message: 'Invalid user' });
    return;
  }

// Checks to see if the room is valid
const isValidRoom = meetingRooms.some(booking => booking.name === room);

if (!isValidRoom) { 
  res.status(400).json({ message: 'Invalid Room' });
  return;
}


  // Checks to see if the room is already booked for the given date
  const isBooked = meetingRooms.some(booking => {
    return booking.name === room && moment(booking.date).isSame(date, 'day');
  });

  if (isBooked) {
    res.status(409).json({ message: 'Room is already booked for the given date' });
  } else {
    // Book the room
    meetingRooms.push({ name: room, date });

    const bookingMessage = `${user} Books Room ${room} for ${moment(date).format('D MMMM')}.`; //method call on the Moment.js object. MMMM full months name
    res.status(200).json({ message: bookingMessage });
  }
});

// http://localhost:3000/availability?date=2023-07-08

// API endpoint to get available rooms for a specific date
router.get('/availability', (req, res) => {
  const { date } = req.query 

  // Filter booked rooms for the given date
  const bookedRooms = meetingRooms
    .filter(booking => moment(booking.date).isSame(date, 'day'))
    .map(booking => booking.name);

  // Get all rooms
  const allRooms = ['A', 'B', 'C', 'D'];

  // Calculate available rooms by removing booked rooms
  const availableRooms = allRooms.filter(room => !bookedRooms.includes(room));

  res.status(200).json({ availableRooms });
});

module.exports = router;

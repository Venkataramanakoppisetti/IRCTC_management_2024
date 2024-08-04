const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/book', authenticate, bookingController.bookSeat);
router.get('/details/:bookingId', authenticate, bookingController.getBookingDetails);

module.exports = router;

const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainController');
const { authenticateAdmin } = require('../middleware/authMiddleware');

router.post('/add', authenticateAdmin, trainController.addTrain);
router.get('/availability', trainController.getSeatAvailability);

module.exports = router;

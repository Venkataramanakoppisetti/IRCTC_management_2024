const db = require('../config/database');

// Book a Seat
exports.bookSeat = (req, res) => {
  const { trainId, seatsBooked } = req.body;
  const userId = req.user.id;

  db.serialize(() => {
    db.get('SELECT availableSeats FROM Train WHERE id = ?', [trainId], (err, train) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!train) return res.status(404).json({ error: 'Train not found' });
      if (train.availableSeats < seatsBooked) return res.status(400).json({ error: 'Not enough seats' });

      // Transaction to handle race conditions
      db.run('BEGIN TRANSACTION');
      db.run('UPDATE Train SET availableSeats = availableSeats - ? WHERE id = ?', [seatsBooked, trainId], (err) => {
        if (err) {
          db.run('ROLLBACK');
          return res.status(500).json({ error: err.message });
        }

        db.run('INSERT INTO Booking (userId, trainId, seatsBooked) VALUES (?, ?, ?)', [userId, trainId, seatsBooked], (err) => {
          if (err) {
            db.run('ROLLBACK');
            return res.status(500).json({ error: err.message });
          }

          db.run('COMMIT');
          res.status(201).json({ trainId, seatsBooked });
        });
      });
    });
  });
};

// Get Specific Booking Details
exports.getBookingDetails = (req, res) => {
  const { bookingId } = req.params;
  db.get('SELECT * FROM Booking WHERE id = ?', [bookingId], (err, booking) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    db.get('SELECT * FROM User WHERE id = ?', [booking.userId], (err, user) => {
      if (err) return res.status(500).json({ error: err.message });

      db.get('SELECT * FROM Train WHERE id = ?', [booking.trainId], (err, train) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ booking, user, train });
      });
    });
  });
};

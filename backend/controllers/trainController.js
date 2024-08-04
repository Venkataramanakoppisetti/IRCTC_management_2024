const db = require('../config/database');

// Add New Train
exports.addTrain = (req, res) => {
  const { name, source, destination } = req.body;
  db.run('INSERT INTO Train (name, source, destination) VALUES (?, ?, ?)', [name, source, destination], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, name, source, destination });
  });
};

// Get Seat Availability
exports.getSeatAvailability = (req, res) => {
  const { source, destination } = req.query;
  db.all('SELECT * FROM Train WHERE source = ? AND destination = ?', [source, destination], (err, trains) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ trains });
  });
};

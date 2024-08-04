const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.resolve(__dirname, '../database.sqlite3'), (err) => {
  if (err) {
    console.error('Database opening error: ', err);
  }
});

// Initialize database schema
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT CHECK(role IN ('admin', 'user')) DEFAULT 'user'
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Train (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    source TEXT NOT NULL,
    destination TEXT NOT NULL,
    availableSeats INTEGER DEFAULT 0
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Booking (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    trainId INTEGER,
    seatsBooked INTEGER NOT NULL,
    FOREIGN KEY(userId) REFERENCES User(id),
    FOREIGN KEY(trainId) REFERENCES Train(id)
  )`);
});

module.exports = db;

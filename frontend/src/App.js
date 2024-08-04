import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import TrainAvailability from './components/TrainAvailability';
import BookSeat from './components/BookSeat';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/availability" element={<TrainAvailability />} />
                    <Route path="/book" element={<BookSeat />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import pages
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />       {/* Root page */}
                <Route path="/homepage" element={<Homepage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    );
}

export default App;

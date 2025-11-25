import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as domain from "node:domain";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

//import all pages
import Homepage from "./pages/Homepage";

function App() {
  return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/homepage">homepage</Link>
            </li>
          </ul>
        </nav>
      </div>
  );
}

export default App;

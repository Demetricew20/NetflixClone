import React from 'react';
import './App.css';
import HomeScreen from './HomeScreen';
import Login from "./Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  const user = null;

  return (
    <div className='app'>
      <Router>
        <Routes>
          {!user ? (
            <Route path='/' element={<Login />} />
          ) : 
          (
          // <Route path="/about" element={} />
          // <Route path="/users" element={} />
          <Route path="/" element={<HomeScreen />} />                 
          )}        
        </Routes>

      </Router>
    </div>
  );
}

export default App;

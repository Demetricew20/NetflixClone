import React, {useEffect} from 'react';
import './App.css';
import HomeScreen from './HomeScreen';
import Login from "./Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { auth } from './firebase';

function App() {
  const user = null;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      userAuth => {
        if(userAuth){
          //logged in
          console.log("sign in", userAuth);
        }
        else{
          console.log("logged out", userAuth);
        }
      }
    );

    return unsubscribe;
  }, []);

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

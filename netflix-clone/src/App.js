import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './HomeScreen';
import Login from "./Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { logout, login, selectUser } from "./features/userSlice";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      userAuth => {
        if (userAuth) {
          //logged in
          dispatch(login({
            uid: userAuth.uid,
            email: userAuth.email,
          }));
        }
        else {
          dispatch(logout);
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
              <Route path="/profile" element={ <Profile/> } />
              // <Route path="/users" element={} />
              <Route path="/" element={<HomeScreen />} />
            )}
        </Routes>

      </Router>
    </div>
  );
}

export default App;

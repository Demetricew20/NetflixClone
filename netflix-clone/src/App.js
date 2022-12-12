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
import Profile from './Profile';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

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
          dispatch(logout());
        }
      }
    );

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className='app'>
      <Router>
        <Routes>
          {!user ? (
            <Route path='/' element={<Login />} />
          ) :
            (
              <Route path="/" element={<HomeScreen />} />
            )}
          {/* // <Route path="/users" element={} /> */}
          <Route path="/profile" element={<Profile />} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;

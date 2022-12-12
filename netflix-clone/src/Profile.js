import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser } from './features/userSlice';
import { auth } from "./firebase"
import Nav from './Nav';
import Plans from './Plans';
import "./Profile.css";

function Profile() {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const signOut = () => {
        auth.signOut();
        navigate("/");
    }
    return (
        <div className='profile'>
            <Nav />
            <div className='profile__body'>
                <h1>Edit Profile</h1>
                <div className='profile__info'>
                    <img src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/1bdc9a33850498.56ba69ac2ba5b.png' alt='User Image' />
                    <div className='profile__details'>
                        <h2>{user?.email}</h2>
                        <div className='profile__plans'>
                            <h3>Plans</h3>
                            
                            <Plans />
                            <button onClick={() => signOut()} className='profile__signOut'>Sign Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
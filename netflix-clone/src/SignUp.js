import React, { useRef } from 'react';
import { auth } from "./firebase";
import "./SignUp.css";

function SignUp() {

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {

    e.preventDefault();

    auth.createUserWithEmailAndPassword(
      emailRef.current.value,
      passwordRef.current.value
    ).then((authUser) => {
    }).catch(error => {
      alert(error.message);
    })
      ;
  };

  const signIn = (e) => {
    e.preventDefault();

    auth.signInWithEmailAndPassword(
      emailRef.current.value,
      passwordRef.current.value
    )
      .then(user => {
      })
      .catch(error => {
        alert(error.message);
      })
  };

  return (
    <div className='signUp'>
      <form>
        <h1>Sign In</h1>
        <input type="email" ref={emailRef} placeholder="Email Address"></input>
        <input type="password" ref={passwordRef} placeholder="Password"></input>
        <button type='submit' onClick={signIn}>Sign In</button>

        <h4>
          <span className='signUp__gray'>New to Netflix? </span>
          <span className='signUp__link' onClick={register}>Sign Up now.</span>
        </h4>
      </form>
    </div>
  )
}

export default SignUp
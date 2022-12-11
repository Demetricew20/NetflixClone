import React from 'react'
import "./SignUp.css"

function SignUp() {

  const register = (e) => {
    e.preventDefault();
  };

  const signIn = (e) => {
    e.preventDefault();
  };

  return (
    <div className='signUp'>
      <form>
        <h1>Sign In</h1>
        <input type="email" placeholder="Email Address"></input>
        <input type="password" placeholder="Password"></input>
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
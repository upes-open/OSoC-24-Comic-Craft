import React, { useState } from 'react';
import './login.css'
import { FaGoogle } from "react-icons/fa";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
  };
  return (
    <div className='container'>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className='text1'>Log into your Account</h2>
          <div className='input-group'>
            <label htmlFor="username" className='text2'>Username</label>
            <input
              type="text"
              id="username"
              value={username}
              className='box'
              placeholder='username'
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="password" className='text2'>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder='password'
              className='box'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">LOGIN</button>
          <h7 className="text3" >Don't have an account? Signup</h7>
          <div className='line-box'>
            <div className='lines'></div><h7><b className='text3'>OR</b></h7><div className='lines'></div>
          </div>
          <button type="submit" className="move-top btn"><b className='text4'>Login with</b><FaGoogle className='gicon' /></button>
        </form>
      </div>
    </div>
  )
}

export default Login

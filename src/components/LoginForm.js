
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import axios from 'axios';

import "./Login.css"
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      navigate('/home')
    }

  })

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post('https://dummyjson.com/auth/login', {
      username: username,
      password: password
    })
      .then(result => {
        console.log(result)
        const token = result.data.token;
        const firstName= result.data.firstName;
        const lastName= result.data.lastName;

        // Save the token to local storage
        localStorage.setItem('token', token);
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        navigate('/home')

      })
      .catch(error => {
        console.log("login error")
        setError("Login Error")
      })


  };

  return (
    <div className='login-page'>
      <h2>Login</h2>
      <div className='login'>

        {error && <p>{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username from https://dummyjson.com/users"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;


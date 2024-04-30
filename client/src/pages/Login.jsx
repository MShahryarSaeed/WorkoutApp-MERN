import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const{login,error,isLoading}=useLogin();

  const submiHandler = async (e) => {
    e.preventDefault();

    console.log(email, password);
    await login(email,password);

   /*
    const login= { email, password };

    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify(login),
      headers: {
        'content-Type': 'application/json'
      }
    });

    const json = await response.json();


    if (response.ok) {
      setEmail('');
      setPassword('');
      console.log(json);
    }


    */

  }

  return (
    <form className='login' onSubmit={submiHandler}>

      <h3>LOGIN</h3>

      <label >Email</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email...' />

      <label >Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password' />

      <button disabled={isLoading}>LOGIN</button>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default Login;

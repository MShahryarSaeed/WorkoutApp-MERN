import React, { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

const SignUp = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   //Destructuring (signup) From custom hook
   const{signup,isLoading,error}=useSignup();

  const submiHandler = async (e) => {
    e.preventDefault();

    // console.log(email, password);
    await signup(email,password);

   /*
    const signup = { email, password };

    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify(signup),
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
    <form className='signup' onSubmit={submiHandler}>

      <h3>Sign Up</h3>

      <label >Email</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email...' />

      <label >Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password' />

      <button disabled={isLoading}>SignUp</button>

      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default SignUp;

// useState
// useEffect
// useReducer
// useContext
// useRef()
// useMemo
// useCallback
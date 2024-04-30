import React, { useState } from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';

const WorkoutForm = () => {

  const {dispatch}=useWorkoutContext();

  const [title, setTitle] = useState('');
  const [reps, setReps] = useState('');
  const [load, setLoad] = useState('');
  const [error, setError] = useState(null);
  // custom hook
  const{user}=useAuthContext();

  const submitHandler=async(e)=>{
    e.preventDefault();

    if(!user){
      setError('You must be logged in')
      return;
    }

    const workout={title,reps,load};

    const response=await fetch('https://workout-app-mern-iota.vercel.app/api/workouts',{
      method:'POST',
      body:JSON.stringify(workout),
      headers:{
        'content-Type':'application/json',
        'Authorization':`Bearer ${user.accessToken}`
      }
    });

    const json=await response.json();

    if(!response.ok){
      setError(json.error)
    }

    if(response.ok){
      setError('');
      setTitle('');
      setReps('');
      setLoad('');
      console.log('New workout :',json);
      dispatch({type:'CREATE_WORKOUT',payload:json});
    }

  }

  return (
    <form onSubmit={submitHandler} className='create'>
      <h3>Add a New Workout</h3>

      <label >Exercise Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter the Title' />

      <label >Load (in kg) :</label>
      <input type="number" value={load} onChange={(e) => setLoad(e.target.value)} placeholder='Enter the Load' />

      <label >Reps :</label>
      <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} placeholder='Enter the Reps' />

      <button>Add Workout</button>

      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default WorkoutForm;

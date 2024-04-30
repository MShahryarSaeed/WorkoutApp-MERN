import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext';
import {useWorkoutContext} from '../hooks/useWorkoutContext';

const EditWorkout = () => {

  const{user}=useAuthContext();
  const{dispatch}=useWorkoutContext();
  const navigate=useNavigate();
  const{id}=useParams();
  const[formData,setFormData]=useState({});
  const[error,setError]=useState(null);


  useEffect(()=>{
    const fetchWorkout=async()=>{

      const response=await fetch(`https://workout-app-mern-iota.vercel.app/api/workouts/${id}`,{
        method:'GET',
        headers:{
          'Authorization':`Bearer ${user.accessToken}`
        }
      });

      const json=await response.json();

      if(!response.ok){
        setError(json.error);
      }
      else{
        setFormData(json);
        dispatch({type:'EDIT_WORKOUT',payload:json})
        console.log(json);
      }

    }

    fetchWorkout();
  },[id,dispatch,user.accessToken])

  const changeHandler=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }


  const submitHandler=async(e)=>{
    e.preventDefault();
    // console.log(formData);

    const response=await fetch(`https://workout-app-mern-iota.vercel.app/api/workouts/${id}`,{
      method:'PATCH',
      body:JSON.stringify(formData),
      headers:{
        'Authorization':`Bearer ${user.accessToken}`,
        'content-Type':'application/json'
      }
    });

    const json=await response.json();

    if(!response.ok){
         setError(json.error);
    }else{
      navigate('/');
         
    }
  }


  return (
     <form onSubmit={submitHandler} className='create'>
      <h3>Edit Workout</h3>

     <label >Exercise Title:</label>
      <input type="text" name='title' value={formData.title} onChange={changeHandler}  placeholder='Enter the Title' />

      <label >Load (in kg) :</label>
      <input type="number" name='load' value={formData.load} onChange={changeHandler} placeholder='Enter the Load' />

      <label >Reps :</label>
      <input type="number" name='reps' value={formData.reps} onChange={changeHandler} placeholder='Enter the Reps' />

      <button>Update Workout</button>

      {error && <div className='error'>{error}</div>} 

      
    </form>
  )
}

export default EditWorkout

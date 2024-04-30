import React from 'react';
import {Link} from 'react-router-dom';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';

const WorkoutDetails = ({ workout }) => {

  const { dispatch } = useWorkoutContext();
  const{user}=useAuthContext();

  const handleClick = async () => {
    if(!user){
      return;
    }
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers:{
        'Authorization':`Bearer ${user.accessToken}`
      }
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json })
    }

  }
  return (

    <div className='workout-details'>

      <h4>{workout.title}</h4>
      <p> <strong>Load (kg) : </strong>{workout.load}</p>
      <p> <strong>Reps : </strong>{workout.reps}</p>
      <p>{workout.createdAt}</p>
      <span onClick={handleClick}>Delete</span>

      <Link to={`/editWorkout/${workout._id}`}>
      Edit Workout
      </Link>
     

    </div>
  );

}

export default WorkoutDetails;

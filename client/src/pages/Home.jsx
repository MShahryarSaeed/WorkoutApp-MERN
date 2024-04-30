import React, {  useEffect } from 'react';
import WorkoutForm from '../components/WorkoutForm';
import WorkoutDetails from '../components/WorkoutDetails';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {

  // const [workouts, setAllWorkouts] = useState([]);
  const { workouts, dispatch } = useWorkoutContext();
  const{user}=useAuthContext();
  

  useEffect(() => {
    const fetchWorkouts = async () => {

      try {
        const response = await fetch(`https://workout-app-mern-iota.vercel.app/api/workouts`,{
          headers:{
            'Authorization':`Bearer ${user.accessToken}`
          }
        });
        const json = await response.json();

        // setAllWorkouts(data);
        dispatch({ type: 'SET_WORKOUTS', payload: json })
      } catch (error) {
        console.log('Error While Fetching Workouts', error)
      }

    }
    if(user){
      fetchWorkouts();
    }
  }, [dispatch,user])

  return (
    
    <div className='home'>
      <WorkoutForm />

      <div className="workouts">
        {workouts && workouts.map((workout, index) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>

    </div>
  )
}

export default Home;
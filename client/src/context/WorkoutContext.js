import { createContext, useReducer } from "react";

// Will use with useContext hook as useContext(WorkoutContext)
export const WorkoutContext = createContext();

const workoutReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return {
        workouts: action.payload
      }
    case 'CREATE_WORKOUT':
      return {
        workouts: [action.payload, ...state.workouts]
      }
    case 'DELETE_WORKOUT':
      return {
        workouts: state.workouts.filter(w => w._id !== action.payload._id)
      }
    case 'EDIT_WORKOUT':
      const updatedWorkouIndex = state.workouts.findIndex((w) => w._id === action.payload._id);
      if (updatedWorkouIndex !== -1) {
        const updatedWorkouts = [...state.workouts];
        updatedWorkouts[updatedWorkouIndex] = action.payload

        return {
          workouts: updatedWorkouts
        }
      }
      break;
    default:
      return state;

  }
}
export const WorkoutContextProvider = ({ children }) => {

  // useReducer Hook
  const [state, dispatch] = useReducer(workoutReducer, {
    workouts: null
  });

  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  )
}

/*
const workoutReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return {
        workouts: action.payload
      };
    case 'CREATE_WORKOUT':
      return {
        workouts: [action.payload, ...state.workouts]
      };
    case 'EDIT_WORKOUT':
      const updatedWorkoutIndex = state.workouts.findIndex(
        (w) => w._id === action.payload._id
      );

      if (updatedWorkoutIndex !== -1) {
        const updatedWorkouts = [...state.workouts];
        updatedWorkouts[updatedWorkoutIndex] = action.payload;

        return {
          workouts: updatedWorkouts
        };
      }

      return state;

    case 'DELETE_WORKOUT':
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id)
      };
    default:
      return state;
  }
};

*/ 
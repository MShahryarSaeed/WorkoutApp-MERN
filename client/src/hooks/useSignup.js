import { useState } from "react";
import { useAuthContext } from "./useAuthContext";


export const useSignup = () => {
  
  // useStates
  const [error, setError] = useState(null);
  const [isloading, setIsLoading] = useState(null);
  // Custom hook (useAuthContext)
  const { dispatch } = useAuthContext();
   
  // This function will import in SignUp.jsx and Distruct from useSignup hook
  const signup = async (email, password) => {
    
    setIsLoading(true);
    setError(null);

    const response = await fetch('/api/users/signup', {
      method: 'POST',
      // Passing email and password as object 
      body: JSON.stringify({ email, password }),
      headers: {
        'content-Type': 'application/json'
      }
    });

    const json = await response.json();
    //Note: json variable ma backend sy aya huwa /signup route sy email aur accessToken store jo baad ma hum ny dispatch function ko diya or local storage ma b save kiya 

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      // save the user to local Storage
      localStorage.setItem('user', JSON.stringify(json));
      // update the AuthContext
      dispatch({ type: 'LOGIN', payload: json });

      setIsLoading(false);
    }

  }
   
  // To use these things in other components like in SignUp.jsx Component because it is a custom hook
  return { signup, isloading, error }



}
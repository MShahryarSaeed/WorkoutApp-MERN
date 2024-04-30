import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin=()=>{

  const{dispatch}=useAuthContext();
  const[isLoading,setIsLoading]=useState(null);
  const[error,setError]=useState(null);
 
  const login=async(email,password)=>{

    const response=await fetch(`https://workout-app-mern-iota.vercel.app/api/users/login`,{
      method:'POST',
      body:JSON.stringify({email,password}),
      headers:{
       'content-Type':'application/json'
      }
    });

    const json=await response.json();

    if(!response.ok){
      setIsLoading(false);
      setError(json.error);
    }

    if(response.ok){
      localStorage.setItem('user',JSON.stringify(json));

      dispatch({type:'LOGIN',payload:json});

      setIsLoading(false);
    }

  }

  return {login,isLoading,error}

}
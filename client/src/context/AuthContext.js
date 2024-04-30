import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {

  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.payload
      }
    case 'LOGOUT':
      return {
        user: null
      }
    default:
      return state
  }
  
}

export const AuthContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(authReducer, {
    user: null
  });

  // For Solving the issue: when we refresh the page the state of AuthContext turn to null for login user but the email and accessToken is Available in local Storage(Tutorial:14)
  
  useEffect(() => {
    
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
    }

  }, []);

  console.log('Auth Context :', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )



}
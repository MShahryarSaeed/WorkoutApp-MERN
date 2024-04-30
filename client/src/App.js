import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
// Components
import Navbar from './components/Navbar';
// pages
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import EditWorkout from './pages/EditWorkout';

const App = () => {
                                           
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Navbar />
      <div className="pages">
        <Routes>
          <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
          <Route path='/editWorkout/:id' element={user ? <EditWorkout/> : <Navigate to='/login'/>}/>
          <Route path='/signup' element={!user ? <SignUp /> : <Navigate to='/' />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;

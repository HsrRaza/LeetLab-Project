import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import HomePage from './page/HomePage'
import LoginPage from './page/LoginPage'
import SingUpPage from './page/SingUpPage'

const App = () => {

  let authUser = null;

  
  return (
    <div className='flex flex-col items-center justify-center'>
      <Routes>
          
          <Route
          path='/'
          element={authUser ? <HomePage/> : <Navigate to={"/login"}/>}
          />







        <Route
        path='/login'
        element={!authUser ? <LoginPage/> : <Navigate to={"/"}/>}
        />


        <Route
        path='/singup'
        element={ !authUser? <SingUpPage/> : <Navigate to={"/"}/>}
        />

        
      </Routes>
    
    </div>
  )
}

export default App


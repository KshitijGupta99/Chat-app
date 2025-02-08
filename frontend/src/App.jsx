import React, { useEffect } from 'react'
import './index.css'
import Navbar from './components/Navbar'
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import { useAuthStore } from './store/useAuthstore'
import {Loader} from 'lucide-react'

const App = () => {

  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();

  useEffect(()=>{
    checkAuth()
  }, [checkAuth]);

  if(isCheckingAuth && !authUser)return(
    <div className='flex item-center justify-center h-screen'>
      <Loader className='size-10 animate-spin' />
    </div>
  )
  
  return (
    <div className=''>
      <Navbar />
      HEYYY
      <Routes>


        <Route  path = '/' element = {authUser ? <Home /> : <Navigate to = "/login" />}  />
        <Route  path = '/login' element = {authUser ? <Navigate to = "/login" /> : <Login />}  />
        <Route  path = '/signup' element = { authUser ?  <Navigate to = "/login" />: <Signup />}  />
        <Route  path = '/profile' element = {authUser ? <Profile /> : <Navigate to = "/login" />}  />
        <Route  path = '/settings' element = {<Settings />}  />
      </Routes>


    </div>
  )
}

export default App

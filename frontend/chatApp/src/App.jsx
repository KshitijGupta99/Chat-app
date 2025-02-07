import React from 'react'
import './index.css'
import Navbar from './components/Navbar'
import {Routes, Route} from 'react-router-dom'

const App = () => {
  return (
    <div className=''>
      <Navbar />

      <Routes>


        <Route  path = '/' element = {<Home/}  />
        <Route  path = '/login' element = {<Login/}  />
        <Route  path = '/singup' element = {<Singup/}  />
        <Route  path = '/profile' element = {<Profile/}  />
        <Route  path = '/settings' element = {<Settings/}  />
      </Routes>


    </div>
  )
}

export default App

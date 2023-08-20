import React from 'react'
import './App.css';
import Bmi from './Comp/Bmi';

const App = () => {
  return (
    <div className='App container'>
      <div className='row justify-content-center'>
        <div className='col-lg-6 col-lg-offset-3'>
          <Bmi/>
        </div>
      </div>
    </div>
  )
}

export default App


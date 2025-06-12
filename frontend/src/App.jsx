import { useState } from 'react'

import './App.css'
import Todo from './Components/Todo'
import { ToastContainer, toast } from 'react-toastify';
import dotenv from 'react-dotenv';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Todo />
      <ToastContainer />
    </>
  )
}

export default App

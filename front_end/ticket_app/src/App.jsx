

import { Outlet } from 'react-router-dom'
import './App.css'

export default function App() {
  return (
    <div className='App'>
      <h1>{"Jesse's Jira"}</h1>
      <Outlet />        
    </div>
  )
}


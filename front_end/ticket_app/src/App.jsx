import { useEffect, useState, createContext, useRef } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { api } from "./utilities"
import './App.css'

export const userContext = createContext()

export default function App() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const lastVisited = useRef()

  const logOut = async() => {
    console.log(user)
    let response = await api.post("users/logout/")
    if (response.status === 204) {
      localStorage.removeItem("token")
      delete api.defaults.headers.common["Authorization"]
      setUser(null)
      navigate("/")
    }
  }

  const whoAmI = async() => {
    let token = localStorage.getItem("token")
    if (token) {
      api.defaults.headers.common["Authorization"] = `Token ${token}`
      let response = await api.get("users/")
      setUser(response.data)
      navigate("company")
    } else {
      setUser(null)
      navigate('/')
    }
  }

  useEffect(() => {
    whoAmI()
  }, [])

  useEffect(() => {
    if (!user) {
      lastVisited.current = location.pathname
    }
  }, [location])

  return (
    <div className='App'>
      <div>
        <h1>{`Jesse's Jira - Welcome ${user ? user.name : ""}`}</h1>
        {user ? (<h2>{"Welcome"}</h2> && <button onClick={logOut}>Log Out</button>) : null}        
      </div>
      <userContext.Provider value={{ user, setUser }}>
        <Outlet />        
      </userContext.Provider>
    </div>
  )
}


import { useState, useContext } from 'react'
import { userContext } from '../App'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../utilities'
import './pages.css'
import { Form, FloatingLabel, Button, Image } from "react-bootstrap"

export default function LoginPage() {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const { setUser } = useContext(userContext)
  const navigate = useNavigate()   
  
  const login = async (e) => {
    e.preventDefault()
    let response = await api.post("users/login/", {
      email: userName,
      password: password,
    })
    console.log(response)
    let token = response.data.token
    let user = response.data.user
    localStorage.setItem("token", token)
    api.defaults.headers.common["Authorization"] = `Token ${token}`
    setUser(user)
    navigate("/home")
  }

  return(
    <div className="LoginPage">
      <Form className='d-grid gap-1' onSubmit={login}>
        <Image src="https://picsum.photos/260" rounded className='mx-2'></Image>
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-2"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        >
        <Form.Control type="email" placeholder="name@example.com" />
        </FloatingLabel>
        <FloatingLabel 
          controlId="floatingPassword" 
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        >
          <Form.Control type="password" placeholder="Password" />
        </FloatingLabel>        
        <Button type="submit" className='my-2'size='lg'>Login</Button>
        <Link to="register" className='link'>Register?</Link>
      </Form> 
    </div>
  )
}
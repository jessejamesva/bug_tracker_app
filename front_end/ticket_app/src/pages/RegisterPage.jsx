import { Link } from 'react-router-dom'
import './pages.css'
import { Form, FloatingLabel, Button, Image } from "react-bootstrap"

export default function RegisterPage() {
  return (
    <div className="RegisterPage">
      <Form className='d-grid gap-1'>
        <Image src="https://picsum.photos/260" rounded className='mx-2'></Image>
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="my-2"
        >
          <Form.Control type="email" placeholder="name@example.com" />
        </FloatingLabel>
        <FloatingLabel controlId="floatingCompany" label="Company" className='mb-2'>
          <Form.Control type="password" placeholder="Password" />
        </FloatingLabel>        
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control type="password" placeholder="Password" />
        </FloatingLabel>        
        <Button className='my-2'size='lg'>Register</Button>
        <Link to="/" className='link'>All ready have an account?</Link>
      </Form> 
    </div>      
  )
}
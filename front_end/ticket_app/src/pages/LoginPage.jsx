import { useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { api } from '../utilities'


export default function LoginPage() {
  const [userName, setUserName] = useState("shev@wintermute.com")
  const [password, setPassword] = useState("shev")
  const { setUser } = useOutletContext()
  const navigate = useNavigate()   
  
  const login = async (e) => {
    e.preventDefault()
    let response = await api.post("users/login/", {
      email: userName,
      password: password,
    })
    let token = response.data.token
    let user = response.data.client
    localStorage.setItem("token", token)
    api.defaults.headers.common["Authorization"] = `Token ${token}`
    setUser(user)
    console.log(user)
    navigate("/company")
  }

  return(
    <div>
      {/* <!-- component --> */}
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 dark:bg-white  shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl ">
          </div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 dark:text-white border dark:bg-gradient-to-r dark from-gray-600 dark:to-gray-800">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">{"Welcome to Jesse's Jira"}</h1>
              </div>
              <form onSubmit={login}>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                      <div className="relative">
                        <input value={userName} onChange={(e) => setUserName(e.target.value)} autoComplete="off" id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-transparent dark:text-white" placeholder="Email address" />
                        <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm dark:text-white">Email Address</label>
                      </div>
                      <div className="relative">
                        <input value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="off" id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-transparent dark:text-white" placeholder="Password" />
                        <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm dark:text-white">Password</label>
                      </div>
                      <div className="relative">
                        <button className="bg-pink-900 text-white rounded-md px-2 py-1 hover:bg-pink-500" type="submit">Submit</button>
                        <Link to="register" className="text-white text-right text-xs mx-7">Register?</Link>
                      </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
    </div>
  )
}
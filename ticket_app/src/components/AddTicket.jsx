import { useState } from 'react'
import { useOutletContext, useNavigate, Link } from 'react-router-dom'
import { api } from '../utilities'

export default function AddTicket() {
    const [feature, setFeature] = useState(null)
    const [note, setNote] = useState(null)
    const [project, setProject] = useState(null)
    const { company } = useOutletContext()
    const navigate = useNavigate()

    return (
        <div className="bg-gray-600 h-1/2 w-1/3 m-auto">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold text-white underline underline-offset-4 text-center">
                  {"Add A Ticket"}
                </h1>
              </div>
              <form >
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                      <div className="relative">
                        <input 
                          value={feature} 
                        //   onChange={(e) => setUserName(e.target.value)} 
                          autoComplete="off" 
                          id="feature" 
                          name="feature" 
                          type="text" 
                          className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-transparent dark:text-white" 
                          placeholder="Problem Feature" 
                        />
                        <label 
                          htmlFor="feature" 
                          className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm dark:text-white">
                            Problem Feature
                        </label>
                      </div>
                      <div className="relative">
                        <input 
                          value={note} 
                        //   onChange={(e) => setPassword(e.target.value)} 
                          autoComplete="off" 
                          id="note" 
                          name="note" 
                          type="note" 
                          className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-transparent dark:text-white" 
                          placeholder="Problem Note" 
                        />
                        <label 
                          htmlFor="note" 
                          className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm dark:text-white">
                            Note
                        </label>
                      </div>
                      <div className="relative">
                        <button 
                          className="bg-pink-900 shadow shadow-gray-800 text-white rounded-md px-2 py-1 hover:bg-pink-500" 
                          type="submit">
                            Submit
                          </button>
                        {/* <Link to="register" className="text-white text-right text-xs mx-7">Register?</Link> */}
                      </div>
                    </div>
                </div>
              </form>
            </div>
        
        </div>
    )
}
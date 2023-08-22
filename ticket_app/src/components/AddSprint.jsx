import { useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { api } from '../utilities'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

export default function AddSprint() {
    const [name, setName] = useState(null)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState("")
    const [project, setProject] = useState(null)
    const { company } = useOutletContext()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
      e.preventDefault()
      let response = await api.post(`companies/${company.id}/projects/${project}/sprints/`,{
        name: name,
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0]
      })
      console.log(response.data)
      navigate("/company")
    }

    return (
        <div className="bg-gray-600 h-1/2 w-1/3 m-auto rounded-lg p-6">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold text-white underline underline-offset-4 text-center">
                  Add A Sprint
                </h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    
                      <div className="relative">
                        <input 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                          autoComplete="off" 
                          id="name" 
                          name="name" 
                          type="text" 
                          className="peer placeholder-transparent h-10 w-full border-b-2 mb-3 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-transparent dark:text-white" 
                          placeholder="Sprint Name" 
                        />
                        <label 
                          htmlFor="name" 
                          className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm dark:text-white">
                            Sprint Name
                        </label>
                      </div>
                      <div className="">
                        <label className="text-white">Project:</label>
                        <select 
                          name="selectedProject"
                          onClick={(e) => setProject(e.target.value)} 
                          className="w-4/6 text-black mx-4 rounded pl-1">
                          {company && company.projects.map((project, index) => (
                            <option key={index} value={project.id}>{project.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-white">Start Date: </label>
                        <DatePicker
                          dateFormat="yyyy-MM-dd" 
                          selected={startDate} 
                          onChange={(date) => setStartDate(date)}
                        />
                      </div>
                      <div>
                        <label className="text-white">End Date: </label>
                        <DatePicker 
                          selected={endDate} 
                          onChange={(date) => setEndDate(date)}
                        />
                      </div>
                      <div className="relative flex justify-evenly">
                        <button 
                          className="bg-pink-900 shadow shadow-gray-800 text-white rounded-md px-10 py-1 hover:bg-pink-500" 
                          type="submit">
                            Submit
                        </button>
                        <button 
                          className="bg-pink-900 shadow shadow-gray-800 text-white rounded-md px-10 py-1 hover:bg-pink-500" 
                          onClick={() => navigate("/company")}>
                            Cancel
                        </button>
                      </div>
                    </div>
                </div>
              </form>
            </div>
        
        </div>
    )
}
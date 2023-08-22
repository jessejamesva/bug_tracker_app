import { useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { api } from '../utilities'

export default function AddTicket() {
    const [feature, setFeature] = useState(null)
    const [note, setNote] = useState(null)
    const [project, setProject] = useState(null)
    const [sprint, setSprint] = useState(null)
    const { company } = useOutletContext()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
      e.preventDefault()
      let response = await api.post(`companies/${company.id}/projects/${project}/sprints/${sprint}/tickets/`,{
        feature: feature,
        notes: note
      })
      console.log(response.data)
      if (response.status === 201) {
        alert("Ticket Created")
      }
      navigate("/company")
    }

    return (
        <div className="bg-gray-600 h-1/2 w-1/3 m-auto rounded-lg p-6">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold text-white underline underline-offset-4 text-center">
                  {"Add A Ticket"}
                </h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="">
                      <label className="text-white">Project:</label>
                        <select 
                          name="selectedProject"
                          onClick={(e) => setProject(e.target.value)} 
                          className="w-4/6 text-black mx-4 rounded pl-1">
                            <option key={100} value={null}></option>
                          {company && company.projects.map((project, index) => (
                            <option key={index} value={project.id}>{project.name}</option>
                          ))}
                        </select>
                    </div>
                    <div className="">
                      <label className="text-white">Sprint:</label>
                      <select
                        disabled={project ? "" : "true"}
                        onClick={(e) => setSprint(e.target.value)}  
                        placeholder="Project" 
                        className="w-4/6 text-black mx-4 rounded mb-3 pl-1"
                      >
                        <option key={100} value={null}></option>
                        {project && company.projects[company.projects.findIndex(x => x.id === parseInt(project))].sprints.map((sprint, index) => (
                          <option key={index} value={sprint.id}>{sprint.name}</option>
                        ))}
                      </select>
                    </div>
                      <div className="relative">
                        <input 
                          value={feature} 
                          onChange={(e) => setFeature(e.target.value)} 
                          autoComplete="off" 
                          id="feature" 
                          name="feature" 
                          type="text" 
                          className="peer placeholder-transparent h-10 w-full border-b-2 mb-3 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-transparent dark:text-white" 
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
                          onChange={(e) => setNote(e.target.value)} 
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
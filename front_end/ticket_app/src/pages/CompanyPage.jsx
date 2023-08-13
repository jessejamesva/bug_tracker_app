import { useEffect, useState } from "react"
// import { userContext } from "../App"
import { useOutletContext } from "react-router-dom"
import CompanyInfo from "../components/CompanyInfo";
import { api } from "../utilities"
import "./pages.css"
import ProjectInfo from "../components/ProjectInfo";
import SprintInfo from "../components/SprintInfo";
import TicketInfo from "../components/TicketInfo";



export default function CompanyPage() {
  const {user, logOut, whoAmI, userId} = useOutletContext()
  const [company, setCompany] = useState({})

  const getCompany = async() => {
    try {
      const response = await api.get(`companies/${userId}`)
      const companyData = response.data
      setCompany(companyData)
    } catch (error) {
      console.error('Error getting company.', error)
    }
  }
  
  useEffect(() => {
    whoAmI()
  }, [])

  useEffect(() => {
    if (userId && !company.name) {
      getCompany()
    }
  }, [user])
  
  
  return(
    <div >
      <div className="flex content-around mx-auto my-10 justify-around">
          <h1 className='text-3xl font-bold underline text-white'>{`Jesse's Jira - Welcome ${user ? user.name : ""}`}</h1>
          {user ? (<h2>{"Welcome"}</h2> && <button className="bg-indigo-500 text-white rounded-md mx-9 px-3" onClick={logOut}>Log Out</ button>) : null} 
      </div>
      <div>
        {company.name && <CompanyInfo user={user} company={company}/>}
        {company.projects && <ProjectInfo />}
        {company.name && <SprintInfo />}
        {company.name && <TicketInfo />}
      </div>
          {/* <h2>{company.name}</h2> */}
          {/* {console.log(company.employees[0].name)} */}
          {/* <ul>
          {company.employees.map((project) => (
            <li key={project.id}>{project.name}</li>
          ))}
          </ul> */}
      
    </div>
  )
}
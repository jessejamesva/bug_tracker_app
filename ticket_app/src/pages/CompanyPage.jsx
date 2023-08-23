import { useEffect, useState } from "react"
import { useOutletContext, Outlet } from "react-router-dom"
import { api } from "../utilities"
import NavBar from "../components/NavBar";

// whoAmI is read from the Login Page and used to keep track of the user. 
export default function CompanyPage() {
  const {user, logOut, whoAmI, companyId} = useOutletContext()
  const [company, setCompany] = useState({})
  const [sprint, setSprint] = useState()
  const [sprintId, setSprintID] = useState()
  const [isSprintLoaded, setIsSprintLoaded] = useState(false) // hides sprintboard until loaded
  const [sprintChange, setSprintChange] = useState(false) // used to automatically reload the sprintboard
 
  const getCompany = async() => {
    try {
      const response = await api.get(`companies/${companyId}`)
      const companyData = response.data
      setCompany(companyData)
    } catch (error) {
      console.error('Error getting company.', error)
    }
  }
  
  // Declared here so it can by passed through UseContext
  const getSprint = async() => {
    try {
      const response = await api.get(`companies/${company.id}/sprints/${sprintId}`)
      const sprintData = response.data[0]
      setSprint(sprintData)
      console.log(sprint)
      setIsSprintLoaded(true)
    } catch (error) {
      console.error('Error getting sprint', error)
    }
  }
  
  // function call to change state for sprintboard re-renders
  const isSprintChanged = () => {
    setSprintChange(!sprintChange)
  }
  
  useEffect(() => {
    whoAmI()
  }, [])

  useEffect(() => {
    if (companyId && !company.name) {
      getCompany()
    }
  }, [user])

  // sprintId is set in the NavBar when users select sprint, sprintChange is called when adding, updateing, or deleting sprints. 
  useEffect(() => {
    if (sprintId) [
      getSprint(sprintId)
    ] 
  }, [sprintId, sprintChange])
  
  
  return (
    <div className="flex">
      <NavBar 
        key={7}
        company={company} 
        logOut={logOut} 
        sprint={sprint} 
        setSprint={setSprint} 
        getSprint={getSprint}
        setSprintID={setSprintID}
        setIsSprintLoaded={setIsSprintLoaded}
      />
      <Outlet key={3} context={{sprint, isSprintLoaded, company, getSprint, isSprintChanged}}/>
    </div>
  )
}
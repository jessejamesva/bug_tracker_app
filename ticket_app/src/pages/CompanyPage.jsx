import { useEffect, useState } from "react"
import { useOutletContext, Outlet } from "react-router-dom"
import { api } from "../utilities"
import "./pages.css"
import NavBar from "../components/NavBar";

// whoAmI is read from the Login Page and used to keep track of the user. "isSprintLoaded" will show Sprint Board once a sprint is selected. 
export default function CompanyPage() {
  const {user, logOut, whoAmI, companyId} = useOutletContext()
  const [company, setCompany] = useState({})
  const [sprint, setSprint] = useState({})
  const [isSprintLoaded, setIsSprintLoaded] = useState(false)
 
  const getCompany = async() => {
    try {
      const response = await api.get(`companies/${companyId}`)
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
    if (companyId && !company.name) {
      getCompany()
    }
  }, [user])
  
  
  return (
    <div className="flex">
      <NavBar 
        key={7}
        company={company} 
        logOut={logOut} 
        sprint={sprint} 
        setSprint={setSprint} 
        setIsSprintLoaded={setIsSprintLoaded}
      />
      <Outlet key={3} context={{sprint, isSprintLoaded, company}}/>
    </div>
  )
}
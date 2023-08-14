import { useEffect, useState } from "react"
import { useOutletContext, Outlet } from "react-router-dom"
import { api } from "../utilities"
import "./pages.css"
import NavBar from "../components/NavBar";




export default function CompanyPage() {
  const {user, logOut, whoAmI, companyId} = useOutletContext()
  const [company, setCompany] = useState({})
  const [sprint, setSprint] = useState({})
 
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
      <NavBar company={company} logOut={logOut} sprint={sprint} setSprint={setSprint}/>
      <Outlet sprint={sprint}/>
    </div>
  )
}
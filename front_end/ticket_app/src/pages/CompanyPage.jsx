import { useEffect, useState } from "react"
import { useOutletContext, Outlet } from "react-router-dom"
import { api } from "../utilities"
import "./pages.css"
import NavBar from "../components/NavBar";




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
  
  
  return (
    <div className="flex">
      <NavBar company={company} logOut={logOut}/>
      <Outlet />
    </div>
  )
}
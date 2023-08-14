import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import HomePage from "./pages/HomePage"
import CompanyPage from "./pages/CompanyPage"
import AddSprint from "./components/AddSprint"
import AddTicket from "./components/AddTicket"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <LoginPage />,
            },
            {
                path: "register",
                element: <RegisterPage />,
            },
            {
                path: "home",
                element: <HomePage />,
            },
            {
                path: "company",
                element: <CompanyPage />,
                children: [
                    {
                        path: "add_sprint",
                        element: <AddSprint />
                    },
                    {
                        path: "add_ticket",
                        element: <AddTicket />
                    }
                  
                ]
            }
        ]
    }
])
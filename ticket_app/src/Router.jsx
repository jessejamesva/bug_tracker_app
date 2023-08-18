import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import HomePage from "./pages/HomePage"
import CompanyPage from "./pages/CompanyPage"
import AddSprint from "./components/AddSprint"
import AddTicket from "./components/AddTicket"
import SprintInfo from "./components/SprintInfo"
import TicketInfo, { ticketLoader } from "./components/TicketInfo"
import UpdateTicket, { ticketLoader2 } from "./components/UpdateTicket"

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
                        index: true,
                        element: <SprintInfo />
                    },
                    {
                        path: "add_sprint",
                        element: <AddSprint />
                    },
                    {
                        path: "add_ticket",
                        element: <AddTicket />
                    },
                    {
                        path: ":id/ticket/:ticket_id",
                        loader: ticketLoader,
                        element: <TicketInfo />
                    },
                    {
                        path: ":id/ticket/:ticket_id/update",
                        loader: ticketLoader2,
                        element: <UpdateTicket />
                    }
                  
                ]
            }
        ]
    }
])
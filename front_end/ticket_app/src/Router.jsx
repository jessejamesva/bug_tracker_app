import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import HomePage from "./pages/HomePage"
import CompanyPage from "./pages/CompanyPage"

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
                element: <CompanyPage />
            }
        ]
    }
])
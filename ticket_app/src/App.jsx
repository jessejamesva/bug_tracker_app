import { useEffect, useState, useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { api } from "./utilities";
import "./App.css";


export default function App() {
  const [user, setUser] = useState(null);
  const [companyId, setCompanyID] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const lastVisited = useRef();

  const logOut = async () => {
    console.log(user);
    let response = await api.post("users/logout/");
    if (response.status === 204) {
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
      setUser(null);
      setCompanyID(null);
      navigate("/");
    }
  };

  const whoAmI = async () => {
    let token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      let response = await api.get("users/");
      setUser(response.data);
      setCompanyID(response.data.company);
      navigate("company");
    } else {
      setUser(null);
      setCompanyID(null);
      navigate("/");
    }
  };

  useEffect(() => {
    whoAmI();
  }, []);

  useEffect(() => {
    if (!user) {
      lastVisited.current = location.pathname;
    }
  }, [location]);

  return (
    <div className="App">
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center dark:bg-gray-700">
        <Outlet
          context={{ user, setUser, logOut, whoAmI, companyId, setCompanyID }}
        />
      </div>
    </div>
  );
}

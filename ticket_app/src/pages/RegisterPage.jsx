import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { api } from "../utilities";

export default function RegisterPage() {
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [role, setRole] = useState("");
  const [companyList, setCompanyList] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(0);
  const { setUser } = useOutletContext();
  const navigate = useNavigate();
  const roleList = [
    { id: "pm", role: "Project Manager" },
    { id: "se", role: "Software Engineer" },
    { id: "ta", role: "Test Analyst" },
    { id: "qa", role: "QA Specialist" },
    { id: "ro", role: "Read Only" },
  ];

  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password2Error, setPassword2Error] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [companyError, setCompanyError] = useState("");
  const [roleError, setRoleError] = useState("")

  const getCompanyList = async () => {
    let response = await api.get("companies/list/");
    setCompanyList(response.data);
  };

  const login = async (e) => {
    e.preventDefault();
    let response = await api.post("users/login/", {
      email: userName,
      password: password,
    });
    let token = response.data.token;
    let user = response.data.client;
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    setUser(user);
    console.log(user);
    navigate("/company");
  };

  const validateForm = useMemo(() => {
    let isValid = true;

    if (!userName) {
      setUserNameError('Email is required.');
      isValid = false;
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(userName)) {
      setUserNameError('Invalid email format.');
      isValid = false;
    } else {
      setUserNameError('');
    }

    if (!password) {
      setPasswordError('Password is required.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!password2) {
      setPassword2Error('Please re-enter password.');
      isValid = false;
    } else if (password !== password2) {
      setPassword2Error('Passwords do not match.');
      isValid = false;
    } else {
      setPassword2Error('');
    }

    if (!fullName) {
      setFullNameError('Name is required.');
      isValid = false;
    } else {
      setFullNameError('');
    }

    if (!selectedCompany) {
      setCompanyError('Company is required.');
      isValid = false;
    } else {
      setCompanyError('');
    }

    if (!role) {
      setRoleError('Role is required.');
      isValid = false;
    } else {
      setRoleError('');
    }  

    return isValid;
  }, [userName, password, password2, role, selectedCompany, fullName] );

  const register = async (e) => {
    e.preventDefault();
    console.log("testing register");
  };

  useEffect(() => {
    getCompanyList();
  }, []);

  return (
    <div>
      {/* <!--  registration component --> */}
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 dark:bg-pink-900  shadow-inner shadow-pink-300 transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl "></div>
        <div className="relative px-4 py-10 bg-white shadow-lg shadow-black sm:rounded-3xl sm:p-20 dark:text-white border dark:bg-gradient-to-r dark from-gray-600 dark:to-gray-800">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">
                {"Welcome to Jesse's Jira"}
              </h1>
            </div>
            <form onSubmit={register}>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <p className="text-red-500 text-sm text-right">{userNameError}</p>
                    <input
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-transparent dark:text-white"
                      placeholder="Email address"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm dark:text-white"
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                  <p className="text-red-500 text-sm text-right">{passwordError}</p>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-transparent dark:text-white"
                      placeholder="Password"
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm dark:text-white"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative">
                  <p className="text-red-500 text-sm text-right">{password2Error}</p>
                    <input
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                      autoComplete="off"
                      id="password2"
                      name="password2"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-transparent dark:text-white"
                      placeholder="Password"
                    />
                    <label
                      htmlFor="password2"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm dark:text-white"
                    >
                      Re-Enter Password
                    </label>
                  </div>
                  <div className="relative">
                  <p className="text-red-500 text-sm text-right">{fullNameError}</p>
                    <input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      autoComplete="off"
                      id="fullName"
                      name="fullName"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-transparent dark:text-white"
                      placeholder="FirstName LastName"
                    />
                    <label
                      htmlFor="fullName"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm dark:text-white"
                    >
                      Name
                    </label>
                  </div>
                  <div className="">
                    <p className="text-red-500 text-sm text-right">{companyError}</p>
                    <label className="text-white">Company: </label>
                    <select
                      name="selectedCompany"
                      onClick={(e) => setSelectedCompany(e.target.value)}
                      className="w-4/6 text-black mx-4 rounded pl-1"
                    >
                      <option key={100} value={null}></option>
                      {companyList &&
                        companyList.map((company, index) => (
                          <option key={index} value={company.id}>
                            {company.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="">
                    <p className="text-red-500 text-sm text-right">{roleError}</p>
                    <label className="text-white">Role: </label>
                    <select
                      name="selectedRole"
                      onClick={(e) => setRole(e.target.value)}
                      className="w-4/6 text-black mx-4 rounded pl-1"
                    >
                      <option key={110} value={null}></option>
                      {roleList &&
                        roleList.map((role, index) => (
                          <option key={index} value={role.id}>
                            {role.role}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="relative">
                    <button
                      className="bg-pink-900 shadow shadow-gray-800 text-white rounded-md px-2 py-1 hover:bg-pink-500 disabled:bg-slate-300"
                      type="submit"
                      disabled={!validateForm}
                    >
                      Submit
                    </button>
                    <Link to="/" className="text-white text-right text-xs mx-7">
                      Already Signed Up?
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

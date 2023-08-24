import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { roleList } from "../utilities";
import {
  BsArrowLeftShort,
  BsChevronDown,
  BsReverseLayoutTextSidebarReverse,
  BsPerson,
  BsPeopleFill,
} from "react-icons/bs";
import {
  AiOutlineBuild,
  AiOutlineBarChart,
  AiOutlineLogout,
  AiOutlineMail,
  AiOutlineSetting,
} from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import { TbLayoutGridAdd, TbPlaylistAdd } from "react-icons/tb";


export default function NavBar(props) {
  const { logOut, company, setSprintID } = props;
  const [open, setOpen] = useState(true);
  const [projectOpen, setProjectOpen] = useState(false);
  const [employeeOpen, setEmployeeOpen] = useState(false);
  const [sprintOpen, setSprintOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();

  // List for basic menus, all the extended lists needed to be pulled out
  const Menus = [
    {
      title: "Sprint Board",
      spacing: true,
      onClick: () => navigate("/company"),
    },
    {
      title: "Add Sprint",
      icon: <TbPlaylistAdd />,
      onClick: () => navigate("add_sprint"),
    },
    {
      title: "Add Ticket",
      icon: <TbLayoutGridAdd />,
      onClick: () => navigate("add_ticket"),
    },
    { 
      title: "Inbox", 
      icon: <AiOutlineMail />,
      onClick: () => navigate("test") 
    },
    { title: "Profile", spacing: true, icon: <BsPerson /> },
    { title: "Setting", icon: <AiOutlineSetting /> },
    { title: "Logout", icon: <AiOutlineLogout />, onClick: logOut },
  ];

  return (
    <div className="flex">
      <div
        className={`bg-pink-800 shadow-black shadow-lg min-h-screen p-5 pt-8 ${
          open ? "w-72" : "w-20"
        } duration-300 relative`}
      >
        {/* ***** Heading ***** */}
        <BsArrowLeftShort
          className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="inline-flex">
          <AiOutlineBuild
            className={`bg-blue-100 text-4xl  rounded  cursor-pointer block float-left mr-2 duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-2xl duration-300 ${
              !open && "scale-0"
            }`}
          >
            {company.name}
          </h1>
        </div>
        {selectedProject && (
          <h2 className={`text-white ${!open && "hidden"}`}>
            Project Manager - {selectedProject.project_manager.name}
          </h2>
        )}
        <ul className="pt-2">
          {/* *****  Projects  ***** */}
          <>
            <li
              key={1}
              className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 duration-200  hover:bg-light-white rounded-md mt-2"
              onClick={() => setProjectOpen(!projectOpen)}
            >
              <span className="text-2xl block `float-left">
                <BsReverseLayoutTextSidebarReverse />
              </span>
              <span
                className={`text-base font-medium flex-1 duration-200 ${
                  !open && "hidden"
                }`}
              >
                Projects
              </span>
              <BsChevronDown className={`${projectOpen && "rotate-180"}`} />
            </li>
            {company.projects && projectOpen && open && (
              <ul>
                {company.projects.map((project) => (
                  <li
                    key={project.id}
                    className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white rounded-md group relative w-max"
                    onClick={() => setSelectedProject(project)}
                  >
                    {project.name}
                    <span className="bg-white text-lg text-gray-500 pointer-events-none absolute -top-4 left-full w-max opacity-0 rounded-md transition-opacity group-hover:opacity-100">
                      {project.description}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </>

          {/* *****  Employees  ***** */}
          <>
            <li
              key={4}
              className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2"
              onClick={() => setEmployeeOpen(!employeeOpen)}
            >
              <span className="text-2xl block `float-left">
                <BsPeopleFill />
              </span>
              <span
                className={`text-base font-medium flex-1 duration-200 ${
                  !open && "hidden"
                }`}
              >
                Development Team
              </span>
              <BsChevronDown className={`${employeeOpen && "rotate-180"}`} />
            </li>
            {company.employees && employeeOpen && open && (
              <ul>
                {company.employees.map((employee) => (
                  // const role = roleList.find((role) => role.id === employee.role)
                  <li
                    key={employee.id}
                    className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white rounded-md"
                  >
                    {`${employee.name} - ${roleList.find((role) => role.id === employee.role).role}`}
                  </li>
                ))}
              </ul>
            )}
          </>

          {/* *****  Sprints  ***** */}
          {selectedProject && (
            <>
              <li
                key={3}
                className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2"
                onClick={() => setSprintOpen(!sprintOpen)}
              >
                <span className="text-2xl block `float-left">
                  <AiOutlineBarChart />
                </span>
                <span
                  className={`text-base font-medium flex-1 duration-200 ${
                    !open && "hidden"
                  }`}
                >
                  Sprint
                </span>
                <BsChevronDown className={`${sprintOpen && "rotate-180"}`} />
              </li>
              {selectedProject.sprints && sprintOpen && open && (
                <ul>
                  {selectedProject.sprints.map((sprint) => (
                    <li
                      key={sprint.id}
                      className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white rounded-md"
                      onClick={() => setSprintID(sprint.id)}
                    >
                      {sprint.name}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {/* ******  Everything Else (from Menus Obj) ****** */}
          {Menus.map((menu, index) => (
            <React.Fragment key={index}>
              <li
                // key={index}
                className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${
                  menu.spacing ? "mt-9" : "mt-2"
                }`}
                onClick={menu.onClick}
              >
                <span className="text-2xl block float-left">
                  {menu.icon ? menu.icon : <RiDashboardFill />}
                </span>
                <span
                  // key={index}
                  className={`text-base font-medium flex-1 duration-200 ${
                    !open && "hidden"
                  }`}
                >
                  {menu.title}
                </span>
                {menu.submenu && open && (
                  <BsChevronDown
                    className={`${submenuOpen && "rotate-180"}`}
                    onClick={() => setSubmenuOpen(!submenuOpen)}
                  />
                )}
              </li>
              {menu.submenu && submenuOpen && open && (
                <ul>
                  {menu.submenuItems.map((submenuItem, subIndex) => (
                    <li
                      key={subIndex}
                      className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white rounded-md"
                    >
                      {submenuItem.name}
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
}

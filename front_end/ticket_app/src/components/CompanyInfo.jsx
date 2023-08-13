import ProjectInfo from "./ProjectInfo"

export default function CompanyInfo(props) {

    const { company } = props

    return (
        <div className="text-white border-blue-900 border-2">
            <h3>{company.name}</h3>
            <h4>Employees:</h4>
            <ul className="mx-10">
                {company.employees.map((employee) => (
                    <li key={employee.id}>{employee.name}</li>
                ))}
            </ul>
            <h4>Projects: </h4>
            <ul>
                {company.projects.map((project) => (
                    <ProjectInfo key={project.id} project={project} />
                    // <li>{project.name}</li>
                ))}
            </ul>
        </div>
    )
}
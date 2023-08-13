import SprintInfo from "./SprintInfo"

export default function ProjectInfo(props) {

  const { project } = props

  return (
    <div>
      {/* <h2>this stuff here</h2> */}
      {project && <h5 className="mx-10">Project: {project.name}</h5>}
      {project && <p className="mx-20">Description: {project.description}</p>}
      {/* {project.sprint && <h6 className="mx-30">Sprint: </h6>} */}
      {project && (project.sprints.map((sprint) => (
        // <h6 className="mx-40" key={sprint.id}>{sprint.name}</h6>
        <SprintInfo sprint={sprint} />
      )))}
    </div>
  )
}
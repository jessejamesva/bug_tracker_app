import { Stack, Dropdown } from "react-bootstrap"

export default function ProjectInfo() {
  return (
    <Stack direction="vertical" gap={3}>
      <Dropdown className="mt-4">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Current Project Name
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Project 2</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another Project</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Probably Not Gonna Happen</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <h3>Project Manager</h3>
      <div className="project_team">Team</div>
    </Stack>    
  )
}
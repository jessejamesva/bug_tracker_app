import { Button, Container, Col, Row } from "react-bootstrap"
import "./pages.css"
import ProjectInfo from "../components/ProjectInfo"

export default function CompanyPage() {
  return(
    <div >
      <Container className="company">
        <Row>
          <Col lg={3} className="project">
            <ProjectInfo />
          </Col>
          <Col className="sprint">
            <Row className="sprint">
              <Col className="sprint_title ">
                <h1 className="my-4">Sprint Name</h1>
              </Col>
              <Col lg={3} className="sprint_buttons d-grid">
                <Button className="my-2">Add Sprint</Button>
                <Button className="my-2">Add Employee</Button>
              </Col>
            </Row>
            <Row className="task">
              <Col className="unassigned">Unassigned</Col>
              <Col className="in_progress">In Progress</Col>
              <Col className="testing">Testing</Col>
              <Col className="approved">Approved</Col>
            </Row>
          </Col>
        </Row>
      </Container>
      
    </div>
  )
}
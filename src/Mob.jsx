import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import "./mob.css";
function Mob(props) {
  return (
    <Container className="mob">
      <Form.Label>{props.title}</Form.Label>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Character Name</InputGroup.Text>
        <Form.Control
          placeholder={props.nameValue}
          aria-label="name"
          aria-describedby="basic-addon1"
          onChange={props.onNameChange}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Gender</InputGroup.Text>
        <Form.Select
          aria-label="Default select example"
          onChange={props.onGenderChange}
        >
          <option>Gender</option>
          <option value="he">he/him</option>
          <option value="she">she/her</option>
          <option value="they">they/them</option>
          <option value="ve">ve/ver</option>
          <option value="ze">ze/hir</option>
        </Form.Select>
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Object</InputGroup.Text>
        <Form.Control
          placeholder={props.objectValue}
          aria-label="name"
          aria-describedby="basic-addon1"
          onChange={props.onObjectChange}
        />
      </InputGroup>
    </Container>
  );
}

export default Mob;

import { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./mob.css";

/** @typedef {import("./parse-text").ObjectState} ObjectState */
/** @typedef {{ title: string; state: ObjectState; onChange: (state: ObjectState) => void; }} Props */

/** @type {import("react").FC<Props>} */
const Mob = ({ title, state, onChange }) => {
  const [name, setName] = useState(state.name);
  const [gender, setGender] = useState(state.gender);
  const [object, setObject] = useState(state.object);

  const handleName = (event) => {
    setName(event.target.value);
    onChange({ gender, name: event.target.value, object });
  };

  const handleGender = (event) => {
    setGender(event.target.value);
    onChange({ gender: event.target.value, name, object });
  };

  const handleObject = (event) => {
    setObject(event.target.value);
    onChange({ gender, name, object: event.target.value });
  };

  return (
    <Container className="mob">
      <Form.Label>{title}</Form.Label>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Character Name</InputGroup.Text>
        <Form.Control
          placeholder={name}
          aria-label="name"
          aria-describedby="basic-addon1"
          onChange={handleName}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Gender</InputGroup.Text>
        <Form.Select
          aria-label="Default select example"
          onChange={handleGender}
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
          placeholder={object}
          aria-label="name"
          aria-describedby="basic-addon1"
          onChange={handleObject}
        />
      </InputGroup>
    </Container>
  );
};

export default Mob;

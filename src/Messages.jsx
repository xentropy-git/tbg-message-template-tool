import { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

/** @typedef {{actor: string; subject: string; room: string}} Messages */

/** @type {import("react").FC<{messages: Messages; onChange: (messages: Messages) => void}>} */
export const Messages = ({ messages, onChange }) => {
  const [actor, setActor] = useState(messages.actor);
  const [subject, setSubject] = useState(messages.subject);
  const [room, setRoom] = useState(messages.room);

  const handleActor = (event) => {
    setActor(event.target.value);
    onChange({ actor: event.target.value, subject, room });
  };

  const handleSubject = (event) => {
    setSubject(event.target.value);
    onChange({ actor, subject: event.target.value, room });
  };

  const handleRoom = (event) => {
    setRoom(event.target.value);
    onChange({ actor, subject, room: event.target.value });
  };

  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Actor's Message</InputGroup.Text>
        <Form.Control
          aria-label="name"
          aria-describedby="basic-addon1"
          placeholder="You stab %s% with your %a-obj%."
          onChange={handleActor}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Subject's Message</InputGroup.Text>
        <Form.Control
          aria-label="name"
          aria-describedby="basic-addon1"
          placeholder="%a% stabs you with %a-his% %a-obj%."
          onChange={handleSubject}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Room Message</InputGroup.Text>
        <Form.Control
          aria-label="name"
          aria-describedby="basic-addon1"
          placeholder="%a% stabs %s% with %a-his% %a-obj%."
          onChange={handleRoom}
        />
      </InputGroup>
    </>
  );
};

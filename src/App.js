import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./App.css";
import Mob from "./Mob";
import { parseText } from "./parse-text";
import Table from "./Table";

function App() {
  const [actor, setActor] = useState({
    name: "Leeroy Jenkins",
    gender: "Male",
    object: "short sword",
  });

  const [subject, setSubject] = useState({
    name: "the goblin",
    gender: "Female",
    object: "shield",
  });

  const [messages, setMessages] = useState({
    actor: "You stab %s% with your %a-obj%.",
    subject: "%a% stabs you with %a-his% %a-obj%.",
    room: "%a% stabs %s% with %a-his% %a-obj%.",
  });

  const [parsed, setParsed] = useState({
    actor: " ",
    subject: "",
    room: " ",
  });

  useEffect(() => {
    setParsed({
      actor: parseText(actor, subject, messages.actor),
      subject: parseText(actor, subject, messages.subject),
      room: parseText(actor, subject, messages.room),
    });
  }, [messages, actor, subject]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Xentropy's Message Template Tool</h1>
      </header>

      <main>
        <div className="main-div">
          <Table actor={actor} subject={subject} />

          <Container className="mobs">
            <Mob title="Actor" state={actor} onChange={setActor} />
            <Mob title="Subject" state={subject} onChange={setSubject} />
          </Container>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Actor's Message</InputGroup.Text>
            <Form.Control
              aria-label="name"
              aria-describedby="basic-addon1"
              placeholder="You stab %s% with your %a-obj%."
              onChange={(event) => {
                setMessages({ ...messages, actor: event.target.value });
              }}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              Subject's Message
            </InputGroup.Text>
            <Form.Control
              aria-label="name"
              aria-describedby="basic-addon1"
              placeholder="%a% stabs you with %a-his% %a-obj%."
              onChange={(event) => {
                setMessages({
                  ...messages,
                  subject: event.target.value,
                });
              }}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Room Message</InputGroup.Text>
            <Form.Control
              aria-label="name"
              aria-describedby="basic-addon1"
              placeholder="%a% stabs %s% with %a-his% %a-obj%."
              onChange={(event) => {
                setMessages({ ...messages, room: event.target.value });
              }}
            />
          </InputGroup>

          <div className="output-container">
            <div className="output">
              <span className="output-pov">Actor sees:</span>
              {parsed.actor}
            </div>
            <div className="output">
              <span className="output-pov">Subject sees:</span>
              {parsed.subject}
            </div>
            <div className="output">
              <span className="output-pov">Room sees:</span>
              {parsed.room}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
/*
"%a%" : actorState.name,
    "%as%" : possessiveName(actorState.name),
    "%a-he%" : genderSubject(actorState.gender),
    "%a-him%" : genderObject(actorState.gender),
    "%a-his%" : genderPossessive(actorState.gender),
    "%a-hers%" : genderPossessivePronoun(actorState.gender),
    "%a-himself%" : genderReflexive(actorState.gender),
    "%a-obj%" : actorState.object,
    "%s%" : subjectState.name,
    "%ss%" : possessiveName(subjectState.name),
    "%s-he%" : genderSubject(subjectState.gender),
    "%s-him%" : genderObject(subjectState.gender),
    "%s-his%" : genderPossessive(subjectState.gender),
    "%s-hers%" : genderPossessivePronoun(subjectState.gender),
    "%s-himself%" : genderReflexive(subjectState.gender),
    "%s-obj%" : subjectState.object
    */
export default App;

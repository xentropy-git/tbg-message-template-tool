import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./App.css";
import Mob from "./Mob";
import { parseText } from "./parse-text";
import TemplateTable from "./TemplateTable";

function parseMessages(actorState, subjectState, messages) {
  return {
    actorMessage: parseText(actorState, subjectState, messages.actorMessage),
    subjectMessage: parseText(
      actorState,
      subjectState,
      messages.subjectMessage
    ),
    roomMessage: parseText(actorState, subjectState, messages.roomMessage),
  };
}

function App() {
  const [actorState, setActorState] = useState({
    name: "Leeroy Jenkins",
    gender: "Male",
    object: "short sword",
  });
  const [subjectState, setSubjectState] = useState({
    name: "the goblin",
    gender: "Female",
    object: "shield",
  });
  const [messages, setMessages] = useState({
    actorMessage: "You stab %s% with your %a-obj%.",
    subjectMessage: "%a% stabs you with %a-his% %a-obj%.",
    roomMessage: "%a% stabs %s% with %a-his% %a-obj%.",
  });
  const [parsedMessages, setParsedMessages] = useState({
    actorMessage: " ",
    subjectMessage: "",
    roomMessage: " ",
  });
  useEffect(() => {
    setParsedMessages(parseMessages(actorState, subjectState, messages));
  }, [messages, actorState, subjectState]);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Xentropy's Message Template Tool</h1>
      </header>
      <main>
        <div className="main-div">
          <TemplateTable actorState={actorState} subjectState={subjectState} />

          <Container className="mobs">
            <Mob title="Actor" state={actorState} onChange={setActorState} />
            <Mob
              title="Subject"
              state={subjectState}
              onChange={setSubjectState}
            />
          </Container>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Actor's Message</InputGroup.Text>
            <Form.Control
              aria-label="name"
              aria-describedby="basic-addon1"
              placeholder="You stab %s% with your %a-obj%."
              onChange={(event) => {
                setMessages({ ...messages, actorMessage: event.target.value });
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
                  subjectMessage: event.target.value,
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
                setMessages({ ...messages, roomMessage: event.target.value });
              }}
            />
          </InputGroup>
          <div className="output-container">
            <div className="output">
              {" "}
              <span className="output-pov">Actor sees:</span>
              {parsedMessages.actorMessage}
            </div>
            <div className="output">
              {" "}
              <span className="output-pov">Subject sees:</span>
              {parsedMessages.subjectMessage}
            </div>
            <div className="output">
              {" "}
              <span className="output-pov">Room sees:</span>
              {parsedMessages.roomMessage}
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

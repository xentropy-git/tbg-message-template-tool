import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "./App.css";
import { Messages } from "./Messages";
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
    <>
      <header className="App-header">
        <h1>Xentropy's Message Template Tool</h1>
      </header>

      <Container>
        <Table actor={actor} subject={subject} />

        <Row>
          <Col md>
            <Mob title="Actor" state={actor} onChange={setActor} />
          </Col>
          <Col md>
            <Mob title="Subject" state={subject} onChange={setSubject} />
          </Col>
        </Row>

        <Messages messages={messages} onChange={setMessages} />
      </Container>

      <Container className="output-container">
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
      </Container>
    </>
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

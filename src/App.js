import React, { useEffect, useState } from "react";
import Mob from "./Mob";
import "./App.css";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

function possessiveName(name) {
  if (!name) return "";
  if (name[name.length] === "s") name = name + "'";
  else name = name + "'s";
  return name;
}

function genderPossessive(gender) {
  switch (gender) {
    case "he":
      return "his";
    case "she":
      return "her";
    case "they":
      return "their";
    case "ve":
      return "vis";
    case "ze":
      return "hir";
    default:
      return "his";
  }
}
function genderObject(gender) {
  switch (gender) {
    case "he":
      return "him";
    case "she":
      return "her";
    case "they":
      return "them";
    case "ve":
      return "ver";
    case "ze":
      return "hir";
    default:
      return "him";
  }
}
function genderSubject(gender) {
  switch (gender) {
    case "he":
      return "he";
    case "she":
      return "she";
    case "they":
      return "they";
    case "ve":
      return "ve";
    case "ze":
      return "ze";
    default:
      return "he";
  }
}
function genderPossessivePronoun(gender) {
  switch (gender) {
    case "he":
      return "his";
    case "she":
      return "hers";
    case "they":
      return "theirs";
    case "ve":
      return "vis";
    case "ze":
      return "hirs";
    default:
      return "his";
  }
}
function genderReflexive(gender) {
  switch (gender) {
    case "he":
      return "himself";
    case "she":
      return "herself";
    case "they":
      return "themself";
    case "ve":
      return "verself";
    case "ze":
      return "hirself";
    default:
      return "himself";
  }
}
function parseText(actorState, subjectState, message) {
  const match_text = {
    "%a%": actorState.name,
    "%as%": possessiveName(actorState.name),
    "%a-he%": genderSubject(actorState.gender),
    "%a-him%": genderObject(actorState.gender),
    "%a-his%": genderPossessive(actorState.gender),
    "%a-hers%": genderPossessivePronoun(actorState.gender),
    "%a-himself%": genderReflexive(actorState.gender),
    "%a-obj%": actorState.object,
    "%s%": subjectState.name,
    "%ss%": possessiveName(subjectState.name),
    "%s-he%": genderSubject(subjectState.gender),
    "%s-him%": genderObject(subjectState.gender),
    "%s-his%": genderPossessive(subjectState.gender),
    "%s-hers%": genderPossessivePronoun(subjectState.gender),
    "%s-himself%": genderReflexive(subjectState.gender),
    "%s-obj%": subjectState.object,
  };
  let re = new RegExp(Object.keys(match_text).join("|"), "g");

  message = message.replace(re, (match) => match_text[match]);
  return message[0].toUpperCase() + message.substring(1);
}

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
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Replacement</th>
                  <th>Code</th>
                  <th>Replacement</th>
                </tr>
              </thead>
              <tr>
                <td>%a%</td>
                <td>{actorState.name}</td>
                <td>%s%</td>
                <td>{subjectState.name}</td>
              </tr>
              <tr>
                <td>%as%</td>
                <td>{possessiveName(actorState.name)}</td>
                <td>%ss%</td>
                <td>{possessiveName(subjectState.name)}</td>
              </tr>
              <tr>
                <td>%a-he%</td>
                <td>{genderSubject(actorState.gender)}</td>
                <td>%s-he%</td>
                <td>{genderSubject(subjectState.gender)}</td>
              </tr>
              <tr>
                <td>%a-him%</td>
                <td>{genderObject(actorState.gender)}</td>
                <td>%s-him%</td>
                <td>{genderObject(subjectState.gender)}</td>
              </tr>
              <tr>
                <td>%a-her%</td>
                <td>{genderPossessivePronoun(actorState.gender)}</td>
                <td>%s-her%</td>
                <td>{genderPossessivePronoun(subjectState.gender)}</td>
              </tr>
              <tr>
                <td>%a-himself%</td>
                <td>{genderReflexive(actorState.gender)}</td>
                <td>%s-himself%</td>
                <td>{genderReflexive(subjectState.gender)}</td>
              </tr>
              <tr>
                <td>%a-obj%</td>
                <td>{actorState.object}</td>
                <td>%s-obj%</td>
                <td>{subjectState.object}</td>
              </tr>
            </Table>
          </div>
          <Container className="mobs">
            <Mob
              title="Actor"
              nameValue={actorState.name}
              objectValue={actorState.object}
              genderValue={actorState.gender}
              onNameChange={(event) => {
                setActorState({ ...actorState, name: event.target.value });
              }}
              onGenderChange={(event) => {
                setActorState({ ...actorState, gender: event.target.value });
              }}
              onObjectChange={(event) => {
                setActorState({ ...actorState, object: event.target.value });
              }}
            />
            <Mob
              title="Subject"
              nameValue={subjectState.name}
              objectValue={subjectState.object}
              genderValue={subjectState.gender}
              onNameChange={(event) => {
                setSubjectState({ ...subjectState, name: event.target.value });
              }}
              onGenderChange={(event) => {
                setSubjectState({
                  ...subjectState,
                  gender: event.target.value,
                });
              }}
              onObjectChange={(event) => {
                setSubjectState({
                  ...subjectState,
                  object: event.target.value,
                });
              }}
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

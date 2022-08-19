import Table from "react-bootstrap/Table";
import {
  genderObject,
  genderPossessivePronoun,
  genderReflexive,
  genderSubject,
  possessiveName,
} from "./parse-text";

/** @typedef {import("./parse-text").ObjectState} ObjectState */
/** @typedef {{ actor: ObjectState; subject: ObjectState }} Props */

/** @type {import("react").FC<Props>} */
const TemplateTable = ({ actor, subject }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Code</th>
          <th>Replacement</th>
          <th>Code</th>
          <th>Replacement</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>%a%</td>
          <td>{actor.name}</td>
          <td>%s%</td>
          <td>{subject.name}</td>
        </tr>
        <tr>
          <td>%as%</td>
          <td>{possessiveName(actor.name)}</td>
          <td>%ss%</td>
          <td>{possessiveName(subject.name)}</td>
        </tr>
        <tr>
          <td>%a-he%</td>
          <td>{genderSubject(actor.gender)}</td>
          <td>%s-he%</td>
          <td>{genderSubject(subject.gender)}</td>
        </tr>
        <tr>
          <td>%a-him%</td>
          <td>{genderObject(actor.gender)}</td>
          <td>%s-him%</td>
          <td>{genderObject(subject.gender)}</td>
        </tr>
        <tr>
          <td>%a-her%</td>
          <td>{genderPossessivePronoun(actor.gender)}</td>
          <td>%s-her%</td>
          <td>{genderPossessivePronoun(subject.gender)}</td>
        </tr>
        <tr>
          <td>%a-himself%</td>
          <td>{genderReflexive(actor.gender)}</td>
          <td>%s-himself%</td>
          <td>{genderReflexive(subject.gender)}</td>
        </tr>
        <tr>
          <td>%a-obj%</td>
          <td>{actor.object}</td>
          <td>%s-obj%</td>
          <td>{subject.object}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default TemplateTable;

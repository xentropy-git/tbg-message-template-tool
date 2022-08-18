import Table from "react-bootstrap/Table";
import {
  genderObject,
  genderPossessivePronoun,
  genderReflexive,
  genderSubject,
  possessiveName,
} from "./parse-text";

/** @typedef {{ actorState: import("./parse-text").ObjectState; subjectState: import("./parse-text").ObjectState }} Props */

/** @type {import("react").FC<Props>} */
const TemplateTable = ({ actorState, subjectState }) => {
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
      </tbody>
    </Table>
  );
};

export default TemplateTable;

import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { putProblem, deleteProblem } from '../../actions/problems.client';
import { ProblemData } from '../../models/problem';
import InputGroup from '../input/InputGroup';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export default function PutProblem() {
  const [problemData, setProblemData] = useState<ProblemData>({});

  function handleSubmit() {
    putProblem(problemData);
  }

  function handleDelete() {
    deleteProblem(problemData.customId || '');
  }
  function handleInputChange(e: InputEvent) {
    setProblemData({ ...problemData, [e.target.id]: e.target.value });
  }

  return (
    <div>
      <div className="title-container">
        <h1 className="form-title"> PUT Problem </h1>
      </div>
      <div className="form-container">
        <Form>
          <InputGroup
            onChange={handleInputChange}
            model={problemData}
            keyList={[
              'customId',
              'title',
              'timeLimit',
              'memoryLimit',
              'contestId',
            ]}
          />
          <InputGroup
            onChange={handleInputChange}
            model={problemData}
            keyList={['statement', 'input', 'output']}
            renderType="textarea"
          />

          <Button
            className="input-container"
            variant="primary"
            onClick={handleSubmit}
          >
            PUT
          </Button>

          <Button
            className="input-container"
            variant="danger"
            onClick={handleDelete}
          >
            DELETE
          </Button>
        </Form>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { putProblem, deleteProblem } from '../../actions/problems.client';
import { ProblemData } from '../../models/problem';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export default function PutProblem() {
  const [problemData, setProblemData] = useState<ProblemData>({});

  function handleSubmit() {
    putProblem(problemData);
  }

  function handleDelete(){
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
          <div className="flex-inputs">
            {renderInputAreas(handleInputChange, problemData)}
          </div>
          {renderTextAreas(handleInputChange, problemData)}
        
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

function renderTextAreas(
  onChange: (e: InputEvent) => void,
  problemData: ProblemData
) {
  const keysOfProblemData: (keyof ProblemData)[] = [
    'statement',
    'input',
    'output',
  ];
  return keysOfProblemData.map((key: keyof ProblemData) => {
    if (key === 'sampleInputs') return null;
    if (key === 'tags') return null;
    return (
      <FloatingLabel key={key} className="mb-3" label={key}>
        <Form.Control
          as="textarea"
          id={key}
          value={problemData[key] || ''}
          onChange={onChange}
          style={{ height: '200px' }}
        />
      </FloatingLabel>
    );
  });
}

function renderInputAreas(
  onChange: (e: InputEvent) => void,
  problemData: ProblemData
) {
  const keysOfProblemData: (keyof ProblemData)[] = [
    'customId',
    'title',
    'timeLimit',
    'memoryLimit',
    'contestId',
  ];
  return keysOfProblemData.map((key: keyof ProblemData) => {
    if (key === 'sampleInputs') return null;
    if (key === 'tags') return null;
    return (
      <FloatingLabel className="input-container" key={key} label={key}>
        <Form.Control
          id={key}
          value={problemData[key] || ''}
          onChange={onChange}
        />
      </FloatingLabel>
    );
  });
}

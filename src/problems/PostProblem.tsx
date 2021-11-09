import { useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { ProblemData } from '../models/problem';
import './PostProblem.css';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export default function PostProblem() {
  const [problemData, setProblemData] = useState<ProblemData>({});

  const keysOfProblemData: (keyof ProblemData)[] = [
    'title',
    'statement',
    'timeLimit',
    'memoryLimit',
    'customId',
    'contestId',
    'input',
    'output',
  ];

  function handleSubmit() {
    console.log(problemData);
  }

  function handleInputChange(e: InputEvent) {
    setProblemData({ ...problemData, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <div className="title-container">
        <h1 className="form-title"> Post Problem </h1>
      </div>
      <div className="form-container">
        <Form>
          {renderInputAreas(handleInputChange, problemData)}
          {renderTextAreas(handleInputChange, problemData)}

          <Button variant="primary" onClick={handleSubmit}>
            Post problem
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
      <FloatingLabel key={key} controlId={key} className="mb-3" label={key}>
        <Form.Control
          as="textarea"
          value={problemData[key]}
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
      <FloatingLabel key={key} controlId={key} className="mb-3" label={key}>
        <Form.Control value={problemData[key]} onChange={onChange} />
      </FloatingLabel>
    );
  });
}

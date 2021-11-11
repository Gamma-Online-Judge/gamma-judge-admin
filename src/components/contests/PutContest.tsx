import { useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { deleteContest, putContest } from '../../actions/contests.client';
import { ContestData, ContestProblemData } from '../../models/contest';
import InputGroup from '../input/InputGroup';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export default function PutContest() {
  const [contestData, setContestData] = useState<ContestData>({});

  function handleSubmit() {
    putContest(contestData);
  }

  function handleDelete() {
    deleteContest(contestData.customId || '');
  }

  function handleInputChange(e: InputEvent) {
    setContestData({ ...contestData, [e.target.id]: e.target.value });
  }

  return (
    <div>
      <div className="title-container">
        <h1 className="form-title"> PUT Contest </h1>
      </div>
      <div className="form-container">
        <Form>
          <div className="flex-inputs">
            <InputGroup
              onChange={handleInputChange}
              model={contestData}
              keyList={['name', 'customId']}
            />
            <FloatingLabel className="input-container" label={'date'}>
              <Form.Control
                id={'date'}
                type="date"
                value={contestData.date?.toString()}
                onChange={handleInputChange}
              />
            </FloatingLabel>
          </div>
          <ContestDataList
            problems={contestData.problems || []}
            onChange={(problems) =>
              setContestData({ ...contestData, problems: problems })
            }
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

interface ContestDataListProps {
  problems: ContestProblemData[];
  onChange: (contestList: ContestProblemData[]) => void;
}
function ContestDataList({ problems, onChange }: ContestDataListProps) {
  const [newProblem, setNewProblem] = useState<ContestProblemData>({});
  function handleInputChange(e: InputEvent) {
    setNewProblem({ ...newProblem, [e.target.id]: e.target.value });
  }
  return (
    <div>
      {problems.map((problem) => (
        <div>
          {problem.identifier} {problem.problemId}
        </div>
      ))}

      <Form.Control
        id={'identifier'}
        value={newProblem.identifier}
        onChange={handleInputChange}
      />
      <Form.Control
        id={'problemId'}
        value={newProblem.problemId}
        onChange={handleInputChange}
      />
    </div>
  );
}

function renderInputAreas(
  onChange: (e: InputEvent) => void,
  contestData: ContestData
) {
  const keysOfContestData: (keyof ContestData)[] = ['name', 'customId'];
  return keysOfContestData.map((key: keyof ContestData) => {
    if (key === 'date') return null;
    if (key === 'problems') return null;
    return (
      <FloatingLabel className="input-container" key={key} label={key}>
        <Form.Control id={key} value={contestData[key]} onChange={onChange} />
      </FloatingLabel>
    );
  });
}

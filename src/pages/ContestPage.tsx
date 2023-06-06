import { useState } from 'react';
import { Button, Card, FloatingLabel, Form, ListGroup } from 'react-bootstrap';
import { deleteContest, getContest, putContest } from '../actions/contests.client';
import { ContestData, ContestProblemData } from '../models/contest';
import InputGroup from '../components/input/InputGroup';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export default function ContestPage() {
  const [contestData, setContestData] = useState<ContestData>({});
  const [contestFileJson, setContestFileJson] = useState<ContestData | any>({})

  const saveJsonProblem = async () => {
    console.log(contestFileJson);
    await putContest(contestFileJson);
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) return;

    const fileReader = new FileReader();
    fileReader.readAsText(files[0], "UTF-8");

    fileReader.onload = (e: any) => {
      setContestFileJson(JSON.parse(e.target.result));
    }
  };

  function handleGet() {
    getContest(contestData.customId || '').then(setContestData);
  }
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
              keyList={['customId', 'name']}
            />
            <FloatingLabel className="flex-input" label={'date'}>
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
            variant="success"
            onClick={handleGet}
          >
            GET
          </Button>

          <Button
            className="flex-input"
            variant="primary"
            onClick={handleSubmit}
          >
            PUT
          </Button>

          <Button
            className="flex-input"
            variant="danger"
            onClick={handleDelete}
          >
            DELETE
          </Button>
        </Form>
      </div>
      <div>
        <input
          type='file'
          onChange={handleFileUpload}
        />
        <Button
          type='button'
          onClick={saveJsonProblem}
        >Save file</Button>
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
  function addProblem() {
    onChange([...problems, newProblem]);
    setNewProblem({});
  }

  function deleteLastProblem() {
    onChange(problems.slice(0, -1));
  }

  return (
    <div style={{ marginTop: '10px', marginBottom: '10px' }}>
      <h5> Contest Problems </h5>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div style={{ margin: '6px' }}>
          <Card style={{ width: '18rem' }}>
            <Card.Header>Identifier : CustomID</Card.Header>
            <ListGroup variant="flush">
              {problems.map((problem, i) => (
                <ListGroup.Item key={i.toString()}>
                  {problem.identifier} : {problem.customId}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </div>
        <div style={{ margin: '6px' }}>
          <InputGroup
            onChange={handleInputChange}
            model={newProblem}
            keyList={['identifier', 'customId']}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Button style={{ margin: '6px' }} onClick={addProblem}>
              Add new Problem
            </Button>
            <Button
              variant="danger"
              style={{ margin: '6px' }}
              onClick={deleteLastProblem}
            >
              Delete last problem
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

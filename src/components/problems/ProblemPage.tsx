import { useState } from 'react';
import {
  Button,
  Card,
  FloatingLabel,
  Form,
  ListGroup,
  Table,
} from 'react-bootstrap';
import {
  putProblem,
  deleteProblem,
  getProblem,
} from '../../actions/problems.client';
import { ProblemData, SampleInputData } from '../../models/problem';
import InputGroup from '../input/InputGroup';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export default function ProblemPage() {
  const [problemData, setProblemData] = useState<ProblemData>({});

  function handleGet() {
    getProblem(problemData.customId || '').then(setProblemData);
  }

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

          <TagList
            tags={problemData.tags || []}
            onChange={(tags) => setProblemData({ ...problemData, tags: tags })}
          />

          <SampleInputList
            sampleInputs={problemData.sampleInputs || []}
            onChange={(sampleInputs) =>
              setProblemData({ ...problemData, sampleInputs: sampleInputs })
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

interface TagListProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}
function TagList({ tags, onChange }: TagListProps) {
  const [newTag, setNewTag] = useState<string>('');

  function addNewTag() {
    onChange([...tags, newTag]);
    setNewTag('');
  }

  function deleteLastTag() {
    onChange(tags.slice(0, -1));
  }

  return (
    <div style={{ marginTop: '10px', marginBottom: '10px' }}>
      <h5> Problem Tags </h5>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div style={{ margin: '6px' }}>
          <Card style={{ width: '18rem' }}>
            <Card.Header>Tags</Card.Header>
            <ListGroup variant="flush">
              {tags.map((tag, i) => (
                <ListGroup.Item key={i.toString()}>{tag}</ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </div>
        <div style={{ margin: '6px' }}>
          <FloatingLabel className="flex-input" label="New tag">
            <Form.Control
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
            />
          </FloatingLabel>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Button style={{ margin: '6px' }} onClick={addNewTag}>
              Add tag
            </Button>
            <Button
              variant="danger"
              style={{ margin: '6px' }}
              onClick={deleteLastTag}
            >
              Delete last tag
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SampleInputListProps {
  sampleInputs: SampleInputData[];
  onChange: (sampleInputs: SampleInputData[]) => void;
}
function SampleInputList({ sampleInputs, onChange }: SampleInputListProps) {
  const [newSampleInput, setNewSampleInput] = useState<SampleInputData>({});

  function handleInputChange(e: InputEvent) {
    setNewSampleInput({ ...newSampleInput, [e.target.id]: e.target.value });
  }

  function addNewSampleInput() {
    onChange([...sampleInputs, newSampleInput]);
    setNewSampleInput({});
  }

  function deleteLastSampleInput() {
    onChange(sampleInputs.slice(0, -1));
  }

  return (
    <div style={{ marginTop: '10px', marginBottom: '10px' }}>
      <h5> Problem Sample inputs </h5>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div style={{ margin: '6px' }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Input</th>
                <th>Output</th>
              </tr>
            </thead>
            <tbody>
              {sampleInputs.map((sampleInput, i) => (
                <tr key={i.toString()}>
                  <td>
                    <pre>{sampleInput.input}</pre>
                  </td>
                  <td>
                    <pre>{sampleInput.output}</pre>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div style={{ margin: '6px' }}>
          <InputGroup
            onChange={handleInputChange}
            model={newSampleInput}
            keyList={['input', 'output']}
            renderType="textarea"
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Button style={{ margin: '6px' }} onClick={addNewSampleInput}>
              Add sample input
            </Button>
            <Button
              variant="danger"
              style={{ margin: '6px' }}
              onClick={deleteLastSampleInput}
            >
              Delete last sample input
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

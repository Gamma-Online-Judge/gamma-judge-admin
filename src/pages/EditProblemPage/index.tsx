import { useEffect, useState } from 'react';
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
import { LanguageProblemData, ProblemData, SampleInputData } from '../../models/problem';
import InputGroup from '../../components/input/InputGroup';
import SaveFooter from '../../components/SaveFooter';
import './styles.css';
import { useHistory, useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from '../../components/Header/header';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export default function EditProblemPage() {
  const [problemData, setProblemData] = useState<ProblemData | any>({});
  const [languageProblemData, setLanguageProblemData] = useState<LanguageProblemData | any>({});
  const [allowEdit, setAllowEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [problemFileJson, setProblemFileJson] = useState<ProblemData | any>({})

  const params = useParams() as any;
  const history = useHistory();

  const decodeLanguageProblem = (languageProblem: any) => {
    return {
      ...languageProblem,
      statement: atob(languageProblem?.statement ?? ''),
      input: atob(languageProblem?.input ?? ''),
      output: atob(languageProblem?.output ?? ''),
      tutorial: atob(languageProblem?.tutorial ?? ''),
      notes: atob(languageProblem?.notes ?? '')
    }
  }

  useEffect(() => {
    if (params.customId){
      setIsEditing(true);
      getProblem(params?.customId).then(res => {
        console.log(res);
        setAllowEdit(true);
        setProblemData(res);
        setLanguageProblemData(decodeLanguageProblem(res.pt_BR))
      }).catch(err => {
        alert(err.response?.statusText?? err);
      })
    }
  }, [])

  const saveJsonProblem = async () => {
    await putProblem(problemFileJson);
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    console.log(files);

    if (!files) return;

    const fileReader = new FileReader();
    fileReader.readAsText(files[0], "UTF-8");

    fileReader.onload = (e: any) => {
      const jsonFileParsed = JSON.parse(e.target.result)
      setProblemData(jsonFileParsed);
      setLanguageProblemData(decodeLanguageProblem(jsonFileParsed.pt_BR))
    }
  };

  async function handleSave() {
    const problemRequest = problemData;
    problemRequest.pt_BR = languageProblemData;
    problemRequest.pt_BR.statement = btoa(problemRequest.pt_BR.statement);
    problemRequest.pt_BR.input = btoa(problemRequest.pt_BR.input);
    problemRequest.pt_BR.output = btoa(problemRequest.pt_BR.output);
    problemRequest.pt_BR.notes = btoa(problemRequest.pt_BR.notes);
    problemRequest.pt_BR.tutorial = btoa(problemRequest.pt_BR.tutorial);

    console.log(problemRequest);
    await putProblem(problemData);
  }

  async function handleDelete() {
    await deleteProblem(problemData.customId || '').then(res => {
      history.push('/problems');
    });
  }

  function handleInputChange(e: InputEvent, isLanguageKey: boolean = false) {
    if (isLanguageKey){
      setLanguageProblemData({ ...languageProblemData, [e.target.id]: e.target.value });
    }
    else {
      setProblemData({...problemData, [e.target.id]: e.target.value});
    }
  }

  return (
    <>
      <Header/>
    <Container>
      <div className="title-container">
        <h1 className="form-title"> { languageProblemData.title} </h1>
      </div>
      <div className="form-container">
        <Form>
          <FloatingLabel label="customId">
            <Form.Control
              id={"customId"}
              value={problemData.customId}
              onChange={(e: InputEvent) => {
                setAllowEdit(false);
                handleInputChange(e)
              }}
              />
          </FloatingLabel>
          <FloatingLabel label="title">
            <Form.Control
              id={"title"}
              value={languageProblemData.title}
              onChange={(e: InputEvent) => {
                handleInputChange(e, true);
              }}
              />
          </FloatingLabel>
          <InputGroup
            onChange={handleInputChange}
            model={problemData}
            keyList={[
              'timeLimit',
              'memoryLimit',
              'contestId',
            ]}
            />
          <InputGroup
            onChange={(value: InputEvent) => handleInputChange(value, true)}
            model={languageProblemData}
            keyList={['statement', 'input', 'output', 'notes', 'tutorial']}
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
        </Form>
      </div>
      <div style={{
        width: "1000px",
      }}>
        <input
          type='file'
          onChange={handleFileUpload}
          />
        <Button
          type='button'
          onClick={saveJsonProblem}
          >Save file</Button>
        <SaveFooter onDelete={handleDelete} onSave={handleSave} isDeleteDisabled={!isEditing} onImport={handleFileUpload}/>
      </div>
    </Container>
  </>
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

import { useEffect, useState } from 'react';
import { Container} from "@mui/material"
import { Button, Card, FloatingLabel, Form, ListGroup } from 'react-bootstrap';
import { deleteContest, getContest, putContest } from '../actions/contests.client';
import { ContestData, ContestProblemData } from '../models/contest';
import InputGroup from '../components/input/InputGroup';
import Header from '../components/Header/header';
import { useHistory, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export default function ContestPage() {
  const [contestData, setContestData] = useState<ContestData>({});
  const [isEditing, setIsEditing] = useState(false);

  const params = useParams() as any;
  const history = useHistory();

  useEffect(() => {
    if (params.contestId){
      setIsEditing(true)
      getContest(params.contestId).then(res => {
        setContestData(res);
      })
    }
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updateFields = async () => {
      const files = event.target.files;
  
      if (!files) return;
  
      const fileReader = new FileReader();
      fileReader.readAsText(files[0], "UTF-8");
  
      fileReader.onload = (e: any) => {
        setContestData(JSON.parse(e.target.result));
      }
    }

    toast.promise(
      updateFields,
      {
        pending: 'Importando...',
        success: 'Importado com sucesso!',
        error: 'Erro ao importar!',
      }
    )
  };

  function handleSubmit() {
    toast.promise(
      () => putContest(contestData),
      {
        pending: 'Salvando...',
        success: 'Salvo com sucesso!',
        error: 'Erro ao salvar!',
      }
    ).then(() => {
      history.push('/contests')
    })
  }

  function handleDelete() {
    toast.promise(
      () => deleteContest(contestData.customId || ''),
      {
        pending: 'Deletando...',
        success: 'Deletado com sucesso!',
        error: 'Erro ao Deletar!',
      }
    ).then(() => {
      history.push('/contests')
    })
  }

  function handleInputChange(e: InputEvent) {
    setContestData({ ...contestData, [e.target.id]: e.target.value });
  }

  return (
    <div>
      <Header/>
      <ToastContainer />
      <Container>

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
            className="flex-input"
            variant="primary"
            onClick={handleSubmit}
            >
            SAVE
          </Button>

          <Button
            className="flex-input"
            variant="danger"
            onClick={handleDelete}
            disabled={!isEditing}
            >
            DELETE
          </Button>
        </Form>
      </div>
      <div>

        <input
          type='file'
          onChange={handleFileUpload}/>
      </div>
    </Container>
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

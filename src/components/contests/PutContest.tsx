import { useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { deleteContest, putContest } from '../../actions/contests.client';
import { ContestData } from '../../models/contest';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export default function PutCOntest() {
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
            {renderInputAreas(handleInputChange, contestData)}
            <FloatingLabel className="input-container" label={'date'}>
              <Form.Control
                id={'date'}
                type="date"
                value={contestData.date?.toString()}
                onChange={handleInputChange}
              />
            </FloatingLabel>
          </div>

          <Button className="input-container" variant="primary" onClick={handleSubmit}>
            PUT
          </Button>

          <Button className="input-container" variant="danger" onClick={handleDelete}>
            DELETE
          </Button>
        </Form>
      </div>
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

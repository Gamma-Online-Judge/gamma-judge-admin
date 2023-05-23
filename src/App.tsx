import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import ContestPage from './pages/ContestPage';
import HomePage from './pages/HomePage';
import ProblemPage from './pages/EditProblemPage';
import { putProblem } from './actions/problems.client';
import { ProblemData } from './models/problem';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

function App() {

  const [problemFileJson, setProblemFileJson] = useState<ProblemData | any>({})

  const saveJsonProblem = async () => {
    await putProblem(problemFileJson);
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) return;

    const fileReader = new FileReader();
    fileReader.readAsText(files[0], "UTF-8");

    fileReader.onload = (e: any) => {
      setProblemFileJson(JSON.parse(e.target.result));
    }
  };
  return (
    <Router>
      <Route path="/" exact={true} component={HomePage} />
      <Route path="/problems" exact={true} component={ProblemPage} />
      <Route path="/contests" exact={true} component={ContestPage} />
      <input
        type='file'
        onChange={handleFileUpload}
      />
      <Button
        type='button'
        onClick={saveJsonProblem}
      >Save file</Button>
    </Router>
  );
}
export default App;

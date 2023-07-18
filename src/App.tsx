import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import ContestPage from './pages/ContestPage';
import HomePage from './pages/HomePage';
import ProblemPage from './pages/EditProblemPage';
import { ProblemListPage } from './pages/ProblemListPage';
import { ContestListPage } from './pages/ContestListPage';

function App() {
  return (
    <Router>
      <Route path="/" exact={true} component={HomePage} />
      <Route path="/problems/:customId" exact={true} component={ProblemPage} />
      <Route path="/problem/new" exact={true} component={ProblemPage} />
      <Route path="/problems" exact={true} component={ProblemListPage} />
      <Route path="/contests" exact={true} component={ContestListPage} />
      <Route path="/contests/:contestId" exact={true} component={ContestPage} />
      <Route path="/contest/new" exact={true} component={ContestPage} />
    </Router>
  );
}
export default App;

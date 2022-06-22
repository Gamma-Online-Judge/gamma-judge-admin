import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import ContestPage from './pages/ContestPage';
import HomePage from './pages/HomePage';
import ProblemPage from './pages/ProblemPage';

function App() {
  return (
    <Router>
      <Route path="/" exact={true} component={HomePage} />
      <Route path="/problems" exact={true} component={ProblemPage} />
      <Route path="/contests" exact={true} component={ContestPage} />
    </Router>
  );
}
export default App;

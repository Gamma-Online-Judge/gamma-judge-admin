import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import PutContest from './components/contests/PutContest';
import PutProblem from './components/problems/PutProblem';

function App() {
  return (
    <Router>
      <Route path="/" exact={true} component={Home} />
      <Route path="/problems" exact={true} component={PutProblem} />
      <Route path="/contests" exact={true} component={PutContest} />
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

export default App;

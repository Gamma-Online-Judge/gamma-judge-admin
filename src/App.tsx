import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import ContestPage from './components/contests/ContestPage';
import ProblemPage from './components/problems/ProblemPage';

function App() {
  return (
    <Router>
      <Route path="/" exact={true} component={Home} />
      <Route path="/problems" exact={true} component={ProblemPage} />
      <Route path="/contests" exact={true} component={ContestPage} />
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

export default App;

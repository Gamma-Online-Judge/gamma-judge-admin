import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import PutProblem from './problems/PutProblem';

function App() {
  return (
    <Router>
      <Route path="/" exact={true} component={Home} />
      <Route path="/putProblem" exact={true} component={PutProblem} />
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

export default App;

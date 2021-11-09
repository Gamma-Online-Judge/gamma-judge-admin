import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import PostProblem from './problems/PostProblem';

function App() {
  return (
    <Router>
      <Route path="/" exact={true} component={Home} />
      <Route path="/postProblem" exact={true} component={PostProblem} />
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

export default App;

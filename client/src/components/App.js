import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { connect } from "react-redux";
import * as actions from '../actions';
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";
function App(props) {
  useEffect(() => {
    props.fetchUser();
  });
  return (
    <div className="container">
      <Router>
        <div>
          <Header />
          <Route path="/" exact> <Landing /></Route>
          <Route path="/surveys" exact > <Dashboard /></Route>
          <Route path="/Surveys/new"> <SurveyNew /></Route>
        </div>
      </Router>
    </div>
  );
}

export default connect(null, actions)(App);

import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { connect } from "react-redux";
import * as actions from '../actions';
import Header from "./Header";
import Landing from "./Landing";
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew </h2>
function App(props) {
  useEffect(() => {
    props.fetchUser();
  }, []);
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

import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/surveys" element={<Dashboard />} />
            <Route path="/surveys/new" element={<SurveyNew />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);

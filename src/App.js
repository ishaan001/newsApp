import "./App.css";

import React, { Component } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      countryCode: "in",
        progress: 0
      };
  }
   

  setCountryCode = (countryCode) => {
    this.setState({
      countryCode: countryCode});
  }

  setProgress = (progress)=>{
    this.setState({
      progress: progress
    })
  }

  render() {
    return (
      <div>
        <Router> 
          <NavBar setCountryCode={this.setCountryCode} />
          <LoadingBar
            color='#f11946'
            height={3}
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} key="general" pageSize={20} countryCode={this.state.countryCode} category="general" />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={3} countryCode={this.state.countryCode} category="business" />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={3} countryCode={this.state.countryCode} category="entertainment" />} />
            <Route exact path="/general" element={<News setProgress={this.setProgress} key="general" pageSize={3} countryCode={this.state.countryCode} category="general" />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={3} countryCode={this.state.countryCode} category="health" />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={3} countryCode={this.state.countryCode} category="science" />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={3} countryCode={this.state.countryCode} category="sports" />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={3} countryCode={this.state.countryCode} category="technology" />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

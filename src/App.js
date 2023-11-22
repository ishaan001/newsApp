import "./App.css";

import React, { useState } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const apiKey = process.env.REACT_APP_NEWS_API
  const[countryCode, setCountryCode] = useState("in")
  const[progress, setProgress] = useState(0)
   
  const handleCountryCode = (countryCode) => {
     setCountryCode(countryCode)
  }

  const handleProgress = (progress)=>{
    setProgress(progress)
  }

    return (
      <div>
        <Router> 
          <NavBar handleCountryCode={handleCountryCode} />
          <LoadingBar
            color='#f11946'
            height={3}
            progress={progress}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={handleProgress} apiKey={apiKey} key="general" pageSize={20} countryCode={countryCode} category="general" />} />
            <Route exact path="/business" element={<News setProgress={handleProgress} apiKey={apiKey} key="business" pageSize={20} countryCode={countryCode} category="business" />} />
            <Route exact path="/entertainment" element={<News setProgress={handleProgress} apiKey={apiKey} key="entertainment" pageSize={20} countryCode={countryCode} category="entertainment" />} />
            <Route exact path="/health" element={<News setProgress={handleProgress} apiKey={apiKey} key="health" pageSize={20} countryCode={countryCode} category="health" />} />
            <Route exact path="/science" element={<News setProgress={handleProgress} apiKey={apiKey} key="science" pageSize={20} countryCode={countryCode} category="science" />} />
            <Route exact path="/sports" element={<News setProgress={handleProgress} apiKey={apiKey} key="sports" pageSize={20} countryCode={countryCode} category="sports" />} />
            <Route exact path="/technology" element={<News setProgress={handleProgress} apiKey={apiKey} key="technology" pageSize={20} countryCode={countryCode} category="technology" />} />
          </Routes>
        </Router>
      </div>
    );
 
}

export default App;
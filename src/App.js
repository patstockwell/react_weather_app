import React, { Component } from 'react';
import './App.css';
import ForecastPage from './pages/ForecastPage'

class App extends Component {
  render() {
    return (
      <div className="App">
        <ForecastPage />
      </div>
    );
  }
}

export default App;

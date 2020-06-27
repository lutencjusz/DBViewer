import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Fragment } from 'react';

function App() {
  return (
    <Fragment>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>To jest przykładowa aplikcja</h1>
        <h3>Pokazuje działanie useSVR oraz tabeli</h3>
      </header>
      <body>
        <h2>Przykład</h2>
      </body>
    </Fragment>
  );
}

export default App;

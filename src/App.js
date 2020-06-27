import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import { Fragment } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import TablePage from './pages';

function App() {
  return (
    <Fragment>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>To jest przykładowa aplikcja</h1>
        <h3>Pokazuje działanie useSVR oraz tabeli</h3>
      </header>
      <div className="body">
        <Suspense fallback={<div>loading...</div>}>
          <TablePage/>
        </Suspense>
      </div>
    </Fragment>
  );
}

export default App;

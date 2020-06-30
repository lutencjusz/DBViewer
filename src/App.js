import React, { Suspense, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import './neumorphism.css'
import TablePage from './pages';

function App() {
  return (
    <Fragment>
      <main>
        <section className="section section bg-soft pb-5 overflow-hidden z-2">
          <div className="container z-2">
            <div className="row justify-content-center text-center pt-6">
              <div className="col-lg-9 col-xl-9">
                <h1 className="display-2 mb-3">Przeglądarka do DB</h1>
                <h3 className="display-4 mb-3">Możliwości z przeglądaniem</h3>
                <Suspense fallback={<div>loading...</div>}>
                  <div id='table' />
                  <TablePage />
                </Suspense>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
}

export default App;

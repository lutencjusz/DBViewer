import React, { Suspense, Fragment } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import './neumorphism.css'
import TablePage from './pages';

function App() {
  return (
    <Fragment>
      <header className="header-global">
        <nav id="navbar-main" aria-label="Primary navigation" className="navbar navbar-main navbar-expand-lg navbar-theme-primary headroom navbar-light headroom--not-bottom headroom--pinned headroom--top">
          <div className="container position-relative">
            <div className="navbar-collapse collapse">
              <a href="mailto: admin@sopim.pl" className="btn btn-primary animate-up-2">Sopim</a>
            </div>
            <div className="nav nav-pills nav-fill flex-column flex-sm-row">
              <a href="mailto: admin@sopim.pl" className="btn btn-primary animate-up-2">Segregator</a>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <section className="section section bg-soft pb-5 ovrflow-hidden z-1">
          <div className="container z-2">
            <div className="row justify-content-center text-center">
              <div className="col-lg-9 col-xl-12">
                <h1 className="display-2 mb-2">Przeglądarka DB</h1>
                <h3 className="h5 mb-4">umożliwia przeglądanie i edycję tabel Segregatora</h3>
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

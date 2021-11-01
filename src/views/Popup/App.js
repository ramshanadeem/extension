import { createMemoryHistory } from 'history';
import React from 'react'
import {Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css'
import CreatePassword from './CreatePassword';
import Dashboard from './Dashboard';
import FormPassword from './pages/FormPassword';
import Recover from './Recover';
import SeedPhrase from './SeedPhrase';
import Welcome from './Welcome';

function App() {
  const history = createMemoryHistory();
  return (
    <div className="App">
      <header className="App-header">
       <BrowserRouter history={history}>
       <Switch>
         <Route path="/popup.html" component={Welcome}/>
         <Route path="/createPassword" component={CreatePassword}/>
         <Route path="/seedPhrase" component={SeedPhrase}/>
         <Route path="/recover" component={Recover}/>
         <Route path="/dashboard" component={Dashboard}/>
         <Route path="/create" component={FormPassword}/>
       </Switch>
       </BrowserRouter>
      </header>
    </div>
  );
}

export default App

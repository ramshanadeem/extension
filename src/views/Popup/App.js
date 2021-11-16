import { createMemoryHistory } from "history";
import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import CreatePassword from "./CreatePassword";
import Dashboard from "./Dashboard";
import ConfirmPhrase from "./pages/ConfirmPhrase";
import CreatedMask from "./pages/CreatedMask";
import FormPassword from "./pages/FormPassword";
import NotMatch from "./pages/NotMatch";
import Recover from "./Recover";
import SeedPhrase from "./SeedPhrase";
import Welcome from "./Welcome";
import Activity from "./pages/Activity";
import Assets from "./pages/Assets";
import ImportTokens from "./pages/ImportTokens";

function App() {
  const history = createMemoryHistory();

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter history={history}>
          <Switch>
            <Route path="/popup.html" component={Welcome} />
            <Route path="/createPassword" component={CreatePassword} />
            <Route path="/seedPhrase" component={SeedPhrase} />
            <Route path="/recover" component={Recover} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/create" component={FormPassword} />
            <Route path="/confirmPhrase" component={ConfirmPhrase} />
            <Route path="/createdMask" component={CreatedMask} />
            <Route path="/notMatch" component={NotMatch} />
            <Route path="/Activity" component={Activity} />
            <Route path="/Assets" component={Assets} />
            <Route path="/Importoken" component={ImportTokens} />
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;

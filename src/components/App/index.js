import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import TaxCalculator from "../../pages/TaxCalculator";
import NavigationBar from "../NavigationBar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <NavigationBar />
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={TaxCalculator} />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

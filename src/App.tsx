import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { TestLoginComponent } from './components/login/login.component';
import { HomePage, AboutPage } from './pages';
import { HeaderComponent } from './components/header/header.component';
import 'bootstrap/scss/bootstrap.scss';
import './App.css';

import { TaskuAppContext } from './store';
import { createServices } from './store/createServices';
import { createTestServiceStore } from './utils/testUtils/testServiceStore';

function App() {
  const services = createTestServiceStore();

  return (
    <>
      <TaskuAppContext.Provider value={{ services }}>
        <BrowserRouter>
          <HeaderComponent />

          <div className="container">

            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/about" component={AboutPage} />
              <Route exact path="/login" component={TestLoginComponent} />
            </Switch>

          </div>
        </BrowserRouter>
      </TaskuAppContext.Provider>
    </>

  );
}

export default App;

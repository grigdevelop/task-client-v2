import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { TestLoginComponent } from './components/login/login.component';
import { HomePage, AboutPage } from './pages';
import { HeaderComponent } from './components/header/header.component';
import 'bootstrap/scss/bootstrap.scss';
import './App.css';

function App() {
  return (
    <>
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
    </>

  );
}

export default App;

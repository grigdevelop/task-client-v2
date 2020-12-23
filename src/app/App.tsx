// external libraries
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// styles
import 'bootstrap/scss/bootstrap.scss';
import './App.css';

// internal files
import { HomePage, AboutPage } from '../pages';
import { NavigationComponent, LoginComponent } from '../features/auth';

// store
import { store } from '../store';

function App() {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <NavigationComponent />

          <div className="container">

            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/about" component={AboutPage} />
              <Route exact path="/login" component={LoginComponent} />
            </Switch>

          </div>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;

// external libraries
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// styles
import 'bootstrap/scss/bootstrap.scss';
import './App.css';

// internal files
import { HomePage, AboutPage, ProfilePage } from '../pages';

// components
import { NavigationComponent } from '../features/auth/components/navigation/navigation.component';
import { LoginComponent } from '../features/auth/components/login/login.components';

// store
import { configureStore } from '../store/configureStore';
import { createLocalApi } from '../api/local';

const api = createLocalApi();
const store = configureStore(api);

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
              <Route exact path="/profile" component={ProfilePage} />
            </Switch>

          </div>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';


// COMPONENTS and STYLES
import { Navbar } from './components';
import './scss/common.scss';

// VIEWS
import MainView from './views/MainView';
import InfoView from './views/InfoView';
import NotFoundView from './views/NotFoundView';

import ProjectManageView from './views/ProjectManageView';
import UsersView from './views/UsersView';
import UserDetailView from './views/UserDetailView';

// ROUTER
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// REDUX
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Thunk from 'redux-thunk';
import rootReducer from './modules';

const store = createStore(rootReducer, applyMiddleware(Thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={MainView}></Route>
            <Route exact path="/users" component={UsersView}></Route>
            <Route path="/users/:user_name" component={UserDetailView}></Route>
            <Route path="/projects" component={ProjectManageView}></Route>
            <Route path="/info" component={ InfoView }/>
            <Route path="*" component={ NotFoundView }/>
          </Switch>
        </>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

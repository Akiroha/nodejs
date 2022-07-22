import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

import Header from './components/Header';

const store = createStore(reducers, {}, applyMiddleware());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="container">
        <Header />
        <App />
      </div>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();

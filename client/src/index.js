import React from 'react';
import ReactDOM from 'react-dom';
import TagManager from 'react-gtm-module'
import App from './App';
import "./App.scss"

const tagManagerArgs = {
  gtmId: 'GTM-5XW8375'
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

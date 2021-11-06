import React from 'react';
import ReactDOM from 'react-dom';
import {Auth0Provider} from '@auth0/auth0-react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const url='http://localhost:3000/login';

ReactDOM.render(
    <Auth0Provider
    domain="dev-s24evrct.us.auth0.com"
    clientId="62eGWhkXlfDidOnfsCIgOk7wGalRpxGi"
    redirectUri={url}
    >
    <App />
    </Auth0Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

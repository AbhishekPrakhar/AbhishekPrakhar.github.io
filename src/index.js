import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Containers/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { store } from './Store/Store';
import 'bootstrap/dist/css/bootstrap.css';
import './Styles/GeneralStyles.css';
import './Styles/Roboto.css';
import './Components/CIP/GenericComponents/Modal/Modal.css';
// import Keycloak from "keycloak-js";
import axios from 'axios';


ReactDOM.render(
  <Provider store={store}>
      <div>
          <App />
      </div>
  </Provider>,
  document.getElementById('root')
);

// const kc = Keycloak(process.env.PUBLIC_URL+'/keycloak.json');
// const token = localStorage.getItem('kc_token');
// //console.log('token',token);
// const refreshToken = localStorage.getItem('kc_refreshToken');
// kc.init({onLoad: 'login-required', promiseType: 'native', token, refreshToken})
//   .then(authenticated => {
//     if (authenticated) {
      
//       store.getState().keycloak = kc;
//       updateLocalStorage();
//       var idTokenparsed=JSON.stringify(kc.idTokenParsed);
//      var idToken={...kc.tokenParsed};

// }
// });
// serviceWorker.unregister();
// axios.interceptors.request.use(config => (
//     kc.updateToken(5)
//       .then(refreshed => {
//         if (refreshed) {
//           updateLocalStorage()
//         }
//         config.headers.Authorization = 'Bearer ' + kc.token;
//         return Promise.resolve(config)
//       })
//       .catch(() => {
//         kc.login();
//       })
//     ));
    
//     const updateLocalStorage = () => {
//     //console.log(kc.idToken);
//     localStorage.setItem('kc_token', kc.token);
//     localStorage.setItem('kc_refreshToken', kc.refreshToken);
//     localStorage.setItem('kc_idTokenParsed', kc.tokenParsed);
    
//     };

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './context/authContext/AuthContext';
import { ListContextProvider } from './context/listContext/ListContext';
import { MovieProvider } from './context/movieContext/movieContext';
import { UserProvider } from './context/userContext/userContext';


ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <MovieProvider>
        <ListContextProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </ListContextProvider>
      </MovieProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import { AuthContextProvider } from './Context/AuthContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<AuthContextProvider>
    <App />
    </AuthContextProvider>

  </React.StrictMode>
);

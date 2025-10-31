import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import { GlobalStateProvider } from './context/GlobalStateContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <GlobalStateProvider>
        <App />
      </GlobalStateProvider>
    </Router>
  </React.StrictMode>
);
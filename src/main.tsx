import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';
import { SpeedInsights } from '@vercel/speed-insights/react'; // ← הוספה

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <SpeedInsights /> {/* ← הוספה */}
  </React.StrictMode>
);

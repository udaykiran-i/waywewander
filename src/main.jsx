import React from 'react';
import { createRoot } from 'react-dom/client';
import AOS from 'aos';
import 'aos/dist/aos.css';
import App from './App.jsx';
import './styles/global.css';

AOS.init({
  duration: 720,
  easing: 'ease-out-cubic',
  once: true,
  offset: 72,
});

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

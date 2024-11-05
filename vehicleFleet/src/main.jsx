import { StrictMode } from 'react'; // Correct import
import { createRoot } from 'react-dom/client'; // Correct import from react-dom/client
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom'; // Ensure this is correct

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
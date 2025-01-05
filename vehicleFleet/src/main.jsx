import { StrictMode } from 'react'; // Correct import
import { createRoot } from 'react-dom/client'; // Correct import from react-dom/client
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom'; // Ensure this is correct
import { Provider } from 'react-redux';
import { store } from './Redux/VehcileStore.js'; // Import the store

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
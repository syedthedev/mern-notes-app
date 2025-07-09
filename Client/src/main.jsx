import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AppContextProvider } from './Context/AppContext.jsx';
import { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';

Modal.setAppElement('#root');

createRoot(document.getElementById('root')).render(
  <AppContextProvider>
    <Toaster />
    <App />
  </AppContextProvider>,
);

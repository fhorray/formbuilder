import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { FormBuilderProvider } from './providers/dnd-provider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FormBuilderProvider>
      <App />
    </FormBuilderProvider>
  </StrictMode>,
);

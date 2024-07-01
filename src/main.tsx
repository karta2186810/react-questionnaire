import React from 'react';
import ReactDOM from 'react-dom/client';
import { setupMockServer } from './mocks';
import { AppProvider } from '@/providers';
import App from './App';

bootstrap();

async function bootstrap() {
  await setupMockServer();

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <AppProvider>
        <App />
      </AppProvider>
    </React.StrictMode>,
  );
}

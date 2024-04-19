import React from 'react';
import ReactDOM from 'react-dom/client';
import { IS_DEV } from './config';
import { setupMockServer } from './mocks';
import App from './App';

bootstrap();

async function bootstrap() {
  if (IS_DEV) await setupMockServer();

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

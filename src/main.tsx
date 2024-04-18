import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider, QueryClientProvider, NotificationProvider } from '@/providers';
import { router } from './router';
import { IS_DEV } from './config';
import { setupMockServer } from './mocks';

bootstrap();

async function bootstrap() {
  if (IS_DEV) await setupMockServer();

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryClientProvider>
        <ThemeProvider>
          <NotificationProvider>
            <RouterProvider router={router} />
          </NotificationProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>,
  );
}

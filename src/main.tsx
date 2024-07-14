import ReactDOM from 'react-dom/client';
import { IS_DEV } from './config';
import { setupMockServer } from './mocks';
import { AppProvider } from '@/providers';
import App from './App';

bootstrap();

async function bootstrap() {
  if (IS_DEV) await setupMockServer();

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <AppProvider>
      <App />
    </AppProvider>,
  );
}

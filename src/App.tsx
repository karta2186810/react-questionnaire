import { RouterProvider } from 'react-router-dom';
import { ThemeProvider, QueryClientProvider, NotificationProvider } from '@/providers';
import { router } from './router';

function App() {
  return (
    <QueryClientProvider>
      <ThemeProvider>
        <NotificationProvider>
          <RouterProvider router={router} />
        </NotificationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

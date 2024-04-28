import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useUser } from '@/features/auth';
import { AppRoutes } from './routes';

function App() {
  const { fetchUser } = useUser();
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

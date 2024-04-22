import { BrowserRouter } from 'react-router-dom';
import { useUser } from '@/features/auth';
import { AppRoutes } from './routes';

function App() {
  const { refetch } = useUser();
  refetch();

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

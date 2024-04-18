import { ReactNode, FC } from 'react';
import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export const QueryClientProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ReactQueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </ReactQueryClientProvider>
  );
};

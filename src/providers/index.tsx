import { FC, PropsWithChildren } from 'react';
import { NotificationProvider } from './NotificationProvider';
import { QueryClientProvider } from './QueryClientProvider';
import { ThemeProvider } from './ThemeProvider';
import { AuthProvider } from './AuthProvider';

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider>
      <ThemeProvider>
        <NotificationProvider>
          <AuthProvider>{children}</AuthProvider>
        </NotificationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

import { FC, PropsWithChildren } from 'react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';

export const NotificationProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MantineProvider>
      <Notifications position="top-center" />
      {children}
    </MantineProvider>
  );
};

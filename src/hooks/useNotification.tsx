import { useCallback } from 'react';
import { rem } from '@mantine/core';
import { notifications, NotificationData } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

export const useNotification = () => {
  const success = useCallback((notificationData: NotificationData) => {
    notifications.show({
      color: 'teal',
      icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      ...notificationData,
    });
  }, []);
  const error = useCallback((notificationData: NotificationData) => {
    notifications.show({
      color: 'red',
      icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      ...notificationData,
    });
  }, []);

  const show = useCallback((notificationData: NotificationData) => {
    notifications.show(notificationData);
  }, []);

  return {
    success,
    error,
    show,
  };
};

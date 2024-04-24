import { rem } from '@mantine/core';
import { notifications, NotificationData } from '@mantine/notifications';
import { IconCheck, IconCircleXFilled } from '@tabler/icons-react';

function success(notificationData: NotificationData) {
  notifications.show({
    color: 'teal',
    icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
    ...notificationData,
  });
}
function error(notificationData: NotificationData) {
  notifications.show({
    color: 'red',
    icon: <IconCircleXFilled style={{ width: rem(18), height: rem(18) }} />,
    ...notificationData,
  });
}

function show(notificationData: NotificationData) {
  notifications.show(notificationData);
}

export const notification = {
  success,
  error,
  show,
};

import { AppShell, Anchor, Text, Button, Group } from '@mantine/core';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import classes from './DefaultLayout.module.css';
import { Logo } from '@/components/elements';
import { useUser, useLogout } from '@/features/auth';

export const DefaultLayout = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { logout } = useLogout();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header className={classes.header}>
        <Anchor component={Link} to="/">
          <Logo width="40px" />
        </Anchor>
        {user ? (
          <Group>
            <Text>Hi, {user.nickname}</Text>
            <Button variant="subtle" onClick={handleLogout}>
              登出
            </Button>
          </Group>
        ) : (
          <Button component={Link} to="/auth/login" variant="filled">
            登入
          </Button>
        )}
      </AppShell.Header>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

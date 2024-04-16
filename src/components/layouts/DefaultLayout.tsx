import { AppShell, Anchor } from '@mantine/core';
import { Outlet, Link } from 'react-router-dom';
import { Logo } from '@/components/elements';
import classes from './default-layout.module.css';

export const DefaultLayout = () => (
  <AppShell header={{ height: 60 }}>
    <AppShell.Header className={classes.header}>
      <Anchor component={Link} to="/">
        <Logo width="40px" />
      </Anchor>
    </AppShell.Header>
    <AppShell.Main>
      <div className={classes.main}>
        <Outlet />
      </div>
    </AppShell.Main>
  </AppShell>
);

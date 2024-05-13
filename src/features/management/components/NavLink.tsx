import { FC, ReactNode } from 'react';
import { NavLink as MantineNavLink } from '@mantine/core';
import { Link, useMatch } from 'react-router-dom';

type NavLinkProps = {
  label: string;
  to: string;
  icon?: ReactNode;
};

export const NavLink: FC<NavLinkProps> = ({ label, to, icon }) => {
  const matches = useMatch(to);
  const isActive = !!matches;

  return (
    <MantineNavLink
      fw={500}
      component={Link}
      to={to}
      label={label}
      leftSection={icon}
      variant="light"
      active={isActive}
    />
  );
};

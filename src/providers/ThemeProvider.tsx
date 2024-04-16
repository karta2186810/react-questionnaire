import { FC, ReactNode } from 'react';
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

type ThemeProviderProps = {
  children: ReactNode;
};

const theme = createTheme({
  fontFamily: '"Noto Sans TC", sans-serif',
});

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
};

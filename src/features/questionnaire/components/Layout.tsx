import { useState, FC, PropsWithChildren } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Title, Group, TextInput, ActionIcon, Container } from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { Sidebar } from './Sidebar';
import classes from './Layout.module.css';

type LayoutProps = {
  title: string;
  loading?: boolean;
};

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({ title, loading = false, children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keywords, setKeywords] = useState(searchParams.get('keywords') ?? '');

  function handleSearch() {
    setSearchParams((params) => ({ ...params, keywords }));
  }

  return (
    <div className={classes.wrapper}>
      <Sidebar />
      <div className={classes.main}>
        <Container size="xl">
          <Group justify="space-between" mb={20}>
            <Title order={2}>{title}</Title>
            <Group justify="end">
              <TextInput
                value={keywords}
                disabled={loading}
                onChange={(e) => setKeywords(e.target.value.trim())}
                onKeyDown={getHotkeyHandler([['Enter', handleSearch]])}
                placeholder="輸入關鍵字"
              />
              <ActionIcon size="lg" disabled={loading} onClick={handleSearch}>
                <IconSearch />
              </ActionIcon>
            </Group>
          </Group>
          {children}
        </Container>
      </div>
    </div>
  );
};

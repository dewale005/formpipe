import '@mantine/core/styles.css';
import { AppShell, Container, MantineProvider } from '@mantine/core';

import { Router } from './Router';
import { theme } from './theme';
import { Menu } from './components/Menu';
import { RoleProvider } from './context/roles.context';

export default function App() {
  return (
    <RoleProvider>
      <MantineProvider theme={theme}>
        <Container size={'xl'} style={{ border: '1px solid #ccc' }}>
          <AppShell header={{ height: 70 }} padding="md">
            <AppShell.Header style={{ minWidth: 600 }}>
              <Menu />
            </AppShell.Header>
            <AppShell.Main>
              <Router />
            </AppShell.Main>
          </AppShell>
        </Container>
      </MantineProvider>
    </RoleProvider>
  );
}

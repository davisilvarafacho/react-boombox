import '@mantine/carousel/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';

import 'mantine-react-table/styles.css';

import 'index.css';

import 'dayjs/locale/pt-br';

import 'prototypes';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { DatesProvider } from '@mantine/dates';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { theme } from './theme';
import { Router } from './modules/Router';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <QueryClientProvider client={queryClient}>
        {import.meta.env.DEV && <ReactQueryDevtools position="bottom" initialIsOpen={false} />}
        <DatesProvider settings={{ locale: 'pt-br', firstDayOfWeek: 0 }}>
          <ModalsProvider>
            <Router />
            <Notifications position="bottom-left" />
          </ModalsProvider>
        </DatesProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
}

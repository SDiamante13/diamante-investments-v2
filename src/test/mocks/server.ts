import { setupServer } from 'msw/node';
import type { SetupServer } from 'msw/node';

export const server: SetupServer = setupServer();

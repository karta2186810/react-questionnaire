import { http, delay } from 'msw';
import { setupWorker } from 'msw/browser';
import { authHandlers } from './handlers/authHandler';
import { managementHandler } from './handlers/managementHandler';
import { questionnaireHandler } from './handlers/questionnaireHandler';

export const worker = setupWorker(
  http.all('*', async () => {
    await delay(1000);
  }),
  ...authHandlers,
  ...managementHandler,
  ...questionnaireHandler,
);

import { http, HttpResponse } from 'msw';
import { getMockQuestionnaire } from '../db/getMockQuestionnaire';

export const questionnaireHandler = [
  http.get('/api/questionnaires/:id', () => {
    return HttpResponse.json(getMockQuestionnaire());
  }),
  http.patch('/api/questionnaires/:id/edit', () => {
    return HttpResponse.json({ success: true });
  }),
];

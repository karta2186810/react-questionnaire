import { http, HttpResponse } from 'msw';
import { getMockQuestionnaire } from '../db/getMockQuestionnaire';
import { GetQuestionnaireResponse } from '@/features/questionnaire-editor';

export const questionnaireHandler = [
  http.get('/api/questionnaires/:id', () => {
    return HttpResponse.json<GetQuestionnaireResponse>(getMockQuestionnaire());
  }),
];

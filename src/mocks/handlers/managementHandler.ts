import { http, HttpResponse } from 'msw';
import { nanoid } from 'nanoid';
import { getMockQuestionnaires } from '../db/getMockQuestionnaires';
import {
  Questionnaire,
  GetQuestionnairesResponse,
  CreateQuestionnaireResponse,
  UpdateQuestionnaireDTO,
} from '@/features/management';

const questionnaires = getMockQuestionnaires({ count: 30 });

export const managementHandler = [
  http.get('/api/questionnaires', ({ request }) => {
    const searchParams = new URL(request.url).searchParams;

    let list = questionnaires;

    if (searchParams.get('deleted') === 'true') {
      list = list.filter((q) => q.isDeleted);
    } else {
      list = list.filter((q) => !q.isDeleted);
    }
    if (searchParams.get('favorite') === 'true') {
      list = list.filter((q) => q.isFavorite);
    }
    if (searchParams.get('keywords') !== null) {
      list = list.filter((q) => q.title.includes(searchParams.get('keywords')!));
    }

    let limit = searchParams.get('limit') ?? 10;
    limit = isNaN(+limit) ? 10 : +limit;
    let page = searchParams.get('page') ?? 1;
    page = isNaN(+page) ? 1 : +page;

    const totalPage = Math.ceil(list.length / limit);
    list = list.slice((page - 1) * limit, (page - 1) * limit + limit);

    return HttpResponse.json<GetQuestionnairesResponse>({
      totalPage,
      list,
    });
  }),
  http.post('/api/questionnaires', () => HttpResponse.json<CreateQuestionnaireResponse>({ _id: '1' })),
  http.delete<never, { ids: string[] }>('/api/questionnaires', async ({ request }) => {
    const { ids } = await request.json();

    ids.forEach((id) => {
      const index = questionnaires.findIndex((q) => q._id === id);
      questionnaires.splice(index, 1);
    });
    return new HttpResponse();
  }),
  http.patch<{ id: string }, UpdateQuestionnaireDTO>('/api/questionnaires/:id', async ({ params, request }) => {
    const id = params.id;
    const targetIndex = questionnaires.findIndex((q) => q._id === id);
    if (targetIndex === -1) return HttpResponse.json({ message: 'ID不存在' }, { status: 404 });
    const body = await request.json();
    questionnaires[targetIndex] = { ...questionnaires[targetIndex], ...body };
    console.log(questionnaires[targetIndex]);
    return HttpResponse.json({ success: true });
  }),
  http.post('/api/questionnaires/:id/duplicate', ({ params }) => {
    const id = params.id;
    const targetIndex = questionnaires.findIndex((q) => q._id === id);
    if (targetIndex === -1) return HttpResponse.json({ message: 'ID不存在' }, { status: 404 });
    const newQuestionnaire: Questionnaire = {
      ...questionnaires[targetIndex],
      _id: nanoid(),
      isPublished: false,
    };
    questionnaires.splice(targetIndex + 1, 0, newQuestionnaire);
    return HttpResponse.json<Questionnaire>(newQuestionnaire);
  }),
];

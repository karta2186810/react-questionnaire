import { GetQuestionnairesDTO } from './getQuestionnaires';

export const questionnaireKeys = {
  all: ['questionnaires'],
  lists: () => [...questionnaireKeys.all, 'list'],
  list: (getQuestionnairesDTO?: GetQuestionnairesDTO) => [...questionnaireKeys.lists(), { ...getQuestionnairesDTO }],
  details: () => [...questionnaireKeys.all, 'detail'],
  detail: (id: number) => [...questionnaireKeys.details(), id],
};

import { GetQuestionnairesDTO } from './getQuestionnaires';

export const questionnaireKeys = {
  all: ['questionnaires'],
  lists: () => [...questionnaireKeys.all, 'list'],
  list: (getQuestionnairesDTO?: GetQuestionnairesDTO) => [...questionnaireKeys.lists(), { ...getQuestionnairesDTO }],
};

import { useQuery } from '@tanstack/react-query';
import { axios } from '@/libs/axios';
import { questionnaireKeys } from './queries';
import { Questionnaire } from '../types';

export type GetQuestionnairesDTO = {
  keywords?: string;
  page?: number;
  limit?: number;
  deleted?: boolean;
  favorite?: boolean;
};

export type GetQuestionnairesResponse = {
  list: Questionnaire[];
  totalPage: number;
};

export const getQuestionnaires = (getQuestionnairesDTO?: GetQuestionnairesDTO) => {
  return axios.get<never, GetQuestionnairesResponse>('/questionnaires', {
    params: getQuestionnairesDTO,
  });
};

export const useQuestionnaires = (getQuestionnairesDTO?: GetQuestionnairesDTO) => {
  return useQuery({
    initialData: {
      totalPage: 1,
      list: [],
    },
    queryKey: questionnaireKeys.list(getQuestionnairesDTO),
    queryFn: () => getQuestionnaires(getQuestionnairesDTO),
  });
};

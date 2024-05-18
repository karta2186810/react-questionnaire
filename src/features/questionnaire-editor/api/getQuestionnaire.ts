import { axios } from '@/libs/axios';
import { useQuery } from '@tanstack/react-query';
import { ComponentInfo } from '../types';
import { BaseEntity } from '@/types';
import { nanoid } from 'nanoid';

export type GetQuestionnaireResponse = BaseEntity & {
  title: string;
  components: ComponentInfo[];
};

export const getQuestionnaire = (id: string) => axios.get<never, GetQuestionnaireResponse>(`/questionnaires/${id}`);

const questionnaireSelector = (data: GetQuestionnaireResponse) => {
  const components = data.components;

  return { ...data, components: components.map((c) => ({ ...c, frontendId: nanoid() })) };
};

export const useQuestionnaire = (id: string) => {
  return useQuery({
    queryKey: ['questionnaires', id],
    queryFn: () => getQuestionnaire(id),
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    initialData: {
      _id: '',
      title: '',
      components: [],
    },
    select: questionnaireSelector,
  });
};

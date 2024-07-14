import { axios } from '@/libs/axios';
import { useQuery } from '@tanstack/react-query';
import { ComponentInfo } from '../types';
import { BaseEntity } from '@/types';

export type GetQuestionnaireResponse = BaseEntity & {
  title: string;
  isPublished: boolean;
  components: ComponentInfo[];
};

export const getQuestionnaire = (id: string) => axios.get<never, GetQuestionnaireResponse>(`/questionnaires/${id}`);

export const useQuestionnaire = (id: string) => {
  return useQuery({
    queryKey: ['questionnaires', id],
    queryFn: () => getQuestionnaire(id),
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    initialData: {
      _id: '',
      title: '',
      isPublished: false,
      components: [],
    },
  });
};

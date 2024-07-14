import { axios } from '@/libs/axios';
import { ComponentInfo } from '../types';
import { useMutation } from '@tanstack/react-query';

type UpdateQuestionnaireDTO = {
  title?: string;
  isPublished?: boolean;
  list?: ComponentInfo[];
};

const updateQuestionnaire = (id: string, dto: UpdateQuestionnaireDTO) => axios.patch(`/questionnaires/${id}/edit`, dto);

export const useUpdateQuestionnaire = (id: string) => {
  return useMutation({
    mutationFn: (payload: UpdateQuestionnaireDTO) => updateQuestionnaire(id, payload),
  });
};

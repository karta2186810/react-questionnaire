import { useMutation } from '@tanstack/react-query';
import { Questionnaire } from '../types';
import { axios } from '@/libs/axios';

export type UpdateQuestionnaireDTO = Partial<Omit<Questionnaire, '_id'>>;

export const updateQuestionnaire = (id: string, updateQuestionnaireDTO: UpdateQuestionnaireDTO) =>
  axios.patch(`/questionnaires/${id}`, updateQuestionnaireDTO);

export const useUpdateQuestionnaire = () => {
  return useMutation({
    mutationFn: ({ id, ...data }: { id: string } & UpdateQuestionnaireDTO) => updateQuestionnaire(id, data),
  });
};

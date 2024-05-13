import { useMutation } from '@tanstack/react-query';
import { axios } from '@/libs/axios';
import { notification } from '@/libs/notification';
import { BaseEntity } from '@/types';

export type CreateQuestionnaireResponse = BaseEntity;

export const createQuestionnaire = () => axios.post<never, CreateQuestionnaireResponse>('/questionnaires');

export const useCreateQuestionnaire = () => {
  return useMutation({
    mutationFn: createQuestionnaire,
    onError(error) {
      notification.error({ message: error.message });
    },
  });
};

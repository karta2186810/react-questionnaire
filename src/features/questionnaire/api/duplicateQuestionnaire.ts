import { useMutation } from '@tanstack/react-query';
import { axios } from '@/libs/axios';
import { BaseEntity } from '@/types';
import { notification } from '@/libs/notification';

export type DuplicateQuestionnaireResponse = BaseEntity;

export const duplicateQuestionnaire = (id: string) =>
  axios.post<never, DuplicateQuestionnaireResponse>(`/questionnaires/${id}/duplicate`);

export const useDuplicateQuestionnaire = () => {
  return useMutation({
    mutationFn: duplicateQuestionnaire,
    onSuccess() {
      notification.success({ message: '複製問卷成功' });
    },
  });
};

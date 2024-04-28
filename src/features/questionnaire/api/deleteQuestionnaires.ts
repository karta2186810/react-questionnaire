import { useMutation } from '@tanstack/react-query';
import { axios } from '@/libs/axios';

export type DeleteQuestionnaireDTO = {
  ids: string[];
};

export const deleteQuestionnaires = (deleteQuestionnaireDTO: DeleteQuestionnaireDTO) =>
  axios.delete('/questionnaires', { data: deleteQuestionnaireDTO });

export const useDeleteQuestionnaires = () => {
  return useMutation({
    mutationFn: deleteQuestionnaires,
  });
};

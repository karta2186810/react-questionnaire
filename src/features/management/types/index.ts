import { BaseEntity } from '@/types';

export type Questionnaire = BaseEntity & {
  title: string;
  answerCount: number;
  isPublished: boolean;
  isFavorite: boolean;
  createdAt: string;
  isDeleted: boolean;
};

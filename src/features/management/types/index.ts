import { BaseEntity } from '@/types';

export type Questionnaire = {
  title: string;
  answerCount: number;
  isPublished: boolean;
  isFavorite: boolean;
  createdAt: string;
  isDeleted: boolean;
} & BaseEntity;

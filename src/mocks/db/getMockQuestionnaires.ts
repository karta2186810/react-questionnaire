import { nanoid } from 'nanoid';
import { faker } from '../faker';
import { getDateString } from '../utils/getDateString';
import { Questionnaire } from '@/features/management';

type Options = {
  count?: number;
  isDeleted?: boolean;
};

export function getMockQuestionnaires(options?: Options): Questionnaire[] {
  const arr: Questionnaire[] = [];
  const count = options?.count ?? 10;
  for (let i = 0; i < count; i++) {
    const isDeleted = options?.isDeleted ?? Math.random() > 0.5;

    arr.push({
      _id: nanoid(),
      title: faker.company.buzzNoun(),
      answerCount: faker.helpers.rangeToNumber({ min: 0, max: 99 }),
      isPublished: faker.datatype.boolean(),
      isFavorite: Math.random() > 0.5,
      isDeleted,
      createdAt: getDateString(faker.date.past()),
    });
  }

  return arr;
}

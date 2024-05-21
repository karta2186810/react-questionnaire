import { nanoid } from 'nanoid';
import { faker } from '../faker';
import { GetQuestionnaireResponse } from '@/features/questionnaire-editor/api/getQuestionnaire';

export function getMockQuestionnaire(): GetQuestionnaireResponse {
  return {
    _id: nanoid(),
    title: faker.company.buzzNoun(),
    components: [
      {
        type: 'questionnaireTitle',
        title: '遠端工作成效問卷',
        props: {
          text: '遠端工作成效問卷',
          isCenter: true,
          order: 1,
        },
        isVisible: true,
        isLocked: false,
      },
      {
        type: 'questionnaireTitle',
        title: '遠端工作成效問卷1',
        props: {
          text: '遠端工作成效問卷1',
          isCenter: false,
          order: 2,
        },
        isVisible: true,
        isLocked: true,
      },
      {
        type: 'questionnaireInput',
        title: '遠端工作成效問卷',
        props: {
          label: '姓名',
          placeholder: '請輸入姓名...',
        },
        isVisible: true,
        isLocked: false,
      },
    ],
  };
}

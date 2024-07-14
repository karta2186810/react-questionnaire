import { nanoid } from 'nanoid';
import { faker } from '../faker';
import { GetQuestionnaireResponse } from '@/features/questionnaire-editor/api/getQuestionnaire';

export function getMockQuestionnaire(): GetQuestionnaireResponse {
  return {
    _id: nanoid(),
    isPublished: false,
    title: faker.company.buzzNoun(),
    components: [
      {
        frontendId: nanoid(),
        type: 'questionnaireTitle',
        title: '標題',
        props: {
          text: '遠端工作成效問卷',
          isCenter: true,
          order: 1,
        },
        isVisible: true,
        isLocked: false,
      },
      {
        frontendId: nanoid(),
        type: 'questionnaireTitle',
        title: '標題',
        props: {
          text: '遠端工作成效問卷1',
          isCenter: false,
          order: 2,
        },
        isVisible: true,
        isLocked: true,
      },
      {
        frontendId: nanoid(),
        type: 'questionnaireInput',
        title: '輸入框',
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

import { Paragraph, ParagraphProps } from './Component';
import { ParagraphPropsForm } from './PropsForm';
import { ComponentConfig } from '../../types';

export const PARAGRAPH_IDENTITY = 'questionnaireParagraph';
export const DEFAULT_PARAGRAPH_PROPS: ParagraphProps = {
  text: '請輸入段落文字...',
  isCenter: false,
};

export const PARAGRAPH_CONFIG: ComponentConfig<ParagraphProps> = {
  title: '段落',
  defaultProps: DEFAULT_PARAGRAPH_PROPS,
  type: PARAGRAPH_IDENTITY,
  Component: Paragraph,
  PropsForm: ParagraphPropsForm,
};

export * from './Component';

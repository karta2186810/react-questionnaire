import { Title, TitleProps } from './Component';
import { ComponentConfig } from '../../types';

export const TITLE_IDENTIFY = 'questionnaireTitle';
export const DEFAULT_TITLE_PROPS: TitleProps = {
  isCenter: false,
  order: 2,
  text: '請輸入標題...',
};

export const TITLE_CONFIG: ComponentConfig = {
  title: '標題',
  defaultProps: DEFAULT_TITLE_PROPS,
  type: TITLE_IDENTIFY,
  Component: Title,
};

export * from './Component';

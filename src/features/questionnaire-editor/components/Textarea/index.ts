import { Textarea, TextareaProps } from './Component';
import { TextareaPropsForm } from './PropsForm';
import { ComponentConfig } from '../../types';

export const TEXTAREA_IDENTIFY = 'questionnaireTextarea';
export const DEFAULT_TEXTAREA_PROPS: TextareaProps = {
  label: '多行輸入框標題',
  placeholder: '請輸入...',
};

export const TEXTAREA_CONFIG: ComponentConfig = {
  title: '多行輸入框',
  Component: Textarea,
  PropsForm: TextareaPropsForm,
  type: TEXTAREA_IDENTIFY,
  defaultProps: DEFAULT_TEXTAREA_PROPS,
};

export * from './Component';

import { Input, InputProps } from './Component';
import { InputPropsForm } from './PropsForm';
import { ComponentConfig } from '../../types';

export const INPUT_IDENTIFY = 'questionnaireInput';
export const DEFAULT_INPUT_PROPS: InputProps = {
  label: '請輸入',
  placeholder: '請輸入',
};

export const INPUT_CONFIG: ComponentConfig = {
  title: '輸入框標題',
  Component: Input,
  PropsForm: InputPropsForm,
  type: INPUT_IDENTIFY,
  defaultProps: DEFAULT_INPUT_PROPS,
};

export * from './Component';

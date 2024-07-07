import { Checkbox, CheckboxProps } from './Component';
import { CheckboxPropsForm } from './PropsForm';
import { ComponentConfig } from '../../types';
import { DEFAULT_CHECKBOX_PROPS } from './defaultProps';

export const CHECKBOX_IDENTIFY = 'questionnaireCheckbox';
export const CHECKBOX_CONFIG: ComponentConfig<CheckboxProps> = {
  title: '多選',
  defaultProps: DEFAULT_CHECKBOX_PROPS,
  type: CHECKBOX_IDENTIFY,
  Component: Checkbox,
  PropsForm: CheckboxPropsForm,
};

export * from './Component';

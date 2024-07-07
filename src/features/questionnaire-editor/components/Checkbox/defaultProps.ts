import { CheckboxProps } from './Component';

export const DEFAULT_CHECKBOX_PROPS: CheckboxProps = {
  title: '單選選項',
  vertical: false,
  list: [
    { label: '選項1', value: '1', checked: false },
    { label: '選項2', value: '2', checked: false },
    { label: '選項3', value: '3', checked: false },
  ],
};

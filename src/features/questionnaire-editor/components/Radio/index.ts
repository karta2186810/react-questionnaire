import { Radio, RadioProps } from './Component';
import { RadioPropsForm } from './PropsForm';
import { ComponentConfig } from '../../types';
import { DEFAULT_RADIO_PROPS } from './defaultProps';

export const RADIO_IDENTIFY = 'questionnaireRadio';
export const RADIO_CONFIG: ComponentConfig<RadioProps> = {
  title: '單選',
  defaultProps: DEFAULT_RADIO_PROPS,
  type: RADIO_IDENTIFY,
  Component: Radio,
  PropsForm: RadioPropsForm,
};

export * from './Component';

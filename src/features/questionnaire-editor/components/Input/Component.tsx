import { FC } from 'react';
import { TextInput } from '@mantine/core';
import { DEFAULT_INPUT_PROPS } from './index';

export type InputProps = {
  label?: string;
  placeholder?: string;
};

export const Input: FC<InputProps> = (props) => {
  const { label, placeholder } = { ...DEFAULT_INPUT_PROPS, ...props };

  return <TextInput label={label} placeholder={placeholder} />;
};

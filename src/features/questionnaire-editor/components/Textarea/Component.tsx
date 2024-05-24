import { FC } from 'react';
import { Textarea as MantineTextarea } from '@mantine/core';
import { DEFAULT_TEXTAREA_PROPS } from './index';

export type TextareaProps = {
  label?: string;
  placeholder?: string;
};

export const Textarea: FC<TextareaProps> = (props) => {
  const { label, placeholder } = { ...DEFAULT_TEXTAREA_PROPS, ...props };

  return <MantineTextarea rows={5} label={label} placeholder={placeholder} />;
};

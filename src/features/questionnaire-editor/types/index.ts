import { FC } from 'react';
import { InputProps } from '../components/Input';
import { TitleProps } from '../components/Title';
import { ParagraphProps } from '../components/Paragraph';
import { TextareaProps } from '../components/Textarea';
import { RadioProps } from '../components/Radio';

export type BaseComponentConfig<Identify, PropsType> = {
  title: string;
  type: Identify;
  defaultProps: PropsType;
  Component: FC<PropsType>;
};

export type ComponentProps = TitleProps & InputProps & ParagraphProps & TextareaProps & RadioProps;

export type ComponentInfo = {
  title: string;
  type: string;
  props: ComponentProps;
  isLocked: boolean;
  isVisible: boolean;
};

export type ComponentConfig = {
  title: string;
  type: string;
  defaultProps: ComponentProps;
  Component: FC<ComponentProps>;
  PropsForm: FC<PropsFormProps<ComponentProps>>;
};

export type PropsFormProps<T> = T & {
  onChange?: (value: Partial<T>) => void;
};

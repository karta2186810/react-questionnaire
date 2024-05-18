import { FC } from 'react';
import { InputProps } from '../components/Input';
import { TitleProps } from '../components/Title';

export type BaseComponentConfig<Identify, PropsType> = {
  title: string;
  type: Identify;
  defaultProps: PropsType;
  Component: FC<PropsType>;
};

export type ComponentProps = TitleProps & InputProps;

export type ComponentInfo = {
  title: string;
  type: string;
  props: ComponentProps;
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

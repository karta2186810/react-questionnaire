import { FC } from 'react';

export type ComponentInfo<PropsType> = {
  title: string;
  type: string;
  props: PropsType;
  isLocked: boolean;
  isVisible: boolean;
};

export type ComponentConfig<PropsType> = {
  title: string;
  type: string;
  defaultProps: PropsType;
  Component: FC<PropsType>;
  PropsForm: FC<PropsFormProps<PropsType>>;
};

export type PropsFormProps<T> = T & {
  onChange?: (value: Partial<T>) => void;
};

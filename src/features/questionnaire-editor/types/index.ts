import { FC } from 'react';

export type ComponentInfo = {
  frontendId: string;
  title: string;
  type: string;
  props: Record<string, unknown>;
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

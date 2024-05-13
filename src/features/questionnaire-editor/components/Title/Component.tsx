import { FC } from 'react';
import { Title as MantineTitle } from '@mantine/core';
import { DEFAULT_TITLE_PROPS } from './index';

export type TitleProps = {
  text?: string;
  order?: number;
  isCenter?: boolean;
};

export const Title: FC<TitleProps> = (props) => {
  const { text, order, isCenter } = { ...DEFAULT_TITLE_PROPS, ...props };
  let fontSize: string;

  switch (order) {
    case 1:
      fontSize = '32px';
      break;
    case 2:
      fontSize = '24px';
      break;
    case 3:
      fontSize = '18px';
      break;
    default:
      fontSize = '16px';
  }

  return (
    <MantineTitle style={{ fontSize }} ta={isCenter ? 'center' : undefined}>
      {text}
    </MantineTitle>
  );
};

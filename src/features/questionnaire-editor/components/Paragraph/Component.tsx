import { FC } from 'react';
import { Text } from '@mantine/core';
import { DEFAULT_PARAGRAPH_PROPS } from './index';

export type ParagraphProps = {
  text: string;
  isCenter: boolean;
};

export const Paragraph: FC<ParagraphProps> = (props) => {
  const { text, isCenter } = { ...DEFAULT_PARAGRAPH_PROPS, ...props };

  return (
    <Text style={{ whiteSpace: 'pre-line' }} ta={isCenter ? 'center' : undefined}>
      {text}
    </Text>
  );
};

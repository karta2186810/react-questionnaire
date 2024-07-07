import { FC } from 'react';
import { Radio as MantineRadio, Group, Stack, Text } from '@mantine/core';
import { DEFAULT_RADIO_PROPS } from './defaultProps';

export type Option = {
  label: string;
  value: string;
};

export type RadioProps = {
  title?: string;
  defaultChecked?: string;
  list?: Option[];
  vertical?: boolean;
};

export const Radio: FC<RadioProps> = ({ title, list = [], vertical, defaultChecked } = DEFAULT_RADIO_PROPS) => {
  return (
    <Stack>
      <Text size="sm" fw={500}>
        {title}
      </Text>
      {vertical ? (
        <Stack>
          {list.map((option) => (
            <MantineRadio
              key={option.value}
              checked={option.value === defaultChecked}
              label={option.label}
              onChange={() => {}}
            />
          ))}
        </Stack>
      ) : (
        <Group>
          {list.map((option) => (
            <MantineRadio
              key={option.value}
              checked={option.value === defaultChecked}
              label={option.label}
              onChange={() => {}}
            />
          ))}
        </Group>
      )}
    </Stack>
  );
};

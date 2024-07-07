import { FC } from 'react';
import { Checkbox as MantineCheckbox, Group, Stack, Text } from '@mantine/core';
import { DEFAULT_CHECKBOX_PROPS } from './defaultProps';

export type Option = {
  label: string;
  value: string;
  checked: boolean;
};

export type CheckboxProps = {
  title: string;
  list: Option[];
  vertical: boolean;
};

export const Checkbox: FC<CheckboxProps> = ({ title, list = [], vertical } = DEFAULT_CHECKBOX_PROPS) => {
  return (
    <Stack>
      <Text size="sm" fw={500}>
        {title}
      </Text>
      {vertical ? (
        <Stack>
          {list.map((option) => (
            <MantineCheckbox key={option.value} checked={option.checked} label={option.label} onChange={() => {}} />
          ))}
        </Stack>
      ) : (
        <Group>
          {list.map((option) => (
            <MantineCheckbox key={option.value} checked={option.checked} label={option.label} onChange={() => {}} />
          ))}
        </Group>
      )}
    </Stack>
  );
};

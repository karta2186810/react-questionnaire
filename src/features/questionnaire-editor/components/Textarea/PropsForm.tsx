import { FC } from 'react';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { Stack, TextInput } from '@mantine/core';
import { TextareaProps } from './Component';
import { PropsFormProps } from '../../types';

export const TextareaPropsForm: FC<PropsFormProps<TextareaProps>> = ({ onChange, label, placeholder }) => {
  const form = useFormik({
    initialValues: { label },
    validationSchema: object({
      label: string().required('必填'),
    }),
    onSubmit: () => {},
  });

  return (
    <Stack py="md" gap="lg">
      <TextInput
        label="標題"
        required
        name="label"
        value={form.values.label}
        onChange={(e) => {
          form.setFieldValue('label', e.target.value);
          onChange?.({ label: e.target.value });
        }}
        error={form.touched.label && form.errors.label}
      />
      <TextInput
        label="提示文字"
        placeholder={placeholder}
        onChange={(e) => onChange?.({ placeholder: e.target.value })}
      />
    </Stack>
  );
};
